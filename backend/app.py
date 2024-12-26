from flask import Flask, request, render_template, jsonify
from flask_cors import CORS, cross_origin
from argon2 import PasswordHasher
from enum import IntEnum
from db_wrapper import DB_manager
from statuscodes import create_codes

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


StatusCodes = create_codes()


import enum


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
@cross_origin()
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
@cross_origin()
def loginlecturer():
    request_data = request.get_json()
    return handle_login(request_data)


@app.route("/counters", methods=["GET"])
@cross_origin()
def counters_GET():
    dbchoices = db["answers"].find()
    choices = []
    for choice in dbchoices:
        choice["_id"] = str(choice["_id"])
        choices.append(choice)

    return jsonify(choices)


@app.route("/counters", methods=["POST"])
@cross_origin()
def counters_POST():
    request_data = request.get_json()
    return jsonify({"good": 1})


@app.route("/questions", methods=["GET"])
@cross_origin()
def questions():
    dbquestions = db["questions"].find({"sess_id": 1})
    questions = []
    for question in dbquestions:
        question["_id"] = str(question["_id"])
        questions.append(question)

    return jsonify(questions)


# @app.route("/test", methods=["GET"])
# @cross_origin()
# def testing():

#     db["users"].find_one({"username": "test"})
#     ans = db["answers"].find_one()
#     return jsonify(ans)
