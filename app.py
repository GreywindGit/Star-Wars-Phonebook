from flask import Flask, render_template
import requests

app = Flask(__name__)


@app.route('/')
def main_page():
    planet_data = requests.get('https://swapi.co/api/planets').json()
    return render_template('index.html', planet_data=planet_data)


if __name__ == '__main__':
    app.run(debug=True)
