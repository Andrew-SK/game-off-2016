import degToRadians from 'degrees-radians'

function radians(x) {
    return degToRadians(x + 90)
}

class TurtleState {
    constructor(x, y, angle) {
        this.x = x
        this.y = y
        this.angle = angle
    }

    static fromTurtle(turtleGraphics) {
        return new TurtleState(turtleGraphics.graphics.x, turtleGraphics.graphics.y, turtleGraphics.angle)
    }
}

export default class TurtleGraphics {
    constructor(graphics) {
        this.graphics = graphics
        this.states = []
        this.state = new TurtleState(0, 0, 180)
    }

    getTexture() {
        return this.graphics.generateTexture()
    }

    getNextLocation(distance) {
        const new_x = this.state.x + distance * Math.cos(radians(this.state.angle))
        const new_y = this.state.y + distance * Math.sin(radians(this.state.angle))
        console.log(`Radians is ${radians}. Radians of 0 is ${radians(0)}`)
        return [new_x, new_y]
    }

    process(instructions) {
        for (let symbol of instructions) {
            switch (symbol.symbol) {
                case 'F':
                    let nextLoc = this.getNextLocation(symbol.value)
                    this.state.x = nextLoc[0]
                    this.state.y = nextLoc[1]
                    this.graphics.lineTo(this.state.x, this.state.y)
                    break
                case 'f':
                    let nextLoca = this.getNextLocation(symbol.value)
                    this.state.x = nextLoca[0]
                    this.state.y = nextLoca[1]
                    this.graphics.moveTo(this.state.x, this.state.y)
                    break
                case '+':
                    this.state.angle += symbol.value
                    while (this.state.angle > 360)
                        this.state.angle -= 360
                    break
                case '[':
                    this.states.push(Object.assign({}, this.state))
                    break
                case ']':
                    const newState = this.states.pop()
                    this.state = newState
                    this.graphics.moveTo(newState.x, newState.y)
                    break
                case '!':
                    this.graphics.lineWidth *= symbol.value
                    break
            }
        }

    }
}
