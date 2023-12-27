import { intervals, notes } from "../utils/constantsMusical"

export default class RandomIntervalGenerator {
    constructor(options) {
        this.interval = {
            length: null,
            name: null,
            noteStartName: null,
            noteEndName: null,
        }
        this.setDefaultOptions = this.setDefaultOptions.bind(this)
        this.generateInterval = this.generateInterval.bind(this)
        this.randomNumber = this.randomNumber.bind(this)

        this.setDefaultOptions(options)
        this.generateAnyIntervals = this.generateAnyIntervals.bind(this)
        this.generateInterval()
    }


    setDefaultOptions(options) {
        this.options = {
            intervalsAllowed: "all",
            ...options
        }
    }

    /**
     * 
     * @param {number} [min=0] 
     * @param {number} [max=0]
     * @returns {number}
     * @description return an in between min & max
     */
    randomNumber(min = 0, max = 1) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    generateInterval() {
        const intervalByNumber = this.randomNumber(0, 11)
        const intervalName = intervals[intervalByNumber];
        const noteStartNumber = this.randomNumber(0, 11)
        const noteStartName = notes[noteStartNumber]
        const direction = this.randomNumber(0, 1) == 0 ? 'desc' : "asc"
        const noteEndName = direction == "asc" ? (noteStartNumber + intervalByNumber) > 11 ? notes[(noteStartNumber + intervalByNumber) - 12] : notes[noteStartNumber + intervalByNumber] :
            (noteStartNumber - intervalByNumber) < 0 ? notes[12 + (noteStartNumber - intervalByNumber)] : notes[noteStartNumber - intervalByNumber]
        const isPassOctave = direction == 'asc' ? (noteStartNumber + intervalByNumber) > 11 ? true : false : (noteStartNumber - intervalByNumber) < 0 ? true : false
        const octave = this.randomNumber(2, 4)

        let interval = {
            length: intervalByNumber,
            direction: direction,
            name: intervalName,
            isPassOctave: isPassOctave,
            noteStart: { name: noteStartName, octave: octave },
            noteEndName: { name: noteEndName, octave: isPassOctave ? direction == 'asc' ? octave + 1 : octave - 1 : octave }
        }

        return interval
    }

    generateAnyIntervals(nbIntervals) {
        let intervals = []
        for (let i = 0; i < nbIntervals; i++) {
            intervals.push(this.generateInterval())
        }
        return intervals
    }
}