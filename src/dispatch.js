
class Dispatch {


	constructor() {
		this.vehicles = [] //store all vehicles
		this.driving = [] //store all driving vehicles
		this.charging = [] //store all charging vehicles
		this.available = [] //store all vehicles that have enough charge to drive
		this.routeTime = 30; //time it takes to drive the entire route
		this.stepTime = 5; //steps in minutes in which the program goes trough the simulation of time. 
		this.minCharge = (this.routeTime/this.stepTime) * (5.8 + Math.random() * 5.8)

	}

	move(step) {

		//stop all busses at the end of the day
		if (step === 595){ 
			this.driving.map((vehicle) => vehicle.stop())
			return;
		}

		//end the program
		if (step === 600){ 
			console.log(`Done`)
			return;
		}

		//dispatch a new bus every 15 minutes
		if ((step % 15) == 0){ 
			this.dispatch()
		}

		//For each step except for the first one, increase the driving time and charge of all busses 
		if(step > 0){
			for (let count = 0; count < this.driving.length; count ++) { //Go trough the list of driving busses
				const bus = this.driving.shift() //store the current bus in a variable
				this.increaseTime(bus) //inscrease the driving time of the bus with a function
				
				if (bus.drivingTime >= this.routeTime){ //check if the bus has driven the full route 
					bus.stop() //if so, stop the bus
					bus.drivingTime = 0 //reset the driving time
					this.charging.push(bus) //and add the bus to the charging vehicle list
				} else {
					this.driving.push(bus) //if not, put the bus back in to the driving vehicle list
				}

			}
			this.chargeStep() //Charge the vehicles in the available and charging vehicle list. 
		}

		
	}

	start() {
		// simulate evolution of time:
		for (let step = 0; step <= 10 * 60; step += this.stepTime) {

			//log data
			console.log(`Time is flowing: ${step} minutes passed.`)
			console.log(`Available busses: ${this.available.length}`)
			console.log(`Driving busses: ${this.driving.length}`)
			console.log(`Charging busses: ${this.charging.length}`)

			//Go through the driving/charging sequence for the busses
			this.move(step)
		}
	}

	dispatch() {
		//Take a bus out of the queue to start driving
		const bus = this.available.shift()
		
		//Start driving the bus and add it to the list of driving busses
		bus.start()
		this.driving.push(bus)

	}

	addVehicle(veh) {
		//add vehicle to the vehicle list and the available bus queue
		this.vehicles.push(veh)
		this.available.push(veh)
	}

	increaseTime(bus){
		//add 5 minutes to the time that the bus has been driving, used to check if the bus has completed the route
		bus.soc -= bus.energyConsumed()
		bus.drivingTime += 5;
	}

	chargeStep(bus){
		//check if there are busses available for charging
		if(this.charging.length >= 1){
			//if there are, go through the list of charging busses
			for (let count = 0; count < this.charging.length; count++) {
				//take each bus out of the queue one by one and add the charged energy/5min to the soc
				const bus = this.charging.shift()
				bus.soc += bus.energyCharged()
				//if the bus is charged to the minimum required charge for the route
				if(bus.soc >= this.minCharge){
					//if so put the bus in the available queue, so it can start driving when needed
					this.available.push(bus)
				} else {
					//else keep the bus in its charging position
					this.charging.push(bus)
				}
			}
		}
		//check if there are busses available that are not driving, arent getting used so that they can be charged
		if(this.available.length >= 1){
			//if there are, go through the list of available busses
			for (let count = 0; count < this.available.length; count++) {
				//take each bus from the list and check if the charge
				const availableBus = this.available.shift()
				if(availableBus.soc > 85){
					//if the charge + the charge per 5 minutes exceeds the maximum soc, set the soc to its max 
					availableBus.soc = 100
					this.available.push(availableBus)//put the bus back in line to be able to start driving
				} else {
					//else just add the charge per 5 minutes
					availableBus.soc += availableBus.energyCharged()
					this.available.push(availableBus)//put the bus back in line to be able to start driving
				}
			}
		}
	}
}

module.exports = Dispatch
