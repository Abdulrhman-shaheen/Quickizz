import enum
from enum import IntEnum
import json

def create_codes():
    with open(r"..\src\statuscodes.json") as f:
        status_codes = json.load(f)

    return status_codes
