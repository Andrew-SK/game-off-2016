/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Tree from '../sprites/Tree'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
    init() {
    }

    preload() {
    }

    create() {
        /*let banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Phaser + ES6 + Webpack')
         banner.font = 'Nunito'
         banner.fontSize = 40
         banner.fill = '#77BFA3'
         banner.anchor.setTo(0.5)
         */
        this.game.world.setBounds(0, 0, 2000, 2000)

        this.tree = new Tree(this.game, 250, 250)//  this.game.world.centerX, this.game.world.centerY)
        this.tree.scale.setTo(2, 2)
        // set the sprite width to 30% of the game width
        //setResponsiveWidth(this.tree, 30, this.game.world)
        this.game.add.existing(this.tree)

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
