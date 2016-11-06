import radians from 'degrees-radians'

/**
 * Represents a state of the turtle at any time in terms of position and orientation
 */
class TurtleState {
    constructor({x = 0, y = 0, angle = 90, width = 1, color = 0x000000, alpha=1}) {
        this.x = x
        this.y = y
        this.angle = angle
        this.width = width
        this.color = color
        this.alpha = alpha
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
        const initialState = new TurtleState({angle: -90, alpha: 0.5})
        this.loadState(initialState)
    }

    /**
     * Sets the current state to the given state
     * @param {TurtleState} state
     */
    loadState(state){
        this.state = state
    }

    /**
     * Syncs the state and Graphics object so any future line drawing uses the newest state
     */
    syncStateAndGraphics(){
        this.graphics.moveTo(this.state.x, this.state.y)
        const roundedWidth = this.state.width//Math.floor(this.state.width)
        this.graphics.lineStyle(roundedWidth, this.state.color, this.state.alpha)
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
                    this.loadState(this.getNextLocation(item.value || 2))
                    this.graphics.lineTo(this.state.x, this.state.y)
                    break
                case 'f':
                    this.loadState(this.getNextLocation(item.value || 1))
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
                    this.loadState(this.states.pop())
                    break
                case '!':
                    this.state.width = item.value || 1
                    break
            }
            this.syncStateAndGraphics()
        }
    }
}
