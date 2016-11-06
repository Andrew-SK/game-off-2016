import Phaser from 'phaser'
import system from '../trees/System'
import Turtle from '../trees/TurtleGraphics'

export default class extends Phaser.Sprite {
    constructor(game, x, y) {

        //Use a turtle to generate the texture for this sprite
        const graphics = game.add.graphics(x, y)
        graphics.lineStyle(1, 0x000000, 1);
        //graphics.beginFill(0xffffff)

        const turtle = new Turtle(graphics)
        // turtle.process([
        //     {symbol: 'F', value: 10},
        //     {symbol: '+', value: -90},
        //     {symbol: 'F', value: 10},
        //     {symbol: '+', value: -90},
        //     {symbol: 'F', value: 10},
        //     {symbol: '+', value: -90},
        //     {symbol: 'F', value: 10}
        // ])
        turtle.process(system.iterate(7))

        super(game, x, y, turtle.getTexture())
        graphics.destroy()

        this.game = game
        //this.anchor.setTo(0.5)
    }

    update() {
    }
}
