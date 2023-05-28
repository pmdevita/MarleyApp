import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'

const birdSounds = import.meta.glob('./sound/**.*', { eager: true })
console.log(birdSounds);

const fullConfig = resolveConfig(tailwindConfig)

const diatonicScale = [
    0,
    2,
    4,
    5,
    7,
    9,
    11
]


// https://tailwindcss.com/docs/customizing-colors
const keyColorMap = [
    "blue-500",
    "green-300",
    "pink-500",
    "red-400",
    "orange-500",
    "yellow-500",
    "lime-500"
]




const keyColors = keyColorMap.map(i => {
    let parts = i.split("-");
    let start = fullConfig["theme"]["colors"];
    for (let j = 0; j<parts.length; j++) {
        start = start[parts[j]];
    }
    return start;
})

export {fullConfig, keyColors, diatonicScale}
