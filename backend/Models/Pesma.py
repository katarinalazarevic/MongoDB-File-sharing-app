from datetime import datetime
from db_config import mongo_db

class Pesma:
    def __init__(self, url, vlasnik, datumPostavljanja=None):
        
        self.url = url 
        self.vlasnik = vlasnik
        self.datumPostavljanja = datumPostavljanja or datetime.utcnow()

    def to_dict(self):
        return {
            'url': self.url,
            'vlasnik': self.vlasnik,
            'datumPostavljanja': self.datumPostavljanja
        }