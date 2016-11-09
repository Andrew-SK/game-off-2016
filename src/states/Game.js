/* globals __DEV__ */
import Phaser from 'phaser'
import Tree from '../sprites/Tree'
import {setResponsiveWidth} from '../utils'
import {SimpleTreeSystem, ComplexTreeSystem, CsiroTreeSystem} from '../trees/System'
import _ from 'lodash'
import random from 'random-number'

export default class extends Phaser.State {
    init() {
    }

    preload() {
    }

    create() {
        // Make the world bigger than just the screen
        this.game.world.setBounds(0, 0, 2000, 2000)

        // Make a 6*10 grid of randomized trees
        const treesWide = 6
        const treesHigh = 10
        const treeWidth = this.game.world.width / treesWide
        const treeHeight = this.game.world.height / treesHigh
        _(_.range(treesWide))
            .flatMap(i => _.range(treesHigh).map(j => ({x: i, y: j})))
            .forEach(({x, y}) => {
                let tree = new Tree({
                    game: this.game,
                    x: x * treeWidth,
                    y: y * treeHeight,
                    system: new CsiroTreeSystem({
                        r1: random({min: 0.5, max: 1}),
                        r2: random({min: 0.2, max: 1}),
                        a1: random({min: -5, max: 50, integer: true}),
                        a2: random({min: -100, max: 100, integer: true}),
                        w0: random({min: 0, max: 50, integer: true}),
                        q: random({min: 0.4, max: 0.6}),
                        e: random({min: 0, max: 0.5}),
                        min: random({min: 0, max: 25}),
                        n: random({min: 8, max: 12, integer: true}),
                    })
                })

                //Calculate the scale that allows it to be as big as possible without ruining the aspect ratio
                let widthScale = treeWidth / tree.width
                let heightScale = treeHeight / tree.height
                let scale = Math.min(widthScale, heightScale)
                tree.scale.setTo(scale, scale)
                this.game.add.existing(tree)
            })

        /*
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
         */

        // Create cursors to control the camera
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    render() {
        if (__DEV__) {
            // this.game.debug.body(this.tree)
            // this.game.debug.spriteInfo(this.tree, 32, 32)
            this.game.debug.cameraInfo(this.game.camera, 32, 32)
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
                game.camera.y -= 8;
            }
        }
        else if (this.cursors.down.isDown) {
            if (this.cursors.down.shiftKey) {
                game.world.rotation -= 0.05;
            }
            else {
                game.camera.y += 8;
            }
        }

        if (this.cursors.left.isDown) {
            game.camera.x -= 8;
        }
        else if (this.cursors.right.isDown) {
            game.camera.x += 8;
        }
    }
}
