var five = require("johnny-five");
var Raspi = require("raspi-io");
var droopyIot = require("droopy-iot");

var iot = droopyIot.register("horace");
var board = new five.Board({
  io: new Raspi()
});

var ensurePayload = (payload) => (payload.outlet && outlets[payload.outlet]);

var handlers = {
  togglePower(payload) {
    if (ensurePayload(payload)) {
      var method = payload.state ? "on" : "off"
      console.log(`${payload.outlet} ${method}`);
      outlets[payload.outlet][method].apply(outlets[payload.outlet]);
    }
  },
  getState(payload, event) {
    if (ensurePayload(payload)) {
      event.respond({ state: outlets[payload.outlet].isOn })
    }
  }
};

var outlets = {};

board.on("ready", function() {
  setupOutlet("three", 18);
  setupOutlet("four", 22);
  setupOutlet("five", 27);
  setupOutlet("six", 17);

  iot.subscribe("toggle-power", handlers.togglePower);
  iot.subscribe("get-power", handlers.getState);
});

function setupOutlet(name, pin) {
  pin += "";
  if (!pin.startsWith("GPIO")) pin = "GPIO" + pin;
  outlets[name] = new five.Relay({ pin, type: "NC" });
  outlets[name].on();
  outlets[name].off();
  outlets[name].on();
}
  // Control the relay in real time
  // from the REPL by typing commands, eg.
  //
  // relay.on();
  //
  // relay.off();
  //
 //this.repl.inject(outlets);