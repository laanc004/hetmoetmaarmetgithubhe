
class Bus {

	constructor(name, soc) {
		this.name = name
		this.soc = soc
		this.drivingTime = 0
	}

	energyConsumed() {
		return 5.8 + Math.random() * 5.8
	}

	energyCharged() {
		return 15.0
	}

	// create methods that simulate a driving and thus energy consuming vehicle

	stop() {
		console.log(`Bus ${this.name} stopped driving`)
		console.log(`Bus ${this.name} started charging`)
	}

	start() {
		console.log(`Bus ${this.name} stopped charging`)
		console.log(`Bus ${this.name} started driving`)

	}
}

module.exports = Bus
