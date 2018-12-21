from sqlalchemy import Column, Integer, String
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
    
    return render_template("dowBar.html")


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


if __name__ == "__main__":
    app.run()
  