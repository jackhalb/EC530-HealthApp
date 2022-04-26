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


const accelLabel = document.getElementById("accel-label");
const accelData = document.getElementById("accel-data");

const barLabel = document.getElementById("bar-label");
const barData = document.getElementById("bar-data");

const bpsLabel = document.getElementById("bps-label");
const bpsData = document.getElementById("bps-data");

const gyroLabel = document.getElementById("gyro-label");
const gyroData = document.getElementById("gyro-data");

const hrmLabel = document.getElementById("hrm-label");
const hrmData = document.getElementById("hrm-data");

const orientationLabel = document.getElementById("orientation-label");
const orientationData = document.getElementById("orientation-data");

const sensors = [];

const myButton = document.getElementById("button-1");
myButton.text = "CONNECT";

messaging.peerSocket.addEventListener("error", (err) => {
    console.error(`Connection error: ${err.code} - ${err.message}`);
});

function sendMessage() {
    // Sample data
    const data = {
        title: 'My test data',
        isTest: true,
        records: [1, 2, 3, 4]
    }
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send the data to peer as a message
        messaging.peerSocket.send(data);
    }
}

myButton.addEventListener("click", (evt) => {
    console.log("CLICKED");
    sendMessage()
})

if (Accelerometer) {
    const accel = new Accelerometer({ frequency: 1 });
    accel.addEventListener("reading", () => {
        accelData.text = JSON.stringify({
            x: accel.x ? accel.x.toFixed(1) : 0,
            y: accel.y ? accel.y.toFixed(1) : 0,
            z: accel.z ? accel.z.toFixed(1) : 0
        });
    });
    sensors.push(accel);
    accel.start();
} else {
    accelLabel.style.display = "none";
    accelData.style.display = "none";
}

if (Barometer) {
    const barometer = new Barometer({ frequency: 1 });
    barometer.addEventListener("reading", () => {
        barData.text = JSON.stringify({
            pressure: barometer.pressure ? parseInt(barometer.pressure) : 0
        });
    });
    sensors.push(barometer);
    barometer.start();
} else {
    barLabel.style.display = "none";
    barData.style.display = "none";
}

if (BodyPresenceSensor) {
    const bps = new BodyPresenceSensor();
    bps.addEventListener("reading", () => {
        bpsData.text = JSON.stringify({
            presence: bps.present
        })
    });
    sensors.push(bps);
    bps.start();
} else {
    bpsLabel.style.display = "none";
    bpsData.style.display = "none";
}

if (HeartRateSensor) {
    const hrm = new HeartRateSensor({ frequency: 1 });
    hrm.addEventListener("reading", () => {
        hrmData.text = JSON.stringify({
            heartRate: hrm.heartRate ? hrm.heartRate : 0
        });
    });
    sensors.push(hrm);
    hrm.start();
} else {
    hrmLabel.style.display = "none";
    hrmData.style.display = "none";
}

display.addEventListener("change", () => {
    // Automatically stop all sensors when the screen is off to conserve battery
    display.on ? sensors.map(sensor => sensor.start()) : sensors.map(sensor => sensor.stop());
});
