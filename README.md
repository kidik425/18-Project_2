<h1> Project2: Steve, Andrew, Drew, and Marc </h1>

<h2> Topic: Crime related to marijuana dispensaries in Los Angeles City  </h2>

<h2> Central Question: Does crime correlate with location of legal marijuana dispensaries? </h2>

**Data Sets** <br>
Crime Data Set: https://catalog.data.gov/dataset/crime-data-from-2010-to-2019 <br>
Dispensary Data Set 1: https://cannabis.lacity.org/personal-activity/find-licensed-retailers <br>
Dispensary Data Set 2: https://search.cannabis.ca.gov <br>
Geographic Areas: https://geohub.lacity.org/datasets/lahub::lapd-divisions/about <br>

**ETL: Crime Data** <br>
• Contains 1,176,531 incidents of crime <br>
•	Imported as CSV from Los Angeles City <br>
•	Stripped out rows missing location coordinates <br>
•	Deleted columns not needed for analysis <br>
•	Deleted rows with crimes clearly domestic in nature, related to employee theft, moving violations, or clearly non-violent <br>
•	Created new variable for year of occurrence <br>
•	Grouped weapon used data into smaller categories <br>
•	Grouped premise type data into smaller categories <br>
•	Grouped crime type data into smaller categories <br>
•	Exported data into JSON files <br>

**ETL: Dispensary Data** <br>
•	Contains 420 dispensaries located in Los Angeles City <br>
•	Deleted known non-commercial retail facilities (i.e., cultivation locations) <br>
•	Stripped out businesses missing location coordinates <br>
•	Manually examined data for locations with matching addresses or coordinates <br>
•	Dispensary data correlates with Choropleth maps to exclude non-Los Angeles City locations <br>

**Geographic Area** <br>
•	Geographic areas are Los Angeles Police Deparment (LAPD) "Community Police Station" area: the LAPD has 21 Community Police Station areas <br>

**Challenges** <br>
•	Could not find a solid single source for dispensary location data - all sources had some data, but no central "source of truth"  <br>
•	Contacted CA Bureau of Cannabis Control who sent a website that we had already used  <br>

**Future Improvements/Plans** <br>
•	A vetted, 100% accurate source of retail dispensary locations <br>



