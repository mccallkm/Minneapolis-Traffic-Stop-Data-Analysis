# Team_Bostock: Minneapolis Traffic Stop Data Analysis

![alt text](https://raw.githubusercontent.com/mccallkm/Team_Bostock/master/static/images/MplsSL.jpg)

Goal:
This project will examine traffic citations of the Minneapolis, MN Police Department. Our analysis aims to identify correlations with gender and the number of citations issued in a given neighborhood.

Objectives:
1. Identify how gender impacts whether a citation is received.
2. Pinpoint what neighborhoods have the highest number of pull overs.
3. Determine if citations increased towards the end of the month.
4. Determine if citations vary by the day of the week.

STOP DATA

Source: http://opendata.minneapolismn.gov/datasets/police-stop-data

Data Elements:
OBJECTID |masterIncidentNumber |responseDate |reason |problem |callDisposition |citationIssued 
|personSearch |vehicleSearch |preRace |race |gender |lat |long |x |y |policePrecinct |neighborhood |lastUpdateDate 

Metadata:[Police_Stop_Data] https://www.arcgis.com/home/item.html?id=215b4b543d894750aef86c725b56ee2a

NEIGHBORHOOD BORDERS

Source:[Neighborhoods.geojson] http://opendata.minneapolismn.gov/datasets/7f88316841ce471faa33c89035fb69e8_0?geometry=-93.728%2C44.886%2C-92.685%2C45.056 

Metadata:[Neighborhoods] https://www.arcgis.com/home/item.html?id=7f88316841ce471faa33c89035fb69e8 

POPULATION

Source:[MSP_CSV_2012_2016.csv] http://www.mncompass.org/profiles/neighborhoods/minneapolis-saint-paul

Source: 2012-2016 American Community Survey 5-year estimates, adjusted to fit current neighborhood boundaries using the 2010 Census counts. The 5-year estimates represent averages of data collected over that time period.

NOTE: This project is written in Python 3, HTML, CSS, and Javascript. It uses Flask, Sqlalchemy, sqlite, D3, Plotly, and Bootstrap. Run by executing python app.py at the command line. This will host the page at `http://127.0.0.1:5000/` in your web browser. 