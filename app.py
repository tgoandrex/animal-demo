import sqlite3
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('index.html', title='Animal List')

@app.route('/animals/api')
def get_animals():
    conn = get_db_connection()
    animals = conn.execute('SELECT * FROM animals').fetchall()
    conn.close()
    animal_list = [dict(animal) for animal in animals]
    return jsonify(animal_list)

@app.route('/add', methods=['POST'])
def add_animal():
    conn = get_db_connection()
    name = request.form['name']
    species = request.form['species']
    age = request.form['age']
    image_url = 'static\images\default.png'
    
    conn.execute('INSERT INTO animals (name, species, age, image_url) VALUES (?, ?, ?, ?)',
        (name, species, age, image_url)
    )
    conn.commit()
    conn.close()
    return render_template('index.html', title='Animal List')
