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
        const filteredResults = parsedResults.filter(x => )
        
        return resizeArray(parsedResults, 10)
    }
}

function resizeArray(arr, MAX_SIZE) {
    if (arr.length >= MAX_SIZE) {
        // If array is larger or equal to MAX_SIZE, return first MAX_SIZE elements
        return arr.slice(0, MAX_SIZE);
    } else {
        // If array is smaller than MAX_SIZE, fill the rest with zeros
        return [...arr, ...Array(MAX_SIZE - arr.length).fill(0)];
    }
}

const service = new ExtendedBatteryService

export default service