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

messaging.peerSocket.addEventListener("message", (evt) => {
    console.log(JSON.stringify(evt.data));
    login().then(r => console.log(r))
});

console.log(typeof settingsStorage.getItem("username"))

const API = 'http://127.0.0.1:5000/authenticate'

async function login() {
    let user = {
        name: JSON.parse(settingsStorage.getItem("username")).name,
        password: JSON.parse(settingsStorage.getItem("password")).name
    }
    let res = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
    );
    let data = await res.json();
    return data;
}