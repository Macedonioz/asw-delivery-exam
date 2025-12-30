#!/bin/bash
mongoimport --db countriesDB --collection countries --file /docker-entrypoint-initdb.d/countriesData.json --jsonArray