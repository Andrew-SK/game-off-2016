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
                    {symbol: '!', value: width_increase_rate},
                    {symbol: 'F', value: 50},
                    ...branch_segment,
                    {symbol: '+', value: div_1},
                    ...branch_segment,
                    {symbol: '+', value: div_2},
                    ...branch_segment
                ],
                'F': ({part}) => [{symbol: 'F', value: elongation_rate * part.value}],
                '!': ({part}) => [{symbol: '!', value: width_increase_rate * part.value}]
            }
        })
    }
}

export class SimpleTreeSystem extends LSystem {
    constructor() {
        super({
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
}
