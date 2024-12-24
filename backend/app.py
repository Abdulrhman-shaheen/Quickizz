from flask import Flask, request, render_template, jsonify
from flask_cors import CORS, cross_origin
from argon2 import PasswordHasher
from enum import IntEnum
from db_wrapper import DB_manager

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


class ResponseCode(IntEnum):
    EMPTY_FIELD = 0
    USER_CREATED = 1
    USER_NAME_EXISTS = 2
    WRONG_CREDS = 3


ph = PasswordHasher()
db = DB_manager()


@app.route("/signup", methods=["POST"])
@cross_origin()
def signup():

    request_data = request.get_json()

    if request_data["username"] == "" or request_data["password"] == "":
        return jsonify({"good": ResponseCode.EMPTY_FIELD})

    if db["users"].find_one({"username": request_data["username"]}) == None:
        db["users"].insert_one(
            {
                "username": request_data["username"],
                "password": ph.hash(request_data["password"]),
                "sessions": [],
            }
        )
        return jsonify({"good": ResponseCode.USER_CREATED})
    else:
        return jsonify({"good": ResponseCode.USER_NAME_EXISTS})


@app.route("/login", methods=["POST"])
@cross_origin()
def login():

    request_data = request.get_json()

    if request_data["username"] == "" or request_data["password"] == "":
        return jsonify({"good": 0})

    try:
        ph.verify(
            db["users"].find_one(
                {
                    "username": request_data["username"],
                }
            )["password"],
            request_data["password"]
        )
        return jsonify({"good": ResponseCode.USER_CREATED})
    except:
        return jsonify({"good": ResponseCode.WRONG_CREDS})


if __name__ == "__main__":
    app.run(debug=True)
