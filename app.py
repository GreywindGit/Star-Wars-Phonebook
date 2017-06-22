from flask import Flask, render_template, request, redirect
import requests

app = Flask(__name__)


@app.route('/')
def main_page():
    planet_data = requests.get('https://swapi.co/api/planets').json()
    return render_template('index.html', planet_data=planet_data)


@app.route('/login', methods=['GET'])
def show_login():
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def do_login():
    return redirect(request.referrer)


@app.route('/register', methods=['GET'])
def show_register():
    return render_template('register.html')


@app.route('/register', methods=['POST'])
def do_register():
    return redirect(request.referrer)


@app.route('/logout')
def do_logout():
    return redirect(request.referrer)


if __name__ == '__main__':
    app.run(debug=True)
