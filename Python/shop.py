import json

import flask
import mysql.connector
from flask import Flask, request

app = Flask(__name__)

cnx = mysql.connector.connect(user='userguy', password='pw0rd',
                              host='localhost',
                              database='fishbase')
cursor = cnx.cursor(dictionary = True)

class shop:
    def __init__(self):
        self.stock = {"items" : [], "itemCount" : 0}
        cursor.execute("SELECT * FROM bait", {})
        baits = cursor.fetchall()
        for bait in baits:
            bait.update({"type" : "bait"})
            self.stock["items"].append(bait)

        cursor.execute("SELECT * FROM string", {})
        strings = cursor.fetchall()
        for string in strings:
            string.update({"type" : "string"})
            self.stock["items"].append(string)

        self.stock["itemCount"] = len(self.stock["items"])
        #with open("../JSON/shop.json", 'w') as shopjson:
        #    json.dump(self.stock, shopjson)

s = shop()

@app.route("/shopStock", methods=['GET'])
def stockAsJson():
    stock = flask.jsonify(s.stock)
    stock.headers.add('Access-Control-Allow-Origin', '*') # * meinaa kaikkia nettisivuja, vaihdetaan se sit sen kalastussivun osotteeksi
    return stock

if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=3000)

cursor.close()
cnx.close()