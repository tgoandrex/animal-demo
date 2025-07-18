import sqlite3
import os

connection = sqlite3.connect('database.db')

whiskers_image = os.path.join('static', 'images', 'whiskers.jpeg')
rolf_image = os.path.join('static', 'images', 'rolf.jpg')

with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO animals (name, species, age, image_url) VALUES (?, ?, ?, ?)",
    ('Whiskers', 'Cat', 4, whiskers_image)
)

cur.execute("INSERT INTO animals (name, species, age, image_url) VALUES (?, ?, ?, ?)",
    ('Rolf', 'Dog', 2, rolf_image)
)

connection.commit()
connection.close()
