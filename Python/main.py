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


@app.route('/login', methods=['POST'])
def login():
    datafromjs = request.form['mydata']
    global _player
    global cnx
    global cursor
    _player = PlayerData.player(cursor, cnx, datafromjs)
    result = _player.vals
    resp = jsonify(result)
    #resp.headers['Content-Type'] = "application/json"
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp
    return render_template('./infoTest.html', message='')


@app.route("/shopStock", methods=['GET'])
def stockAsJson():
    s = Shop.shop()
    stock = jsonify(s.stock)
    stock.headers.add('Access-Control-Allow-Origin', '*') # * meinaa kaikkia nettisivuja, vaihdetaan se sit sen kalastussivun osotteeksi
    return stock


@app.route("/close", methods=['GET'])
def closeSite():
    global cursor
    global cnx
    cursor.close()
    cnx.close()

@app.route("/playerInfo", methods=['GET', 'POST'])
def playerInfo():
    global _player
    match request.method:
        case 'POST':
            req = request.form['mydata']
            print(req)
            _player.setPlayer(req)
            resp = jsonify('{"response": "Did the thing"}')
            resp.headers.add('Access-Control-Allow-Origin', '*')
            #resp.headers['Content-Type'] = "application/json"
            return resp
        case 'GET':
            resp = jsonify(_player.getPlayer())
            resp.headers.add('Access-Control-Allow-Origin', '*')
            #resp.headers['Content-Type'] = "application/json"
            return resp


#@app.route("/fishInfo", methods=['GET', 'POST'])
#def fishInfo():


if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=3000)

