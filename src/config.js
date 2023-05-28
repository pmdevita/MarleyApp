
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

const BUTTON_PAGES = [
    {
        name: "Bird Sounds",
        buttons: [
            {
                "image": import("./img/northern_cardinal.jpg"),
                "sound": import("./sound/northern_cardinal_short2.mp3")
            },
            {
                "image": import("./img/tufted_titmouse.jpg"),
                "sound": import("./sound/tutfted_titmouse_short.mp3")
            },
        ]
    },
    {
        name: "Commands",
        buttons: [

        ]
    }
]

console.log(BUTTON_PAGES)

export {BUTTON_PAGES}
