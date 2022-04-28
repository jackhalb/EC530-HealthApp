import { me as companion } from "companion";
import * as messaging from "messaging";
import { settingsStorage } from "settings";

if (!companion.permissions.granted("run_background")) {
    console.warn("We're not allowed to access to run in the background!");
}

const MILLISECONDS_PER_MINUTE = 1000 * 60;

// Tell the Companion to wake after 30 minutes
companion.wakeInterval = 30 * MILLISECONDS_PER_MINUTE;

// Listen for the event
companion.addEventListener("wakeinterval", doThis);


// Event happens if the companion is launched and has been asleep
if (companion.launchReasons.wokenUp) {
    doThis();
}

function doThis() {
    console.log("Wake interval happened!");
}

function sendMessage(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send the data to peer as a message
        messaging.peerSocket.send(data);
    }
}

messaging.peerSocket.addEventListener("message", (evt) => {
    // let received = JSON.stringify(evt.data)
    let received = evt.data
    if (received[0] === "CONNECT") {
        login().then(r => {
            console.log(r)
            if (r[1] === 200) {
                sendMessage(["LOGGED IN", JSON.parse(settingsStorage.getItem("username")).name])
            }
            else {
                console.log(r[1])
            }

        })
    }
    else if (received[0] === "UPLOAD") {
        post_reading(received[1]).then(r => {
            console.log(r)
            if (r[1] === 200) {
                sendMessage(["UPLOADED"])
            }
        })
    }
    else {
        console.log(received)
    }
});

console.log(typeof settingsStorage.getItem("username"))

const auth = 'http://127.0.0.1:5000/authenticate'
const create_reading = 'http://127.0.0.1:5000/new-reading'

async function login() {
    let user = {
        name: JSON.parse(settingsStorage.getItem("username")).name,
        password: JSON.parse(settingsStorage.getItem("password")).name
    }
    let res = await fetch(auth, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
    );
    let data = await res.json();
    return [data, res.status];
}

async function post_reading(data) {
    let health_reading = {
        "heart_rate": data
    }
    let health_item = {
        name: JSON.parse(settingsStorage.getItem("username")).name,
        health_reading: health_reading
    }
    let res = await fetch(create_reading, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(health_item)
        }
    );
    return [await res.json(), res.status]
}
