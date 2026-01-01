# asw-delivery-exam

![CI/CD pipeline](https://github.com/Macedonioz/asw-delivery-exam/actions/workflows/main.yml/badge.svg)
![Version](https://img.shields.io/badge/version-v1.0.0-blue)

Personal project for an ***Automated SW Delivery*** exam.
Goal is to design and implement a multicontainer architecture with a focus on VCS, build automation tools, CI/CD pipelines, and container orchestration.

## Overview
Simple web application that provides a **CRUD** interface for managing a countries database, pre-populated with a [sample dataset](https://github.com/ozlerhakan/mongodb-json-files/tree/master).  
Functionalities are straightforward, as shown below.

![application main](/assets/images/app_main.png)

![application form](/assets/images/app_form.png)

## Installation
### Prerequisites
- Docker engine
- Docker compose v2

### Configuration

Download the .zip file from the [latest release](https://github.com/Macedonioz/asw-delivery-exam/releases/tag/v1.0.0), then cd to the extracted folder and run:

```bash
docker compose up -d
```
Once the images are pulled from GHCR and the containers are running, application will be accessible at *http://localhost*.  
To shutdown services run:
```bash
docker compose down
```

### Build from source
You can also try the application by cloning the repository and building the images locally:

```bash
git clone git@github.com:Macedonioz/asw-delivery-exam
cd asw-delivery-exam
docker compose up --build -d
```