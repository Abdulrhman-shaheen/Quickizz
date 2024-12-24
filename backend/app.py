from flask import Flask, request, render_template, jsonify
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
                "sessions": [],
            }
        )
        return jsonify({"good": StatusCodes["USER_CREATED"]})
    else:
        return jsonify({"good": StatusCodes["USER_NAME_EXISTS"]})


@app.route("/loginstudent", methods=["POST"])
@cross_origin()
def loginstudent():
    request_data = request.get_json()
    return handle_login(request_data)


@app.route("/loginlecturer", methods=["POST"])
@cross_origin()
def loginlecturer():

    request_data = request.get_json()
    return handle_login(request_data)


# @app.route("/test", methods=["POST"])
# @cross_origin()
# def test():
#     request_data = request.get_json()
#     print(request_data)

#     return jsonify({"good": StatusCodes['WRONG_CREDS']})


# if __name__ == "__main__":
#     app.run(debug=True)
