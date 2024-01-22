export default class SoundPlayer {
    constructor(source) {
        this.audio = new Audio(source)
        this.interval = {
            timeNote1: 0,
            timeNote2: 1
        }
        this.currentNote = 1

        this.setIntervalTimes = this.setIntervalTimes.bind(this)
        this.onAudioTimeUpdater = this.onAudioTimeUpdater.bind(this)
        this.playInterval = this.playInterval.bind(this)
        this.addListener = this.addListener.bind(this)

        this.addListener()
    }

    setIntervalTimes(interval) {
        this.interval = interval
        this.audio.pause()
        this.audio.currentTime = this.interval.timeNote1 / 1000
    }

    onAudioTimeUpdater() {
        if (this.audio.currentTime >= this.interval.timeNote1 / 1000 + 0.850 && this.currentNote == 1) {
            this.audio.pause()
            this.audio.currentTime = this.interval.timeNote2 / 1000
            this.currentNote = 2
            this.audio.play()
        }
        else if (this.currentNote == 2 && this.audio.currentTime >= this.interval.timeNote2 / 1000 + 0.850) {
            this.audio.pause()
        }

    }

    playInterval() {
        if (this.audio.paused) {
            this.currentNote = 1
            this.audio.currentTime = this.interval.timeNote1 / 1000
            this.audio.play()
        }
    }

    addListener() {
        this.audio.addEventListener('timeupdate', this.onAudioTimeUpdater)
    }
}