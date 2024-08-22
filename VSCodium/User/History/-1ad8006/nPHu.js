class ExtendedBatteryService extends Service {
    static {
        Service.register(
            this
        )
    }

    #batteryLevels = []

    get battery_levels(){
        return this.#readBatteryFile()
    }

    #readBatteryFile(){
        const logLocation = "/var/log/battery-levels.log"

        const fileContents = Utils.readFile(logLocation)

        console.log(fileContents)

        return fileContents
    }
}

const service = new ExtendedBatteryService

export default service