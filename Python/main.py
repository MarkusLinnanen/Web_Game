import mysql.connector
import PlayerData
import Map
import Shop
from flask import Flask, redirect, url_for, request, make_response, jsonify
from flask_cors import CORS
import random
import Inventory

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'

cnx = mysql.connector.connect(user='userguy', password='pw0rd',
                              host='localhost',
                              database='fishbase')
cursor = cnx.cursor(dictionary=True, buffered=True)

#_player = PlayerData.player(cursor, cnx, "")


#---Here are the player functions---#
def login(name):
    global cnx, cursor
    return PlayerData.player(cursor, cnx, name).vals

# Used if only player name can be given but a player class object is needed (Python only!)
def getPlayer(name):
    global cnx, cursor
    return PlayerData.player(cursor, cnx, name)

def getPlayerLocation(name):
    return getPlayer(name).getLocation()

def updateLocation(playerName, countryName):
    global cursor, cnx
    cursor.execute("UPDATE player SET location = %s WHERE name = %s", (countryName, playerName))
    cnx.commit()
    cursor.execute("SELECT imageLink FROM country WHERE name = %s", (countryName,))
    return cursor.fetchall()[0]

def delPlayer(playerName):
    return getPlayer(playerName).deletePlayer()

def getPlayerMoney(playerName):
    return getPlayer(playerName).getMoney()

def getPlayerString(playerName):
    return getPlayer(playerName).getString()

def setPlayerMoney(playerName, moneyAmount):
    return getPlayer(playerName).setMoney(moneyAmount)


#---Here are the fish functions---#
def fishInfo():
    global cursor
    cursor.execute("SELECT * FROM fish")

    retList = cursor.fetchall()
    retDict = {}
    for val in retList:
        retDict.update(val)

    return retDict

def getCaughtTable(playerName):
    global cursor
    cursor.execute("SELECT fish, caught FROM caught WHERE player = %s", (playerName,))
    return cursor.fetchall()

def isCaught(playerName, fishName):
    global cursor
    cursor.execute("SELECT caught FROM caught WHERE player = %s AND fish = %s", (playerName, fishName))
    return cursor.fetchall()[0]

def catchFish(playerName, countryName):
    global cursor, cnx
    cursor.execute("SELECT name FROM fish WHERE country = %s", (countryName, ))
    fish = cursor.fetchall()
    fish = fish[random.randint(0, (len(fish) - 1))]
    money = random.randint(5, 15)
    cursor.execute("UPDATE caught, player SET caught = 1, money = money + %s WHERE player = %s AND fish = %s", (money, playerName, fish["name"]))
    cnx.commit()
    return fish



#---Here are the Shop & Inventory functions---#
def getStock():
    global cursor, cnx
    return Shop.shop(cursor, cnx).stock

def itemHover(itemStr):
    return {"result":"hovering"}

def shopBuy(playerName, itemStr):
    global cursor, cnx
    stck = getStock()
    for itm in stck["items"]:
        if itm["name"] == itemStr:
            return setPlayerMoney(playerName, -itm["price"])
    return getPlayerMoney(playerName)


def closeSite():
    global cursor, cnx
    cursor.close()
    cnx.close()


@app.route('/runFunction', methods=['POST'])
def run_python_function():
    global cursor, cnx
    data = request.json  # Assumes the data sent from JavaScript is in JSON format

    # Extract the function name and arguments from the request
    function_name = data.get('function_name')
    arguments = data.get('arguments', [])

    # Execute the Python function dynamically
    try:
        result = globals()[function_name](*arguments)
    except Exception as e:
        return {'error': str(e)}

    return result


if __name__ == '__main__':
    sp = Shop.shop(cursor, cnx)
    app.run(debug=True, use_reloader=True, host='127.0.0.1', port=3000)
