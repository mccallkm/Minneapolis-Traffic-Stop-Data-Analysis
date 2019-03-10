# Minneapolis Traffic Stop Analysis

![traffic_scene](https://raw.githubusercontent.com/mccallkm/Team_Bostock/master/static/images/MplsSL.jpg)

Goal:
This project will examine traffic citations of the Minneapolis, MN Police Department. Our analysis aims to identify correlations with gender and the number of citations issued in a given neighborhood.

Objectives:
1. Identify how gender impacts whether a citation is received.
2. Pinpoint what neighborhoods have the highest number of pull overs.
3. Determine if citations increased towards the end of the month.
4. Determine if citations vary by the day of the week.

STOP DATA

[Source:](http://opendata.minneapolismn.gov/datasets/police-stop-data)

Data Elements:
OBJECTID |masterIncidentNumber |responseDate |reason |problem |callDisposition |citationIssued 
|personSearch |vehicleSearch |preRace |race |gender |lat |long |x |y |policePrecinct |neighborhood |lastUpdateDate 

[Metadata:](https://www.arcgis.com/home/item.html?id=215b4b543d894750aef86c725b56ee2a)

NEIGHBORHOOD BORDERS

[Source:](http://opendata.minneapolismn.gov/datasets/7f88316841ce471faa33c89035fb69e8_0?geometry=-93.728%2C44.886%2C-92.685%2C45.056)

[Metadata:](https://www.arcgis.com/home/item.html?id=7f88316841ce471faa33c89035fb69e8)

POPULATION

[Source:Minnesota Compass - MINNEAPOLIS-SAINT PAUL NEIGHBORHOODS](http://www.mncompass.org/profiles/neighborhoods/minneapolis-saint-paul)

Their Source: 2012-2016 American Community Survey 5-year estimates, adjusted to fit current neighborhood boundaries using the 2010 Census counts. The 5-year estimates represent averages of data collected over that time period.

The visualizations include: The a curve showing number of citation given for each day of the month.

![DayOfMonth.png](https://raw.githubusercontent.com/mccallkm/Team_Bostock/master/static/images/DayOfMonth.png)

A bar graph comparing two selected neighborhhods and the number of stops in each by the day of the week.
![DayOfWeek.png](https://raw.githubusercontent.com/mccallkm/Team_Bostock/master/static/images/DayOfWeek.png)

The bar graph with number of stops per resident for each neighborhood 

![stopcnt.png](https://raw.githubusercontent.com/mccallkm/Team_Bostock/master/static/images/stopcnt.png)

A neighborhood map with the number of citations.

![neighborhood.png](https://raw.githubusercontent.com/mccallkm/Team_Bostock/master/static/images/neighborhood.png)

A heat map of the stops.

![heat.png](https://raw.githubusercontent.com/mccallkm/Team_Bostock/master/static/images/heat.png)

NOTE: This project is written in Python 3, HTML, CSS, and Javascript. It uses sqlite for a database and uses Flask, Sqlalchemy to serve the data to an API for visualization.  The visualization uses D3, Plotly, and Bootstrap. 
After downloading run by executing python app.py at the command line. This will host the page at `http://127.0.0.1:5000/` in your web browser. 
