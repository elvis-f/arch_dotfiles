class BacklightService extends Service {
    // static {
    //     Service.register(
    //         this,
    //         {
    //             'screen-changed': ['float'],
    //         },
    //         {
    //             'screen-value': ['float', 'rw'],
    //         }
    //     )
    // }

    // #interface = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'")
    // #sliderValue = 100
    // #screenValue = 100
    // #max = 100
    // #updateTimeout = null

    // get slider_value(){
    //     return this.#sliderValue
    // }

    // set slider_value(value){
    //     this.#sliderValue = value
    // }

    // get screen_value(){
    //     //this.#asyncUpdate()
    //     return this.#screenValue
    // }

    // #totalSteps = 20

    // set screen_value(percent) {
    //     percent = Math.max(0, Math.min(100, percent));

    //     this.#screenValue = percent
    //     // this.#animateBrightness(percent);
    //     //this.#debouncedUpdate(percent)
    // }

    // #animateBrightness(targetPercent) {
    //     console.log("hi", targetPercent)

    //     for(let i = 0; i < this.#totalSteps; i++){
    //         const currentPercent = this.#screenValue
    //         const difference = targetPercent - currentPercent

    //         const newValue = currentPercent + (difference / this.#totalSteps)

    //         console.log("Current:", currentPercent, "Difference:", difference, "Delta-diff", difference / this.#totalSteps)
    //         console.log(i, newValue, this.#sliderValue)
    //         this.#setActualScreenValue(newValue)
    //     }
    // }

    // #setActualScreenValue(percent){
    //     Utils.execAsync(`xbacklight -set ${percent}`)
    //     this.#screenValue = percent
    //     //this.#asyncUpdate();
    // }

    // #setScreenValue(percent) {
    //     this.#screenValue = percent;
    //     this.#debouncedUpdate(percent);
    //     this.emit('changed');
    //     this.notify('screen-value');
    //     this.emit('screen-changed', this.#screenValue);
    // }

    // #easeInOutCubic(t) {
    //     return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    // }

    // constructor() {
    //     super()

    //     const brightness = `/sys/class/backlight/${this.#interface}/brightness`
    //     //Utils.monitorFile(brightness, () => this.#onChange())

    //     this.#asyncUpdate()
    // }

    // #onChange() {
    //     this.#asyncUpdate()

    //     // this.emit('changed')
    //     // this.notify('screen-value')

    //     // this.emit('screen-changed', this.#screenValue)
    // }

    // connect(event = 'screen-changed', callback) {
    //     return super.connect(event, callback)
    // }

    // async #asyncUpdate(){
    //     //this.#screenValue = Number(await Utils.execAsync('xbacklight -get'))

    //     try {
    //         const newValue = Number(await Utils.execAsync('xbacklight -get'));
    //         if (newValue !== this.#screenValue) {
    //             this.#screenValue = newValue;
    //             this.emit('changed');
    //             this.notify('screen-value');
    //             this.emit('screen-changed', this.#screenValue);
    //         }
    //     } catch (error) {
    //         console.error('Failed to update backlight value:', error);
    //     }
    // }

    // #debouncedUpdate(percent) {
    //     if (this.#updateTimeout) {
    //         clearTimeout(this.#updateTimeout);
    //     }
    //     this.#updateTimeout = setTimeout(async () => {
    //         try {
    //             await this.#animateBrightness(this.#sliderValue)
    //             //await this.#asyncUpdate();  // Fetch the actual value after setting
    //         } catch (error) {
    //             console.error('Failed to set backlight value:', error);
    //         }
    //     }, 50);  // 50ms debounce
    // }


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

    // TODO: Implement system based control
    #interface = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'")

    #backlightLevel = 100
    #updateTimeout = null
    #updateRate = 50

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

        const brightness = `/sys/class/backlight/${this.#interface}/brightness`
        Utils.monitorFile(brightness, () => this.#onFileChange())

        this.#backlightLevel = this.#getActualBacklightLevel()
    }

    #onFileChange(){
        const lastUserDefinedBacklightLevel = this.#backlightLevel
        const actualBacklightLevel = this.#getActualBacklightLevel()

        if(lastUserDefinedBacklightLevel != actualBacklightLevel) {
            this.#setBacklightLevel(actualBacklightLevel)
        }
    }

    #rateLimit(){
        if (this.#updateTimeout) {
            clearTimeout(this.#updateTimeout);
        }
        this.#updateTimeout = setTimeout(async () => {
            clearTimeout(this.#updateTimeout);
        }, this.#updateRate);
    }

    connect(event = 'screen-changed', callback) {
        return super.connect(event, callback)
    }
}

const service = new BacklightService

export default service