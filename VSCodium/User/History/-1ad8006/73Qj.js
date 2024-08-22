class ExtendedBatteryService extends Service {
    static {
        Service.register(
            this
        )
    }

    #batteryLevels = []

    get battery_levels(){

    }

    #readBatteryFile(){
        const logLocation = "/var/log/battery-levels.log"

        const fileContents = Utils.readFile(logLocation)

        
    }
}