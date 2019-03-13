#########################################################################
# Retrieves data from sqlite database using sqlalchemy and serves that data at flask endpoints
# tables include dowData, neighborhoodData, stopData and citationData
########################################################################
from sqlalchemy import Column, Integer, String, Float
import os
# import necessary libraries
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    url_for)

import pandas as pd
from flask_sqlalchemy import SQLAlchemy

## static folder sets the "parent directory" - all link references must be within this directory
app = Flask(__name__,static_url_path= "/static", static_folder = "static")

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL','') or "sqlite:///db/stops.sqlite"


db = SQLAlchemy(app)
    
    # Define dowData table
    # stores neighborhood data by day of week as an integer 0-6 (Sun - Sat) and gender (Male Female Other)
class dowData(db.Model):
    __tablename__ = 'dowData'
    neighborhood = db.Column((String), primary_key=True)
    gender = db.Column(String)
    responseDow = db.Column(Integer)
    genderCount = db.Column(Integer)
    def __repr__(self):
        return '<dowData %r>' % (self.neighborhood)

    
# Define our neighborhoodData table
# for each neighborhood stores total Population with a margin of error and stop count 
class neighborhoodData(db.Model):
    __tablename__ = 'neighborhoodData'
    id = db.Column(Integer, primary_key=True)
    neighborhood = db.Column(String)
    totalPop = db.Column(Integer)
    margin = db.Column(Integer)
    stopCnt = db.Column(Integer)
    def __repr__(self):
        return '<neighborhoodData %r>' % (self.neighborhood)

     # Define stopData table
     # stores data for each stop included
class stopData(db.Model):
    __tablename__ = 'stopData'
    OBJECTID = db.Column(Integer, primary_key=True)
    neighborhood = db.Column(String)
    responseDate = db.Column(String)
    citationIssued = db.Column(String)
    lat= db.Column(Float)
    lon= db.Column(Float)
    gender = db.Column(String)
    responseDow = db.Column(Integer)
    responseDay = db.Column(Integer)
    responseMonth = db.Column(Integer)
    responseMonthName = db.Column(String)
    responseYear = db.Column(Integer)
    def __repr__(self):
        return '<stopData %r>' % (self.OBJECTID)

    # Define citationData table
    # stores data for each day of the month (1-31) with a count of citations for that day 
class citationData(db.Model):
    __tablename__ = 'citationData'
    responseDay = db.Column(Integer, primary_key=True)
    citationCnt = db.Column(Integer)
    def __repr__(self):
        return '<citationData %r>' % (self.neighborhood)

##################################################
# Flask Routes

##############################
## endpoints for html 
## because htmls files are stored outside of the flask static_folder they cannot be 
## linked directly from within an html file. These first links allow an indirect reference
## to html files.
@app.route("/")
def index():
    
    return render_template("index.html")

@app.route("/dowBar")
def dowbar():
    
    return render_template("dowBar.html")

@app.route("/map")
def heatmap():
    
    return render_template("heatmap.html")

@app.route("/neighborhoodmap")
def map():
    
    return render_template("map.html")

@app.route("/line")
def line():
    
    return render_template("line.html")

@app.route("/pie")
def pie():
    
    return render_template("piechart.html")

@app.route("/popstop")
def popstop():
    
    return render_template("popstop.html")
#################################
## endpoint for data
#returns json of neighborhoods
@app.route("/neighborhood")
def neighbor():
    results = db.session.query(neighborhoodData.neighborhood,neighborhoodData.totalPop,neighborhoodData.margin,neighborhoodData.stopCnt).all()

    neighborList = []
    for result in results:
        neighborList.append({
            "neighborhood": result[0],
            "totalPop":result[1],
            "margin":result[2],
            "stopCnt":result[3]
        })
    return jsonify(neighborList)
#################################
## endpoint for data
# returns json list of objects containing neighborhood, gender, responseDOW and genderCount
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

#################################
## endpoint for data
## returns json list of objects 
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

#################################
## endpoint for data
## returns json with 3 objects which contain lists of stop (citation=YES) information from selected neighborhoodname. 
# OBJECTID list, Gender list and Citation list
@app.route("/pieinfo/<neighborhoodname>")
def pieStop(neighborhoodname):

    sel = [stopData.OBJECTID,stopData.neighborhood,stopData.responseDate,stopData.citationIssued,stopData.lat,
                                stopData.lon,stopData.gender,stopData.responseDow,stopData.responseDay,stopData.responseMonth,
                                stopData.responseMonthName,stopData.responseYear,]

    results1 =db.session.query(*sel).\
        filter(stopData.neighborhood == neighborhoodname).all()
    
   
    pieList = []
    pieList1=[]  
    pieList2=[]
    for result in results1:
          pieList.append(result[0])
          pieList1.append(result[6])
          pieList2.append(result[3])

     

    data={"OBJECTID":pieList,"Gender":pieList1,"Citation":pieList2
    }
              
    return jsonify(data)
#################################
## endpoint for data
## returns json list of objects for a selected neighborhood(hoodname) by gender(Male, Female, Other), count of stops, count of citations
@app.route("/piedata/<hoodname>")
def pieData(hoodname):
    sel = [stopData.OBJECTID,stopData.neighborhood,stopData.citationIssued,stopData.gender]
    results =db.session.query(*sel).filter(stopData.neighborhood == hoodname).all()
     
    pieList= []
    for result in results:
        pieList.append({'OBJECTID':result[0],
                        'gender':result[3],
                        'citationIssued':result[2]
                        })
   
    pie_df=pd.DataFrame(pieList)
    stops=pie_df.groupby("gender")['OBJECTID'].count()
    citations=pie_df[pie_df['citationIssued']=='YES'].groupby('gender')['OBJECTID'].count()
    genderList=[]
    for i in range(0,3):
        if i == 0:
            gend = 'Female'
        elif i == 1:
            gend = 'Male'
        else:
            gend = 'Other'
        
        genderList.append({
            "gender":gend,
            "stops":int(stops[gend]),
            "citations":int(citations[gend])
            })  

    return jsonify(genderList)
#################################
## endpoint for data
## returns json list of objects for each day of the month(1-31) with a count of citations for that day 
@app.route("/citation")
def citationGiven():
    results = db.session.query(citationData.responseDay,
                                citationData.citationCnt
                                ).all()
    
    citationList = []
    for result in results:
        citationList.append({
            "responseDay": result[0],
            "citationCnt": result[1],
        })
    return jsonify(citationList)

if __name__ == "__main__":
    app.run()
  