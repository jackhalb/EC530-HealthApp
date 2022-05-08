from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pymongo
import device_module
import messaging_module as msg

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient(
    "mongodb+srv://Github:github@cluster0.pkk8t.mongodb.net/Test1?retryWrites=true&w=majority")

db = client["Test1"]
devices = db["Devices"]
users = db["Users"]
convs = db["Conversations"]


# AUTHENTICATION MODULE

@app.route("/add-new-user", methods=["POST", "OPTIONS"])
@cross_origin()
def add_new_user():
    temp_headers = {'Access-Control-Allow-Origin': '*'}
    if request.method == 'POST':
        posted_data = request.get_json()
        user = posted_data['user_info']
        users.insert_one(user)
        return {
            'message': str("Successfully added  " + str(user)),
            'headers': temp_headers
        }, 200
    else:
        response = Flask.Response(headers=temp_headers)
        return response



@app.route("/find-user", methods=["POST", "OPTIONS"])
@cross_origin()
def find_user():
    temp_headers = {'Access-Control-Allow-Origin': '*'}
    if request.method == "OPTIONS":
        response = Flask.Response(headers=temp_headers)
        return response
    else:
        target = request.get_json()
        username = target['username']
        existing_name = users.find_one({'username': username})
        if existing_name == None:
            return {
                'message': "User does not exist.",
                'exists': False,
                'headers': temp_headers
            }, 404
        else:
            existing_name['_id'] = str(existing_name['_id'])
            existing_name['headers'] = temp_headers
    
        return existing_name

    


@app.route("/authenticate", methods=["POST", "OPTIONS"])
@cross_origin()
def find():
    temp_headers = {'Access-Control-Allow-Origin': '*'}
    if request.method == "OPTIONS":
        response = Flask.Response(headers=temp_headers)
        return response
    else:
        target = request.get_json()
        username = target['name']
        password = target['password']
        existing_name = users.find_one(
            {'username': username,
             'password': password})
        if existing_name == None:
            return {
                'message': "User does not exist.",
                'exists': False,
                'headers': temp_headers
            }, 404
        else:
            existing_name['_id'] = str(existing_name['_id'])
            existing_name['headers'] = temp_headers

        return existing_name


# DEVICE MODULE

@app.route("/add-new-device", methods=["POST"])
def add_new_device():
    if request.method == 'POST':
        posted_data = request.get_json()
        device = posted_data['device']
        check = device_module.check_device_format(device)
        if check:
            devices.insert_one(device)
            return jsonify(str("Successfully stored  " + str(device)))
        else:
            return False


@app.route("/find-device", methods=["GET"])
def find_device():
    target = request.get_json()
    existing_name = devices.find_one(target)
    existing_name['_id'] = str(existing_name['_id'])
    return existing_name


@app.route("/view-devices", methods=["GET"])
def view():
    target = request.get_json()
    devices_list = []
    for device in devices.find({"user": target['name']}, {"_id": 0, "name": 1}):
        devices_list.append(device['name'])
    return jsonify(devices_list)


@app.route("/new-reading", methods=["POST"])
def create_reading():
    target = request.get_json()
    username = target['name']
    reading = target['health_reading']
    check = device_module.check_health_reading_format(reading)
    if check:
        users.update_one(
            {'username': username},
            {'$push': {'health_records': reading}})
        return jsonify(str("Successfully stored  " + str(reading)))
    else:
        return False

# MESSAGING MODULE


@app.route("/start-new-conversation", methods=["POST"])
def start_new_conv():
    target = request.get_json()
    check = msg.check_conversation_format(target)
    if check:
        target['participants'] = msg.alphabetize(target["participants"][0], target["participants"][1])
        convs.insert_one(target)
        return jsonify(str("Successfully stored  " + str(target)))
    else:
        print(check)
        return False


@app.route("/view-conversations", methods=["GET"])
def view_conversations():
    target = request.get_json()
    conv_list = []
    for conv in convs.find({"starter": target['username']}):
        conv_list.append(conv['receiver'])
    for conv in convs.find({"receiver": target['username']}):
        conv_list.append(conv['starter'])
    return jsonify(conv_list)


@app.route("/view-messages", methods=["GET"])
def view_messages():
    target = request.get_json()
    target['participants'] = msg.alphabetize(target['participants'][0], target['participants'][1])
    conversation = convs.find_one(target)
    return jsonify(conversation["messages"])


@app.route("/send-message", methods=["POST"])
def send_message():
    target = request.get_json()
    check = msg.check_message_format(target)
    if check:
        target['participants'] = msg.alphabetize(target['participants'][0], target['participants'][1])
        convs.update_one(
            {'participants': target['participants']},
            {'$push': {'messages': target['message']}})
        return jsonify(str("Successfully stored  " + str(target['message'])))
    else:
        return False


if __name__ == '__main__':
    app.run(debug=True)
