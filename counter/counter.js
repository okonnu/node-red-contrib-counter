

const Report = require('./Report.js');
const Gpio = require('orange-pi-gpio');


let gpio5 = new Gpio({ pin: 5, mode: 'in' });


// Keep track of the previous state
let previousState = 0;
const debounceTimeout = 20;

const report = new Report();


// get datta from csv

// Counter definition
function count(state) {
    if (state == 1 && previousState == 0) {
        report.datta.cansPerSec++;
    }
    previousState = state;
}





module.exports = function (RED) {

    function counter(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function (msg) {
            msg.payload = msg.payload + "VDSFV";
            node.send(msg);
        });

        // Pin polling
        setInterval(function () {
            gpio5.read().then((state) => count(state));
        }, debounceTimeout);


        // Reporting
        setInterval(() => {
            let msg = { payload : report.genReport()}
            console.log(msg);
            report.datta.cansPerSec = 0;
            node.send(msg);
        }, 1000);

    }

    RED.nodes.registerType("counter", counter);

}
















