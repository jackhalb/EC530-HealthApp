# EC530-HealthApp

## Overview
In this project, we are building a website for interaction with the API from our previous project. This will be a website where users can create an account as an administrator, medical professional or patient. Patients can upload health device readings to the app, make appointments with their assigned doctor, etc. to make their healthcare more easy and streamlined. The website will be built using Svelte which will make the app feel smooth and easy to use.

## Features
1. Add administrator functionality: We want to make it such that users can be added only when an adminisrator approves, and same for removing of a user. This is to ensure that not just any user can create or delete users from the data base, but rather only verified admins can do so. 
2. Booking appointments: Patients can book appointments with their assigned doctor(s), and this event will show up in both the patient and doctor's calendar through the website.
3. FitBit connectivity: We also wish to add FitBit data reading to our website, so that if the user has a FitBit they can add data such as their heartbeat, temperature, etc. to the app. This data will be linked to the user.



## My APIs

### Authentication Module

#### http://54.145.228.230/add-new-user -> Create a new user
Ex. requests.post('http://54.145.228.230/add-new-user', json={'user_info': user_info})

#### http://54.145.228.230/find-user -> Check if a username exists 
Ex. existing_name = requests.get('http://54.145.228.230/find-user', json={'username': username})

#### http://54.145.228.230/authenticate -> Check if a username and password combination exists
Ex. existing_account = requests.get('http://54.145.228.230/authenticate', json={  
        &nbsp; 'name': username,  
        &nbsp; 'password': password  
    })
    
### Device Module
        
#### http://54.145.228.230/add-new-device -> Add a new device
Ex. requests.post('http://127.0.0.1:5000/add-new-device', json=new_device)

#### http://54.145.228.230/find-device -> Check if a device name exists
Ex. existing_name = requests.get('http://54.145.228.230/find-device', json={'name': device_name})  
Ex 2. existing_MAC = requests.get('http://54.145.228.230/find-device', json={'MAC': device_MAC})

#### http://54.145.228.230/view-devices -> View all the devices under a registered user
Ex. device_list = requests.get('http://54.145.228.230/view-devices', json={'name': username}).json()

#### http://54.145.228.230/new-reading -> Add a new health reading to the current user
Ex. requests.post('http://54.145.228.230/new-reading', json={  
        &nbsp; 'name': username,  
        &nbsp; 'health_reading': health_reading  
    })
    
### Messaging Module

#### http://54.145.228.230/start-new-conversation -> Starts a new conversation with a user you have never messaged before
Ex. requests.post('http://54.145.228.230/start-new-conversation', json=new_conversation = {  
        &nbsp; "participants": participants,  
        &nbsp; "starter": participants[0],  
        &nbsp; "receiver": participants[1],  
        &nbsp; "messages": [message_dict]  
    })  
Note: sample_message_dict = {  
        &nbsp; "content": message_content,  
        &nbsp; "sender": username,  
        &nbsp; "timestamp": datetime.datetime.utcnow().strftime('%B %d %Y')  
    }
    
#### http://54.145.228.230/view-conversations -> Returns a list of all the people you have conversations with
Ex. conversation_list = requests.get('http://54.145.228.230/view-conversations', json={'username': username}).json()

#### http://54.145.228.230/view-messages -> Returns a list of all the messages that have been sent to or received from a particular user
Ex. messages = requests.get('http://54.145.228.230/view-messages', json={'participants': (username, recipient)}).json()

#### http://54.145.228.230/send-message
Ex. requests.post('http://54.145.228.230/send-message', json={  
        &nbsp; "participants": participants,  
        &nbsp; "message": message_dict  
    })
    
