# Dawpark

**The application can be found [here](https://dawpark.netlify.app/).**

#### Mid course screencast:
* Link to screencast: https://youtu.be/qv_utrADjsA

#### Project Screencast:
* Link to screencast: https://youtu.be/hi4KVOVe5io

#### Individual oral code screencast:
* Link to Thomas's screencast (thoin216): https://youtu.be/iGgCoAQeffc
* Link to Filips's screencast (filkl010): [LÄNK HÄR]

#### Functional specification:
The application is meant to be used as a quality of life "tool/service" that depending on user defined filters and geo-location points out the nearest/cheapest parking space. An example can be:

 - Where is the nearest free parking lot?
 - Where is the nearest parking lot?
 - Where is the nearest truck parking lot with a toilet?

#### Technological specification:

 - The client framework will be [Vue](https://vuejs.org/) together with [TypeScript](https://www.typescriptlang.org/). [Mapbox](https://www.mapbox.com/) will also be used to view and control a map. The application will also be available as a progressive web app (PWA) to simplify use "on the fly".
 - The backend framework will be [Node.js](https://nodejs.org/en/)/[Express.js](https://expressjs.com) along with [Redis](https://redis.io/) for caching and [PostgresQL](https://www.postgresql.org/) as a potential database.

##### Hosts (can still change)
Frontend will be hosted on [Netlify](https://www.netlify.com/)
Backend will be hosted on [DigitalOcean](https://www.digitalocean.com/)

###### Data
All the data to power this application will be acquired from the [Trafikverket API](https://api.trafikinfo.trafikverket.se/API)
