import PlayerData
import Fish
import Shop
from flask import Flask, render_template, redirect, url_for,request
from flask import make_response, jsonify

app = Flask(__name__)
_player = 0
@app.route('/login', methods=['POST'])
def login():
    datafromjs = request.form['mydata']
    global _player
    _player = PlayerData.player(datafromjs)
    result = _player.vals
    resp = make_response(result)
    resp.headers['Content-Type'] = "application/json"
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp
    #return render_template('./infoTest.html', message='')

@app.route("/shopStock", methods=['GET'])
def stockAsJson():
    s = Shop.shop()
    stock = jsonify(s.stock)
    stock.headers.add('Access-Control-Allow-Origin', '*') # * meinaa kaikkia nettisivuja, vaihdetaan se sit sen kalastussivun osotteeksi
    return stock


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, host='127.0.0.1', port=3000)

