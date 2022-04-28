import { Accelerometer } from "accelerometer";
import { Barometer } from "barometer";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import * as document from "document";
import { Gyroscope } from "gyroscope";
import { HeartRateSensor } from "heart-rate";
import { OrientationSensor } from "orientation";
import * as document from "document";
import * as messaging from "messaging";


// const accelLabel = document.getElementById("accel-label");
// const accelData = document.getElementById("accel-data");
//
// const barLabel = document.getElementById("bar-label");
// const barData = document.getElementById("bar-data");
//
// const bpsLabel = document.getElementById("bps-label");
// const bpsData = document.getElementById("bps-data");
//
// const gyroLabel = document.getElementById("gyro-label");
// const gyroData = document.getElementById("gyro-data");
//
// const hrmLabel = document.getElementById("hrm-label");
// const hrmData = document.getElementById("hrm-data");
//
// const orientationLabel = document.getElementById("orientation-label");
// const orientationData = document.getElementById("orientation-data");

const sensors = [];

if (HeartRateSensor) {
    console.log("This device has a HeartRateSensor!");
    const hrm = new HeartRateSensor();
    hrm.addEventListener("reading", () => {
        console.log(`Current heart rate: ${hrm.heartRate}`);
    });
    hrm.start();
} else {
    console.log("This device does NOT have a HeartRateSensor!");
}

const myButton = document.getElementById("button-1");
const username_label = document.getElementById("username");
myButton.text = "CONNECT";

messaging.peerSocket.addEventListener("message", (evt) => {
    // console.error(`Connection error: ${err.code} - ${err.message}`);
    // let received = JSON.stringify(evt.data)
    let received = evt.data
    console.log("RECEIVED[0] IS: ", received[0])
    console.log("RECEIVED[1] IS: ", received[1])
    if (received[0] === "LOGGED IN") {
        myButton.text = "UPLOAD"
        username_label.text = received[1]
    } else if (received[0] === "UPLOADED") {
        myButton.text = "SUCCESS"
    }
})

function sendMessage() {
    let data = "None"
    if (myButton.text === 'CONNECT')
        data = ['CONNECT']
    else if (myButton.text === 'UPLOAD')
        data = ['UPLOAD', 75]
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send the data to peer as a message
        messaging.peerSocket.send(data);
    }
}

myButton.addEventListener("click", (evt) => {
    console.log("CLICKED");
    sendMessage()
})
//
// if (Accelerometer) {
//     const accel = new Accelerometer({ frequency: 1 });
//     accel.addEventListener("reading", () => {
//         accelData.text = JSON.stringify({
//             x: accel.x ? accel.x.toFixed(1) : 0,
//             y: accel.y ? accel.y.toFixed(1) : 0,
//             z: accel.z ? accel.z.toFixed(1) : 0
//         });
//     });
//     sensors.push(accel);
//     accel.start();
// } else {
//     accelLabel.style.display = "none";
//     accelData.style.display = "none";
// }
//
// if (Barometer) {
//     const barometer = new Barometer({ frequency: 1 });
//     barometer.addEventListener("reading", () => {
//         barData.text = JSON.stringify({
//             pressure: barometer.pressure ? parseInt(barometer.pressure) : 0
//         });
//     });
//     sensors.push(barometer);
//     barometer.start();
// } else {
//     barLabel.style.display = "none";
//     barData.style.display = "none";
// }
//
// if (BodyPresenceSensor) {
//     const bps = new BodyPresenceSensor();
//     bps.addEventListener("reading", () => {
//         bpsData.text = JSON.stringify({
//             presence: bps.present
//         })
//     });
//     sensors.push(bps);
//     bps.start();
// } else {
//     bpsLabel.style.display = "none";
//     bpsData.style.display = "none";
// }
//
// if (HeartRateSensor) {
//     const hrm = new HeartRateSensor({ frequency: 1 });
//     hrm.addEventListener("reading", () => {
//         hrmData.text = JSON.stringify({
//             heartRate: hrm.heartRate ? hrm.heartRate : 0
//         });
//     });
//     sensors.push(hrm);
//     hrm.start();
// } else {
//     hrmLabel.style.display = "none";
//     hrmData.style.display = "none";
// }

display.addEventListener("change", () => {
    // Automatically stop all sensors when the screen is off to conserve battery
    display.on ? sensors.map(sensor => sensor.start()) : sensors.map(sensor => sensor.stop());
});
