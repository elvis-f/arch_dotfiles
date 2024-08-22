// 	_                     
// (_) ___ ___  _ __  ___ 
// | |/ __/ _ \| '_ \/ __|
// | | (_| (_) | | | \__ \
// |_|\___\___/|_| |_|___/
                       
App.addIcons(`${App.configDir}/assets`)

const BrightnessIcon = () => Widget.Icon({
	icon: 'brightness-icon',
	class_name: 'brightness_icon',
	size: 20
})

const VolumeIcon = () => Widget.Icon({
	icon: 'volume-icon',
	class_name: 'volume_icon',
	size: 20
})

// 	_                _    _ _       _     _   
// | |__   __ _  ___| | _| (_) __ _| |__ | |_ 
// | '_ \ / _` |/ __| |/ / | |/ _` | '_ \| __|
// | |_) | (_| | (__|   <| | | (_| | | | | |_ 
// |_.__/ \__,_|\___|_|\_\_|_|\__, |_| |_|\__|
//                            |___/     

import backlight from './Services/backlight.js'

const BacklightSlider = () => Widget.Slider({
	class_name: 'custom_slider',
	on_change: self => backlight.backlight_level = self.value,
	value: backlight.bind('backlight-level'),
	draw_value: false,
	// Make this a zero for true black
	min: 10,
	max: 100,
})

const BacklightControl = () => Widget.Box({
	class_name: "backlight_container",
	children: [
		BrightnessIcon(),
		BacklightSlider(),
	]
})

// const BacklightLabel = () => Widget.Label({
// 	label: backlight.bind('screen-value').as(v => `${v}%`),
// 	setup: self => self.hook(backlight, (self, screenValue) => {
// 		self.label = screenValue ?? 0
// 	}, 'screen-changed')
// })

//  _           _   _                  
// | |__   __ _| |_| |_ ___ _ __ _   _ 
// | '_ \ / _` | __| __/ _ \ '__| | | |
// | |_) | (_| | |_| ||  __/ |  | |_| |
// |_.__/ \__,_|\__|\__\___|_|   \__, |
//                               |___/ 


import exbattery from './Services/extended-battery.js'

const battery = await Service.import('battery')

const BatteryLabel = () => Widget.CircularProgress({
	css: 'min-height: 16px; font-size: 8px;',
	child: Widget.Icon({
		icon: battery.bind('icon_name')
	}),
	startAt: 0.75,
	rounded: true,
	inverted: false,
	visible: battery.bind('available'),
	value: battery.bind('percent').as(p => p > 0 ? p / 100 : 0),
	class_name: battery.bind('charging').as(ch => ch ? 'charging' : ''),
})

const BatteryGraph = (dataArray) => Widget.Box({
	class_name: "graph",
	children: dataArray.map(x => {
		return Widget.ProgressBar({
			class_name: "graph_bar",
			inverted: true,
			vertical: true,
			value: x / 100
		})
	})
})

//       _            _    
//   ___| | ___   ___| | __
//  / __| |/ _ \ / __| |/ /
// | (__| | (_) | (__|   < 
//  \___|_|\___/ \___|_|\_\
                        
const MyClock = () => Widget.Label({class_name:"clock"})
	.poll(1000, self => {
		self.label = Utils.exec('date "+%H:%M:%S"')
	})

// 					_ _       
// 	 __ _ _   _  __| (_) ___  
//  / _` | | | |/ _` | |/ _ \ 
// | (_| | |_| | (_| | | (_) |
//  \__,_|\__,_|\__,_|_|\___/ 

const audio = await Service.import('audio')

const Div = (children) => Widget.Box({
	children: children
})

const P = (text) => Widget.Label(text)


/** @param {'speaker' | 'microphone'} type */
const VolumeSlider = (type = 'speaker') => Widget.Slider({
	class_name: 'custom_slider',
    drawValue: false,
    onChange: ({ value }) => audio[type].volume = value,
    value: audio[type].bind('volume'),
	min: 0,
	max: 100,
})

const VolumeControl = () => Widget.Box({
	children: [
		VolumeIcon(),
		VolumeSlider('speaker'),
		// VolumeSlide
	]
})

const AudioManager = () => Widget.Window({
	name: "audio_manager",
	visible: true,
	anchor: ['top', 'left'],
	child: Widget.Box({
		vertical: true,
		children: [
			P("DMNCR's Audio Manager"),
			P("Speaker:"),
			Div([
				P("Speaker list:"),
				...audio.speakers.map(x => {console.log(audio.speakers, x); return P(x.name)})
			]),
			Div([
				VolumeIcon(),
				VolumeSlider('speaker')
			]), 
			P("Microphone:"),
			Div([
				VolumeIcon(),
				VolumeSlider('microphone')
			]),
		]
	}),
	onClick: ()=>{console.log(audio.speakers)}
})

//  _                         _   
// | | __ _ _   _  ___  _   _| |_ 
// | |/ _` | | | |/ _ \| | | | __|
// | | (_| | |_| | (_) | |_| | |_ 
// |_|\__,_|\__, |\___/ \__,_|\__|
// 		    |___/        

function Left(){
	return Widget.Box({
		spacing: 8,
		children: [
			BacklightControl(),
			VolumeControl()
		]
	})
}

function Center(){
	return Widget.Box({
		spacing: 8,
		children: [
			MyClock()
		]
	})
}

function Right(){
	return Widget.Box({
		hpack: "end",
		spacing: 8,
		children: [
			Widget.Button({
				css: "all: unset",
				onClicked: () => {
					testWindowVisibility.value = !testWindowVisibility.value
				},
				child: BatteryLabel()
			})
			
			//BacklightLabel(),
		]
	})
}

//           _           _                   
// __      _(_)_ __   __| | _____      _____ 
// \ \ /\ / / | '_ \ / _` |/ _ \ \ /\ / / __|
//  \ V  V /| | | | | (_| | (_) \ V  V /\__ \
//   \_/\_/ |_|_| |_|\__,_|\___/ \_/\_/ |___/
                                          
function Bar(monitor = 0) {
	return Widget.Window({
		monitor,
		name: "bar",
		class_name: "bar",
		exclusivity: "exclusive",
		anchor: ["top", "left", "right"],
		child: Widget.CenterBox({
			class_name: 'widget_container',
			start_widget: Left(),
			center_widget: Center(),
			end_widget: Right()
		}),
	})
}

let testWindowVisibility = Variable(false)

const TestWindow = () => Widget.Window({
	name: 'test',
	visible: testWindowVisibility.bind(),
	child: TestBox(),
	anchor: ["top", "right"],
})

const TestBox = () => Widget.Box({
	class_name: "test_box",
	children: [
		BatteryGraph(exbattery.battery_levels)
	]
})

//                                     __ _       
//   __ _ _ __  _ __   ___ ___  _ __  / _(_) __ _ 
//  / _` | '_ \| '_ \ / __/ _ \| '_ \| |_| |/ _` |
// | (_| | |_) | |_) | (_| (_) | | | |  _| | (_| |
//  \__,_| .__/| .__(_)___\___/|_| |_|_| |_|\__, |
//       |_|   |_|                          |___/ 

App.config({
	style: './style.css',
	windows: [
		Bar(0),
		TestWindow(),
		AudioManager()
	]
})
