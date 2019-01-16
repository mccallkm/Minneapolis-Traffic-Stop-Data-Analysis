from sqlalchemy import Column, Integer, String
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
import pandas as pd
import sqlalchemy
# import necessary libraries
from flask import (
    Flask,
    render_template,
    jsonify,
    request)

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///stops.sqlite"

db = SQLAlchemy(app)
    
    # Define dowData table
class dowData(db.Model):
    __tablename__ = 'dowData'
    neighborhood = db.Column((String), primary_key=True)
    gender =db.Column(String)
    responseDow = db.Column(Integer)
    genderCount = db.Column(Integer)
    def __repr__(self):
        return '<dowData %r>' % (self.neighborhood)

    
# Define our neighborhoodData table
class neighborhoodData(db.Model):
    __tablename__ = 'neighborhoodData'
    id = Column(Integer, primary_key=True)
    neighborhood = Column(String)
    def __repr__(self):
        return '<neighborhoodData %r>' % (self.neighborhood)

     # Define dowData table
class stopData(db.Model):
    __tablename__ = 'stopData'
    OBJECTID = Column(Integer, primary_key=True)
    neighborhood = db.Column(String)
    responseDate = Column(String)
    citationIssued = Column(String)
    lat= Column(Integer)
    lon= Column(Integer)
    gender =Column(String)
    responseDow = Column(Integer)
    responseDay =Column(Integer)
    responseMonth = Column(Integer)
    responseMonthName =Column(String)
    responseYear = Column(Integer)
    def __repr__(self):
        return '<stopData %r>' % (self.OBJECTID)



    


##################################################
# Flask Routes

@app.route("/")
def index():
    
    return render_template("piechart.html")


@app.route("/neighborhood")
def neighbor():
    results = db.session.query(neighborhoodData.neighborhood).all()

    neighborList = []
    for result in results:
        neighborList.append({
            "neighborhood": result[0],
        })
    return jsonify(neighborList)

@app.route("/dow")
def dayOfWeek():
    results = db.session.query(dowData.neighborhood,
                                dowData.gender,
                                dowData.responseDow,
                                dowData.genderCount).all()

    dowList = []
    for result in results:
        dowList.append({
            "neighborhood": result[0],
            "gender":result[1],
            "responseDow": result[2],
            "genderCount":result[3]
        })
    return jsonify(dowList)


@app.route("/stop")
def copStop():
    results = db.session.query(stopData.OBJECTID,
                                stopData.neighborhood,
                                stopData.responseDate,
                                stopData.citationIssued,
                                stopData.lat,
                                stopData.lon,
                                stopData.gender,
                                stopData.responseDow,
                                stopData.responseDay,
                                stopData.responseMonth,
                                stopData.responseMonthName,
                                stopData.responseYear,
                                ).all()
    
    stopList = []
    for result in results:
        stopList.append({
            "OBJECTID":result[0],
            "neighborhood": result[1],
            "responseDate":result[2],
            "citationIssued":result[3],
            "lat":result[4],
            "lon":result[5],
            "gender":result[6],
            "responseDow": result[7],
            "responseDay":result[8],
            "responseMonth":result[9],
            "responseMonthName":result[10],
            "responseYear":result[11]
        })
    return jsonify(stopList)

@app.route("/pieinfo")
def copStop1():
# @app.route('/samples/<sample>')
    results = db.session.query(stopData.OBJECTID,
                                stopData.neighborhood,
                                stopData.responseDate,
                                stopData.citationIssued,
                                stopData.lat,
                                stopData.lon,
                                stopData.gender,
                                stopData.responseDow,
                                stopData.responseDay,
                                stopData.responseMonth,
                                stopData.responseMonthName,
                                stopData.responseYear,
                                ).all()

    # df = pd.read_sql_query(results, db.session.bind)

    # Make sure that the sample was found in the columns, else throw an error
    # if sample not in df.columns:
    #     return jsonify(f"Error! Sample: {sample} Not Found!"), 400

    # Return any sample values greater than 1
    #    df = df[df[sample] > 1]

    # Sort the results by sample in descending order
    #    df = df.sort_values(by=sample, ascending=0)

    # Format the data to send as json
    data = [{
        "OBJECTID": results
    }]
  
    return jsonify(data)

# def copStop1():
#     results = db.session.query(stopData.OBJECTID,
#                                 stopData.neighborhood,
#                                 stopData.responseDate,
#                                 stopData.citationIssued,
#                                 stopData.lat,
#                                 stopData.lon,
#                                 stopData.gender,
#                                 stopData.responseDow,
#                                 stopData.responseDay,
#                                 stopData.responseMonth,
#                                 stopData.responseMonthName,
#                                 stopData.responseYear,
#                                 ).all()
    
#     stopList = []
#     for result in results:
#         stopList.append({
#             "OBJECTID":result[0],
#             "neighborhood": result[1],
#             "responseDate":result[2],
#             "citationIssued":result[3],
#             "lat":result[4],
#             "lon":result[5],
#             "gender":result[6],
#             "responseDow": result[7],
#             "responseDay":result[8],
#             "responseMonth":result[9],
#             "responseMonthName":result[10],
#             "responseYear":result[11]
#         })
    # return jsonify(stopList)



if __name__ == "__main__":
    app.run(port=5001)
  