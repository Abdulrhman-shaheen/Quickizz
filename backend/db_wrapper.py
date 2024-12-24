from pymongo import MongoClient


class DB_manager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        if not hasattr(self, "initialized"):
            self.initialized = True
            self.client = MongoClient()
            self.db = self.client.get_database("my_db")
            self.collections = {}
    
    def __getitem__(self, collection_name):

        try:
            return self.collections[collection_name]
        except KeyError:
            try:
                collection = (self.db.get_collection(collection_name))
            except:
                collection = self.add_collection(self.db.create_collection(collection_name))
            
            self.collections[collection_name] = collection 
            return collection

    def add_collection(self, collection_name):
        self.collections[collection_name] = self[collection_name]

    def get_db(self):
        return self.db



    