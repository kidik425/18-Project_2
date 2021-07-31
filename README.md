<h1> Project 2: Steve, Andrew, Drew, and Marc </h1>

<h2> Topic: Crime related to marijuana dispensaries in Los Angeles City  </h2>

<h3> Central Question: Does crime correlate with location of legal marijuana dispensaries? </h3>

**Git Hib Page** <br>
https://kidik425.github.io/18-Project_2/static/assets/la_dashboard.html <br>

**Data Sets** <br>
Crime Data Set: https://catalog.data.gov/dataset/crime-data-from-2010-to-2019 <br>
Dispensary Data Set 1: https://cannabis.lacity.org/personal-activity/find-licensed-retailers <br>
Dispensary Data Set 2: https://search.cannabis.ca.gov <br>
Geographic Areas: https://geohub.lacity.org/datasets/lahub::lapd-divisions/about <br>

**ETL: Crime Data** <br>
• Narrowed down to violent crimes; final dataset contains **996,161** incidents of crime with coordinates of where crime occurred <br>
•	Imported as CSV from Los Angeles City <br>
•	Deleted rows missing location coordinates <br>
•	Deleted columns not needed for analysis <br>
•	Deleted rows with crimes clearly domestic in nature, employee theft, moving violations, or clearly non-violent <br>
•	Created new variable for year of occurrence <br>
•	Grouped weapon used, premise of crime, and crime type into smaller categories <br>
•	Exported data into GEOJSON file <br>

**ETL: Dispensary Data** <br>
•	Contains **420** dispensaries located in Los Angeles City <br>
•	Deleted _known_ non-commercial retail facilities (i.e., cultivation locations) <br>
•	Deleted businesses missing location coordinates <br>
•	Manually examined data for locations with matching addresses or coordinates <br>
•	Dispensary data correlates with Choropleth maps to exclude non-Los Angeles City locations <br>

**Statistical Analysis: Crime Data** <br>
•   Identify a measure of center for crime data coordinates using [Geometric Median](https://stackoverflow.com/a/30305181/15231357) method <br>
•   Geometric Median points for each police precinct added to map layer for comparison to Dispensary locations <br>
•   Crime data's measure of center visualizes the geographic skew in the data <br>
•   If dispensaries are a leading variable to crime, then the geographic median of crime would skew toward <br> 
    the location of dispensaries.

**Geographic Area** <br>
•	Los Angeles Police Department (LAPD) 21 different "Community Police Station" areas <br>

**Challenges** <br>
•	Could not find a _single source_ for dispensary location data - all sources had _some_ data, but no central "source of truth"  <br>
•	Contacted California Bureau of Cannabis Control who sent the website that we had already used  <br>

**Future Improvements/Plans** <br>
•	A vetted, 100% accurate source of retail dispensary locations <br>
•	Re-organization of data into Census Tracts so that demographic features can be factored into decision making (see, for example, findings from Sciece Direct: https://www.sciencedirect.com/science/article/pii/S221133552030125X)<br>

**Programs/Libraries Used** <br>
•	Pandas <br>
•	Java Script <br>
•	Leaflet/Mapbox <br>
•	HTML/CSS <br>
•	Plotly <br>
•	GeoPandas <br>
•	GeoJSON <br>
•	Bootstrap <br>

**Findings** <br>
•	There were 751 crimes that occurred at a marijuana business location (including illegal business) - 56% of these crimes were burglaries <br>
•	There were 157,601 crimes that occurred at a non-marijuana business retail stores - 59% of these crimes were theft <br>
•	Wherever goods or services are exchanged for money, the opportunity for burglary, theft, or robbery is present <br>
•	Nothing in these data indicate a unique occurrence of crime, either in type or location, to marijuana businesses <br>
