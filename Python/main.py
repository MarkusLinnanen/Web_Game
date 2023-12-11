import mysql.connector
import PlayerData
import Fish
import Shop
from flask import Flask, render_template, redirect, url_for,request
from flask import make_response, jsonify

cnx = mysql.connector.connect(user='userguy', password='pw0rd',
                              host='localhost',
                              database='fishbase')
cursor = cnx.cursor(dictionary = True)

app = Flask(__name__)
_player = PlayerData.player(cursor, cnx, "")


def login(name):
    global _player, cnx, cursor
    _player = PlayerData.player(cursor, cnx, name)
    return _player.vals


@app.route("/shopStock", methods=['GET'])
def stockAsJson():
    s = Shop.shop()
    stock = jsonify(s.stock)
    stock.headers.add('Access-Control-Allow-Origin', '*') # * meinaa kaikkia nettisivuja, vaihdetaan se sit sen kalastussivun osotteeksi
    return stock


@app.route("/close", methods=['GET'])
def closeSite():
    global cursor, cnx
    cursor.close()
    cnx.close()

@app.route("/playerInfo", methods=['GET', 'POST'])
def playerInfo():
    global _player
    match request.method:
        case 'POST':
            req = request.form['mydata']
            #print(req)
            _player.setPlayer(req)
        case 'GET':
            resp = jsonify(_player.getPlayer())
            resp.headers.add('Access-Control-Allow-Origin', '*')
            #resp.headers['Content-Type'] = "application/json"
            return resp

@app.route('/runFunction', methods=['POST'])
def run_python_function(function_name, arguments):
    #data = request.json  # Assumes the data sent from JavaScript is in JSON format

    # Extract the function name and arguments from the request
    #function_name = data.get('function_name')
    #arguments = data.get('arguments', [])

    # Execute the Python function dynamically
    try:
        result = globals()[function_name](*arguments)
        response = {'result': result}
    except Exception as e:
        response = {'error': str(e)}

    return jsonify(response)

#@app.route("/fishInfo", methods=['GET', 'POST'])
#def fishInfo():

def catchFish(plrID):
    global cursor, cnx
    cursor.execute("UPDATE caught SET caught = 1 WHERE player = %s", (plrID))
    cnx.commit()

out = run_python_function(login, ["david"])
print(out)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, host='127.0.0.1', port=3000)

