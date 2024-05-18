# save this as app.py
from flask import Flask, json, render_template, request
import pandas as pd
import pickle

app = Flask(__name__)
cars = pd.read_csv('CleanTrainingData.csv')
model = pickle.load(open("LinearRegressionModel.pkl", 'rb'))


@app.route("/")
def index():
    locations = sorted(cars['Location'].unique())
    years = sorted(cars['Year'].unique())
    fuel_type = cars['Fuel_Type'].unique()
    transmission = cars['Transmission'].unique()
    owner_type = cars['Owner_Type'].unique()
    seats = sorted(cars['Seats'].unique().astype(int))
    
    return render_template('index.html', locations=locations, years=years, fuel_type=fuel_type, transmission=transmission, owner_type=owner_type, seats=seats)


@app.route('/predict', methods=['POST'])
def predict():
    data = request.data.decode('utf-8')  # Decode the byte string to a regular string
    data_dict = json.loads(data)  # Convert the JSON string to a Python dictionary
    print(data_dict)
    yearOfPurchase = int(data_dict['yearOfPurchase'])
    seats = float("{:.1f}".format(float(data_dict['seats'])))
    kilometersDriven = int(data_dict['kilometersDriven'])
    mileage = float("{:.2f}".format(float(data_dict['mileage'])))
    engine = float("{:.1f}".format(float(data_dict['engine'])))
    power = float("{:.1f}".format(float(data_dict['power'])))
    originalPriceDetail = False if data_dict['originalPriceDetail'] == "0" else True
    originalPrice = 0 if originalPriceDetail == False else float("{:.2f}".format(float(data_dict['originalPrice'])/10**5))
    input_data = pd.DataFrame([[data_dict['city'], yearOfPurchase, kilometersDriven, data_dict['fuelType'], data_dict['transmission'], data_dict['ownerType'], mileage, engine, power, seats, originalPrice, originalPriceDetail]], 
                              columns=['Location', 'Year', 'Kilometers_Driven', 'Fuel_Type', 'Transmission', 'Owner_Type', 'Mileage', 'Engine', 'Power', 'Seats', 'New_Price', 'hasNewPrice'])
    prediction = model.predict(input_data)
    return str(int(prediction[0] * 10**5))


if __name__=="__main__":
    app.run(host='0.0.0.0', port=8080)