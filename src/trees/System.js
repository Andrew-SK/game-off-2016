import LSystem from 'lindenmayer'

export class ComplexTreeSystem extends LSystem {
    constructor() {
        const div_1 = 94.74
        const div_2 = 132.63
        const branch_angle = 18.95
        const elongation_rate = 1.409
        const width_increase_rate = 1.732
        const branch_segment = [
            {symbol: '['},
            {symbol: '+', value: branch_angle},
            {symbol: 'F', value: 50},
            {symbol: 'A'},
            {symbol: ']'}
        ]
        super({
            axiom: [
                {symbol: '!', value: 1},
                {symbol: 'F', value: 200},
                {symbol: '+', value: 45},
                {symbol: 'A'}
            ],
            productions: {
                'A': ({part}) => [
                    'L',
                    {symbol: '!', value: width_increase_rate},
                    {symbol: 'F', value: 50},
                    'L',
                    ...branch_segment,
                    'L',
                    {symbol: '+', value: div_1},
                    ...branch_segment,
                    'L',
                    {symbol: '+', value: div_2},
                    ...branch_segment,
                    'L'
                ],
                'F': ({part}) => [{symbol: 'F', value: elongation_rate * part.value}],
                '!': ({part}) => [{symbol: '!', value: width_increase_rate * part.value}],
                '+F': ({part}) => {
                    return [{
                        symbol: 'C', value: width_increase_rate * part.value
                    }]
                }
            }
        })
    }
}

export class SimpleTreeSystem {
    constructor() {
        this.system = new LSystem({
            axiom: ['X'],
            productions: {
                X: () => [
                    {symbol: 'F', value: 1},
                    '[',
                    {symbol: '+', value: 20},
                    'X',
                    ']',
                    {symbol: 'F', value: 1},
                    '[',
                    {symbol: '+', value: -20},
                    'X',
                    ']',
                    {symbol: '+', value: 20},
                    'X'
                ],
                F: ({part}) => [{symbol: 'F', value: part.value * 2}]
            }
        })
    }

    /**
     * Override the normal iterate method so that by default it iterates 7 times
     * @param {number} iterations The number of times to iterate the L-System
     */
    iterate(iterations){
        const n = 7
        return this.system.iterate(iterations || n)
    }
}

export class CsiroTreeSystem {
    /**
     * Override the normal iterate method so that by default it iterates 10 times
     * @param {number} iterations The number of times to iterate the L-System
     */
    iterate(iterations){
        return this.system.iterate(iterations || this.n)
    }

    /**
     * Creates a new CSIRO tree system using the given parameters or defaults
     * @param r1 Decrease in internode length as the tree branches
     * @param r2 Decrease in internode length as the tree branches
     * @param a1 The orientation of the branches with respect to the previous internode
     * @param a2 The orientation of the branches with respect to the previous internode
     * @param w0 The initial stem width
     * @param q Difference in width between branches branching from the same point
     * @param e The size of the branches with respect to the parent branch. When e=1, the child branches are much
     * smaller than the parent. When e=0, they are the same size
     * @param min The minimal size branch before the branch is not drawn
     * @param n The number of iterations performed on the system
     */
    constructor({r1 = 0.75, r2 = 0.77, a1 = 35, a2 = -35, w0 = 30, q = 0.50, e = 0.40, min = 0, n = 10} = {}) {
        this.n = n
        this.system = new LSystem({
            axiom: [{symbol: 'A', s: 100, w: w0}],
            productions: {
                A: ({part}) => {
                    if (part.s >= min)
                        return [
                            {symbol: '!', value: part.w},
                            {symbol: 'F', value: part.s},
                            '[',
                            {symbol: '+', value: a1},
                            {symbol: 'A', s: part.s * r1, w: part.w * Math.pow(q, e)},
                            ']',
                            '[',
                            {symbol: '+', value: a2},
                            {symbol: 'A', s: part.s * r2, w: part.w * Math.pow(1-q, e)},
                            ']'
                        ]
                    else
                        return []
                }
            }
        })
    }
}