import radians from 'degrees-radians'

/**
 * Represents a state of the turtle at any time in terms of position and orientation
 */
class TurtleState {
    constructor({x = 0, y = 0, angle = 90}) {
        this.x = x
        this.y = y
        this.angle = angle
    }

    /**
     * Creates and return a shallow copy of the TurtleState.
     * This should be sufficient since all fields are integers
     */
    clone() {
        return new TurtleState(this)
    }
}

/**
 * A turtle that can be used to generate Phaser Graphics and Textures from L-Systems
 */
export default class TurtleGraphics {
    /**
     * Makes a new TurtleGraphics with the given Phaser graphics object
     */
    constructor(graphics) {
        this.graphics = graphics
        this.states = []
        this.state = new TurtleState({angle: -90})
    }

    /**
     * Returns a PIXI texture from the TurtleGraphics's path. This can be used as a sprite
     * @returns {Texture}
     */
    getTexture() {
        return this.graphics.generateTexture()
    }

    /**
     * Returns the next state the turtle will occupy if if moves the given distance forward
     * @param {number} distance
     * @returns {TurtleState} A TurtleState instance representing the next state
     */
    getNextLocation(distance) {
        const newState = this.state.clone()
        newState.x += distance * Math.cos(radians(this.state.angle))
        newState.y += distance * Math.sin(radians(this.state.angle))
        return newState
    }

    /**
     * Processes an array of symbol objects or a string containing many symbols
     * @param {string|Object[]} instructions
     */
    process(instructions) {
        for (let item of instructions) {
            //If the item is an object, switch on its symbol property. Otherwise it's a string, so use its value instead
            let symbol = item.symbol || item
            switch (symbol) {
                case 'F':
                    this.state = this.getNextLocation(item.value || 1)
                    this.graphics.lineTo(this.state.x, this.state.y)
                    break
                case 'f':
                    this.state = this.getNextLocation(item.value || 1)
                    this.graphics.moveTo(this.state.x, this.state.y)
                    break
                case '+':
                    this.state.angle += item.value || 1
                    while (this.state.angle > 360)
                        this.state.angle -= 360
                    break
                case '[':
                    this.states.push(this.state.clone())
                    break
                case ']':
                    const newState = this.states.pop()
                    this.state = newState
                    this.graphics.moveTo(newState.x, newState.y)
                    break
                case '!':
                    this.graphics.lineWidth *= item.value || 1
                    break
            }
        }
    }
}
