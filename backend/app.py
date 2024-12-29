from enum import IntEnum

from argon2 import PasswordHasher
from flask import Flask, jsonify, make_response, render_template, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit, join_room, send

from db_wrapper import DB_manager
from Question import Question
from statuscodes import create_codes

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app,  cors_allowed_origins="*")

CORS(app)  # Enable CORS for all routes

StatusCodes = create_codes()

ph = PasswordHasher()
db = DB_manager()


def handle_login(request_data):

    if request_data["username"] == "" or request_data["password"] == "":
        return jsonify({"good": StatusCodes["EMPTY_FIELD"]})

    try:
        ph.verify(
            db["users"].find_one(
                {
                    "username": request_data["username"],
                }
            )["password"],
            request_data["password"],
        )
        return jsonify({"good": StatusCodes["SUCCESS_LOGIN"]})
    except:
        return jsonify({"good": StatusCodes["WRONG_CREDS"]})


# ---------------------------------usersandshits--------------------------------- #


@app.route("/signup", methods=["POST"])
@cross_origin(supports_credentials=True)
def signup():

    request_data = request.get_json()
    if request_data["username"] == "" or request_data["password"] == "":
        return jsonify({"good": StatusCodes["EMPTY_FIELD"]})

    if db["users"].find_one({"username": request_data["username"]}) == None:
        db["users"].insert_one(
            {
                "username": request_data["username"],
                "password": ph.hash(request_data["password"]),
                "firstname": request_data["firstname"],
                "lastname": request_data["lastname"],
                "sessions": [],
                "quizzes": [],
            }
        )
        return jsonify({"good": StatusCodes["USER_CREATED"]})
    else:
        return jsonify({"good": StatusCodes["USER_NAME_EXISTS"]})


@app.route("/login", methods=["POST"])
@cross_origin(supports_credentials=True)
def loginlecturer():
    request_data = request.get_json()
    resp = make_response(handle_login(request_data))
    resp.set_cookie("username", request_data["username"])
    return resp


