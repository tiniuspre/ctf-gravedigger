import os

from faker import Faker
from flask import Flask
from flask_cors import CORS, cross_origin
from time import sleep
app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/grave/<int:grave_id>')
@cross_origin()
def grave(grave_id):
    fake = Faker('no_NO')
    Faker.seed(grave_id)
    sleep(0.001)
    if grave_id == 6996:
        return {'name': os.getenv("FLAG")}
    return {'name': fake.first_name() + ' ' + fake.last_name()}


if __name__ == '__main__':
    app.run()
