# Proximity 📍

## Introduction
With so many unknowns about the future of the coronavirus pandemic and our world, it’s hard to determine, with certainty, how safe you really are. This app is a way to understand your potential level of risk based on your behaviors, social contacts, and whereabouts and get back some peace of mind.

Our app is a platform to keep track of your contacts and whereabouts, connect with friends and loved ones to see theirs, and get current estimates of your COVID-19 risk.

Created with React, Redux, Node.js, Express, and Neo4j.

## Installation & Setup
To run this project locally and seed the database

Install Neo4j desktop (https://neo4j.com/download/) and create a new database with the default name of neo4j and password 2007flex.

Add Neo4j APOC library to your database (https://neo4j.com/developer/neo4j-apoc/).

```
npm install
npm run seed
npm run start-dev
```

## Features
Proximity has currently had the following features:
- Log in and out
- Add recent social events and others present with you
- View a map of recent locations (using Mapbox)
- Search for and add friends
- Receive email notifications when someone logs a positive test result within two weeks of being in contact with you
- Visualize the bubble of your direct contacts and people they have contacted
- Automatically generate COVID-19 data for a social event's location
### To-Do
Plans to expand Proximity include:
- Opt in to send email notifications to friends when you log a positive COVID-19 test result
- Expand bubble visualization options

