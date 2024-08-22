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

        const parsedResults = fileContents.split(/\r?\n/)

        console.log(parsedResults)
        return parsedResults
    }
}

const service = new ExtendedBatteryService

export default service