# API-CIWeb

[![Build Status](https://travis-ci.org/caiomcg/API-CIWeb.svg?branch=master)](https://travis-ci.org/caiomcg/API-CIWeb)
[![Code Climate](https://codeclimate.com/github/caiomcg/API-CIWeb/badges/gpa.svg)](https://codeclimate.com/github/caiomcg/API-CIWeb)
[![Issue Count](https://codeclimate.com/github/caiomcg/API-CIWeb/badges/issue_count.svg)](https://codeclimate.com/github/caiomcg/API-CIWeb)

### A node.js express API for the Federal University of Paraíba Informatics Center

---

### Requirements ###

* **[MySQL 5.7.18](https://www.mysql.com/)**
* **[Node.js 6.10.2 LTS](http://nodejs.org/en/)**

### Installation ###

**Obs.: The following instructions were tested on Ubuntu 16.04.2 LTS**

1. After 'git clone' command, run the following commands to install dependencies:
  - user@user:~/path_to_cloned_folder$ **npm install**
  - **Manually install the dependencies that may have not been installed by the above command**
2. Start the server and access the browser
  - user@user:~/path_to_cloned_folder$ **npm start**
---

## API Routes ##

### Reports ###
|   Action                                  | Required          | Method    | URL
| ------------------------------------------|-------------------|-----------|-----------------------------------------------------
|   List all reports                        |                   |  `GET`   | /api/reports
|   Search for a report with a specific ID  |                   |  `GET`    | /api/reports/:id
|   Create a new report                     |                   |  `POST`   | /api/reports
|   Update the report with ID               |                   |  `PUT`   | /api/reports/:id
|   Remove report with ID                   |                   |  `DELETE`   | /api/reports/:id

### Reserves ###
|   Action                                  | Required          | Method    | URL
| ------------------------------------------|-------------------|-----------|-----------------------------------------------------
|   List all reserves(can filter by room ID)|                   |  `GET`    | /api/reserves?room=ROOM_ID
|   Search for a reserve with a specific ID |                   |  `GET`    | /api/reserves/:id
|   Create a new reserve                    |                   |  `POST`   | /api/reserves
|   Update the reserve with ID              |                   |  `PUT`    | /api/reserves/:id
|   Remove reserve with ID                  |                   |  `DELETE` | /api/reserves/:id

### Rooms ###
|   Action                                  | Required          | Method    | URL
| ------------------------------------------|-------------------|-----------|-----------------------------------------------------
|   List all rooms                          |                   |  `GET`   | /api/rooms
|   Search for a room with a specific ID    |                   |  `GET`    | /api/rooms/:id
|   Create a new room                       |                   |  `POST`   | /api/rooms
|   Update the room with ID                 |                   |  `PUT`   | /api/rooms/:id
|   Remove room with ID                     |                   |  `DELETE`   | /api/rooms/:id

---

## Contributors

* Caio Marcelo Campoy Guedes ([caiomcg](https://github.com/caiomcg)) caiomcg@gmail.com

>Created By **[Caiomcg](http://caimcg.com)** 2017.

---
