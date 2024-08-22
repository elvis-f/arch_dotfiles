class BacklightService extends Service {
    // Using the code from the wiki made me trip up on my own code, so I wrote this very simplistic
    // service to remedy some of the pitfalls in the above code, WIP
    static {
        Service.register(
            this,
            {
                'screen-changed': ['float'],
            },
            {
                'backlight-level': ['float', 'rw'],
            }
        )
    }

    #backlightLevel = 100 // 100% brightness by default
    #updateTimeout = null
    #updateRate = 500 // in ms

    get backlight_level(){
        return this.#backlightLevel
    }

    set backlight_level(percent){
        this.#setBacklightLevel(percent)
    }

    #setBacklightLevel(percent){
        this.#backlightLevel = percent
        this.#updateBacklightLevel(percent)
    }

    #updateBacklightLevel(percent){
        Utils.exec(`xbacklight -set ${percent}`)

        this.emit('changed');
        this.notify('backlight-level');
        this.emit('screen-changed', this.#backlightLevel);
    }

    #getActualBacklightLevel(){
        return parseInt(Utils.exec('xbacklight -get'))
    }

    constructor() {
        super()

        // TODO: Implement system based control
        const backlightInterface = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'")
        const backlightFile = `/sys/class/backlight/${backlightInterface}/brightness`

        Utils.monitorFile(backlightFile, () => this.#onFileChange())

        this.#backlightLevel = this.#getActualBacklightLevel()
    }

    #onFileChange(){
        // Utils.exec is a very slow operation, so to avoid 
        // async hell I implemented basic rate limiting
        if(this.#updateTimeout)
        {
            return
        }
        this.#fileChangeRateLimit()

        const lastUserDefinedBacklightLevel = this.#backlightLevel
        const actualBacklightLevel = this.#getActualBacklightLevel()

        if(lastUserDefinedBacklightLevel != actualBacklightLevel)
        {
            this.#setBacklightLevel(actualBacklightLevel)
        }
    }

    #fileChangeRateLimit(){
        if (this.#updateTimeout) 
        {
            this.#updateTimeout = null
        }

        this.#updateTimeout = setTimeout(async () => {
            this.#updateTimeout = null
        }, this.#updateRate);
    }

    connect(event = 'screen-changed', callback) {
        return super.connect(event, callback)
    }
}

const service = new BacklightService

export default service