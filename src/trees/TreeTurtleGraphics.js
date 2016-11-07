import TurtleGraphics from './TurtleGraphics'

export default class TreeTurtleGraphics extends TurtleGraphics {
    processSymbol(item){
        //If the item is an object, switch on its symbol property. Otherwise it's a string, so use its value instead
        let symbol = item.symbol || item
        switch (symbol) {
            case 'L':
                this.states.push(this.state.clone())
                this.graphics.lineStyle(0, 0x000000, 0);
                this.graphics.drawEllipse(this.state.x, this.state.y, 40, 20);
                this.loadState(this.states.pop())
                break
            default:
                super.processSymbol(item)
                break
        }
    }
}
