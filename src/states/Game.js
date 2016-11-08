/* globals __DEV__ */
import Phaser from 'phaser'
import Tree from '../sprites/Tree'
import {setResponsiveWidth} from '../utils'
import {SimpleTreeSystem, ComplexTreeSystem, CsiroTreeSystem} from '../trees/System'

export default class extends Phaser.State {
    init() {
    }

    preload() {
    }

    create() {
        // Make the world bigger than just the screen
        this.game.world.setBounds(0, 0, 2000, 2000)

        this.tree = new Tree({game: this.game, x: 50, y: 250, system: new CsiroTreeSystem()})//  this.game.world.centerX, this.game.world.centerY)
        setResponsiveWidth(this.tree, 10, this.game.world)
        // this.tree.scale.setTo(0.50, 0.50)
        this.game.add.existing(this.tree)

        this.tree2 = new Tree({game: this.game, x: 300, y: 300, system: new CsiroTreeSystem({
            r1: 0.65,
            r2: 0.71,
            a1: 27,
            a2: -68,
            w0: 20,
            q: 0.53,
            e: 0.50,
            min: 1.7,
            n: 12
        })})//  this.game.world.centerX, this.game.world.centerY)
        // this.tree2.scale.setTo(0.50, 0.50)
        setResponsiveWidth(this.tree2, 10, this.game.world)
        this.game.add.existing(this.tree2)

        // set the sprite width to 30% of the game width
        //setResponsiveWidth(this.tree, 30, this.game.world)

        // Create cursors to control the camera
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    render() {
        if (__DEV__) {
            this.game.debug.body(this.tree)
            this.game.debug.spriteInfo(this.tree, 32, 32)
            this.game.debug.cameraInfo(this.game.camera, 32, 128)
        }
    }

    update() {
        //  For example this checks if the up or down keys are pressed and moves the camera accordingly.
        if (this.cursors.up.isDown) {
            //  If the shift key is also pressed then the world is rotated
            if (this.cursors.up.shiftKey) {
                game.world.rotation += 0.05;
            }
            else {
                game.camera.y -= 4;
            }
        }
        else if (this.cursors.down.isDown) {
            if (this.cursors.down.shiftKey) {
                game.world.rotation -= 0.05;
            }
            else {
                game.camera.y += 4;
            }
        }

        if (this.cursors.left.isDown) {
            game.camera.x -= 4;
        }
        else if (this.cursors.right.isDown) {
            game.camera.x += 4;
        }
    }
}
