

const Dispatch = require("./dispatch")
const Bus      = require("./bus")

const dispatch = new Dispatch()

dispatch.addVehicle(new Bus("1", 100))
dispatch.addVehicle(new Bus("2", 100))
dispatch.addVehicle(new Bus("3", 100))
dispatch.addVehicle(new Bus("4", 100))

dispatch.start()
