import mysql.connector
import PlayerData
import Fish
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
cursor = cnx.cursor(dictionary = True)

_player = PlayerData.player(cursor, cnx, "")

def login(name):
    global cnx, cursor
    return PlayerData.player(cursor, cnx, name).vals

# Used if only player name can be given but a player class object is needed (Python only!)
def getPlayer(name):
    global cnx, cursor
    return PlayerData.player(cursor, cnx, name)

def stockAsJson():
    s = Shop.shop()
    stock = jsonify(s.stock)
    return stock

def closeSite():
    global cursor, cnx
    cursor.close()
    cnx.close()

def updateLocation(playerName, countryName):
    global cursor, cnx
    cursor.execute("UPDATE player SET location = %s WHERE name = %s", (countryName, playerName))
    cnx.commit()
    cursor.execute("SELECT imageLink FROM country WHERE name = %s", (countryName,))
    return cursor.fetchall()[0]

def delPlayer(playerName):
    return getPlayer(playerName).deletePlayer()

@app.route('/runFunction', methods=['POST'])
def run_python_function():
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


def fishInfo():
    global cursor
    cursor.execute("SELECT * FROM fish")
    return cursor.fetchall()



if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, host='127.0.0.1', port=3000)

