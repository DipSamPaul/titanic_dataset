from flask import Flask, request, render_template
import pickle
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
pickle_in = open('RandomForestClassifier.pkl', 'rb')
classifier = pickle.load(pickle_in)

@app.route('/index')
def test():
    return render_template('index.html')

@app.route('/get-prediction', methods=['POST'])
def getPrediction():
    content = request.get_json()
    pclass = content['pclass']

    if content['Sex']=='female':
        Sex =1
    else:
        Sex = 0
    age = content['age']
    sibsp = content['sibsp']
    parch = content['parch']
    fare = content['fare']
    embarked = content['embarked']
    return str(classifier.predict([[pclass, Sex, age, sibsp, parch, fare, embarked]]))

if __name__ == '__main__':
    app.run(port=8081)