@app.route("/getuser", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_user():
    username = request.cookies.get("username")
    user = db["users"].find_one({"username": username})
    user["_id"] = str(user["_id"])
    return jsonify(user)


# ---------------------------------STUDENT--------------------------------- #


@app.route("/questions", methods=["GET"])
@cross_origin(supports_credentials=True)
def questions():
    sess_id = request.args.get("sess_id", default=0, type=int)
    print(request)
    dbquestions = db["questions"].find({"sess_id": int(sess_id)})
    questions = []
    for question in dbquestions:
        question["_id"] = str(question["_id"])
        questions.append(question)

    return jsonify(questions)


@app.route("/answers", methods=["GET"])
@cross_origin(supports_credentials=True)
def answers():
    sess_id = request.args.get("sess_id", default=0, type=int)
    dbanswers = db["answers"].find_one({"sess_id": int(sess_id)})
    if dbanswers == None:
        return jsonify(0)
    dbanswers["_id"] = str(dbanswers["_id"])
    return jsonify(dbanswers)


@app.route("/updateuserquizzes", methods=["POST"])  # Equivalent to update user sessions
@cross_origin(supports_credentials=True)
def user_quizz_update():
    username = request.cookies.get("username")
    request_data = request.get_json()
    sess_id = int(request_data["sess_id"])

    newquizzes = list(
        set(db["users"].find_one({"username": username})["quizzes"] + [sess_id])
    )
    db["users"].find_one_and_update(
        {"username": username}, {"$set": {"quizzes": newquizzes}}
    )
    if db["quizzes"].find_one({"sess_id": sess_id, "username": username}) == None:
        db["quizzes"].insert_one(
            {"sess_id": sess_id, "username": username, "answers": {}, "score": 0}
        )
    return jsonify({"good": StatusCodes["UPDATED_QUIZ"]})


@app.route("/updatescore", methods=["POST"])
@cross_origin(supports_credentials=True)
def score_update():
    username = request.cookies.get("username")
    request_data = request.get_json()
    sess_id = int(request_data["sess_id"])
    score = request_data["score"]
    db["quizzes"].find_one_and_update(
        {"sess_id": sess_id, "username": username}, {"$set": {"score": score}}
    )
    return jsonify({"good": StatusCodes["UPDATED_SCORE"]})


@app.route("/getscores", methods=["POST"])
@cross_origin(supports_credentials=True)
def get_quizz():
    username = request.cookies.get("username")
    request_data = request.get_json()
    quizzes = request_data["quizzes"]

    scores = {}

    for quiz in quizzes:
        object = db["quizzes"].find_one(
            {"sess_id": int(quiz), "username": username}
        )
        scores[quiz] = object["score"] if object else 0

    return jsonify({"good": StatusCodes["SCORES_FETCHED"], "scores": scores})


@app.route("/choices", methods=["POST"])
@cross_origin(supports_credentials=True)
def choices():
    request_data = request.get_json()
    try:
        sess_id = int(request_data["sess_id"])
        username = request.cookies.get("username")
    except KeyError:
        return jsonify({"good": StatusCodes["EMPTY_FIELD"]})
    try:
        choices = db["quizzes"].find_one(
            {"sess_id": int(sess_id), "username": username}
        )
        choices["_id"] = str(choices["_id"])
    except:
        return jsonify(0)

    return jsonify(choices)


@app.route("/updateanswer", methods=["POST"])  # Equivalent to update session answer
@cross_origin(supports_credentials=True)
def answer_update():
    username = request.cookies.get("username")
    request_data = request.get_json()

    sess_id = int(request_data["sess_id"])
    q_id = request_data["q_id"]
    choice = request_data["choice"]

    db["quizzes"].find_one_and_update(
        {"username": username, "sess_id": sess_id},
        {"$set": {f"answers.{q_id}": choice}},
    )

    db["answers"].update_one(
        {"sess_id": sess_id},  # Match the document by session ID
        {
            "$inc": {f"answers.{q_id}.{choice}": 1}
        },  # Increment the specific choice count
    )
    print({"id" : q_id, "choice" : choice})
    print("_-------------------------------_--__--_-----_-_----")
    socketio.emit(f"{str(sess_id)}_new_answer", {"id" : q_id, "choice" : choice})
    return jsonify({"good": StatusCodes["UPDATED_ANSWER"]})


# ---------------------------------LECTURER--------------------------------- #
@app.route("/updateusersessions", methods=["POST"])  # Equivalent to update user quizzes
@cross_origin(supports_credentials=True)
def user_sessions_update():
    username = request.cookies.get("username")
    request_data = request.get_json()
    sess_id = int(request_data["sess_id"])

    if db["answers"].find_one({"sess_id": sess_id}) == None:
        db["answers"].insert_one({"sess_id": sess_id, "answers": {}})

    newsessions = list(
        set(db["users"].find_one({"username": username})["sessions"] + [sess_id])
    )

    db["users"].find_one_and_update(
        {"username": username}, {"$set": {"sessions": newsessions}}
    )

    return jsonify({"good": StatusCodes["UPDATED_SESSION"]})


@app.route("/add-question", methods=["POST"])
@cross_origin()
def add_question():
    request_data = request.get_json()
    question = Question(
        request_data["sess_id"],
        request_data["question"],
        request_data["a"],
        request_data["b"],
        request_data["c"],
        request_data["d"],
        request_data["correct"],
    )

    db["questions"].insert_one(question.to_dict())
    dd = str(db["questions"].find_one(question.to_dict())["_id"])
    data = question.to_dict()
    data["_id"] = dd
    print(data)
    socketio.emit(f"{request_data['sess_id']}_new_question", data)
    return jsonify({"good": StatusCodes["QUESTION_ADDED"]})


# -----------------------------------SOCKETS (hopefully)-------------------------------

@socketio.on('message')
def handle_message(msg):
    print('Message: ' + msg)
    send(msg, broadcast=True)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('broadcast')
def handle_broadcast_event(msg):
    send(msg, broadcast=True)

@socketio.on('custom_event')
def handle_custom_event(data):
    emit('response', {'data': 'Custom event received!'}, broadcast=True)

if __name__ == '__main__':
        socketio.run(app, debug=True)



# @app.route("/test", methods=["GET"])
# @cross_origin()
# def testing():

#     db["users"].find_one({"username": "test"})
#     ans = db["answers"].find_one()
#     return jsonify(ans)
