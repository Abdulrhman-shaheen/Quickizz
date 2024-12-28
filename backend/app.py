from flask import Flask, request, render_template, jsonify, make_response
from flask_cors import CORS, cross_origin
from argon2 import PasswordHasher
from enum import IntEnum
from db_wrapper import DB_manager
from statuscodes import create_codes

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

StatusCodes = create_codes()

ph = PasswordHasher()
db = DB_manager()


def handle_login(request_data):

    if request_data["username"] == "" or request_data["password"] == "":
        return jsonify({"good": 0})

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


@app.route("/questions", methods=["GET"])
@cross_origin()
def questions():
    sess_id = request.args.get("sess_id", default=1, type=int)
    dbquestions = db["questions"].find({"sess_id": int(sess_id)})
    questions = []
    for question in dbquestions:
        question["_id"] = str(question["_id"])
        questions.append(question)

    return jsonify(questions)


@app.route("/counters", methods=["GET"])
@cross_origin()
def counters_GET():
    dbchoices = db["answers"].find()
    choices = []
    for choice in dbchoices:
        choice["_id"] = str(choice["_id"])
        choices.append(choice)

    return jsonify(choices)


@app.route("/updateuserquizzes", methods=["POST"])
@cross_origin(supports_credentials=True)
def quizz_update():
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
    return jsonify({"good": 5})


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
    return jsonify({"good": 6})


@app.route("/updateanswer", methods=["POST"])
@cross_origin(supports_credentials=True)
def answer_update():
    username = request.cookies.get("username")
    request_data = request.get_json()

    sess_id = int(request_data["sess_id"])
    q_id = request_data["q_id"]
    choice = request_data["choice"]

    db["quizzes"].find_one_and_update({"username": username, "sess_id": sess_id}, {"$set": {f"answers.{q_id}": choice}})
    return jsonify({"good": 7})


@app.route("/sessionanswers", methods=["POST"])
@cross_origin()
def sess_answers():
    request_data = request.get_json()

    {
        "objectID": self.id,
        "a": self.count_a,
        "b": self.count_b,
        "c": self.count_c,
        "d": self.count_d,
    }
    return jsonify({"good": 1})


@app.route("/choices", methods=["POST"])
@cross_origin()
def choices():
    request_data = request.get_json()

    try:
        sess_id = int(request_data["sess_id"])
        username = str(request_data["username"])
    except KeyError:
        return jsonify({"good": 0})

    try:
        print(sess_id, username)
        choices = db["quizzes"].find_one(
            {"sess_id": int(sess_id), "username": username}
        )
        print(choices)
        choices["_id"] = str(choices["_id"])
    except:
        return jsonify(0)

    return jsonify(choices)


# @app.route("/test", methods=["GET"])
# @cross_origin()
# def testing():

#     db["users"].find_one({"username": "test"})
#     ans = db["answers"].find_one()
#     return jsonify(ans)
