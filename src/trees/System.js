import LSystem from 'lindenmayer'

const div_1 = 94.74
const div_2 = 132.63
const branch_angle = 18.95
const elongation_rate = 1.109
const width_increase_rate = 1.732
const branch_segment = [
    {symbol: '['},
    // {symbol: '&', value: branch_angle},
    {symbol: 'F', value: 50},
    {symbol: 'A'},
    {symbol: ']'}
]
const system = new LSystem({
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

const simpleSystem = new LSystem({
    axiom: ['X'],
    productions: {
        X: () => [
            {symbol: 'F', value: 1},
            {symbol: '['},
            {symbol: '+', value: 20},
            {symbol: 'X'},
            {symbol: ']'},
            {symbol: 'F', value: 1},
            {symbol: '['},
            {symbol: '+', value: -20},
            {symbol: 'X'},
            {symbol: ']'},
            {symbol: '+', value: 20},
            {symbol: 'X'},
        ],
        F: ({part}) => [{symbol: 'F', value: part.value * 2}]
    }
})

export default simpleSystem
