import Phaser from 'phaser'
import {SimpleTreeSystem, ComplexTreeSystem, CsiroTreeSystem} from '../trees/System'
import Turtle from '../trees/TreeTurtleGraphics'

export default class extends Phaser.Sprite {
    constructor({game, x, y, system}) {

        // Create a Phaser graphics context to draw with
        const graphics = game.add.graphics(x, y)

        // Create a turtle to convert the system into lines, and feed the turtle the iterated system
        const turtle = new Turtle(graphics, {angle: -90, color: 0x414141})
        turtle.process(system.iterate())

        // Create a sprite using the generated texture
        super(game, x, y, turtle.getTexture())

        // Destroy the temporary Graphics we used to generate the texture
        graphics.destroy()

        this.game = game
        //this.anchor.setTo(0.5)
    }

    update() {
    }
}
