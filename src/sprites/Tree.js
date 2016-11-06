import Phaser from 'phaser'
import {SimpleTreeSystem, ComplexTreeSystem} from '../trees/System'
import Turtle from '../trees/TurtleGraphics'

export default class extends Phaser.Sprite {
    constructor({game, x, y, System = SimpleTreeSystem}) {

        // Create a Phaser graphics context to draw with
        const graphics = game.add.graphics(x, y)
        graphics.lineStyle(1, 0x000000, 1);

        // Create an L-System to generate the tree
        const system = new System()

        // Create a turtle to convert the system into lines, and feed the turtle the iterated system
        const turtle = new Turtle(graphics)
        turtle.process(system.iterate(6))

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
