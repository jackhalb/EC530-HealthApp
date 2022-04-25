import fetch from "node-fetch";

let user = {
    name: "Patient Zero",
    password: "zero"
}

async function login() {
    console.log("hi")
    let res = await fetch("http://127.0.0.1:5000/authenticate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
    );
    let data = await res.json();
    console.log("hello")
    return data;
}

login().then(r => console.log(r))