# API-CIWeb

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
|   Action                                 | Required          | Method    | URL
| -----------------------------------------|-------------------|-----------|-----------------------------------------------------
|   List all reports                       |                   |  `GET`   | /api/reports
|   Search for a report with a specific ID |                   |  `GET`    | /api/reports/:id
|   Create a new report                    |                   |  `POST`   | /api/reports
|   Update the report with ID              |                   |  `PUT`   | /api/reports/:id
|   Remove report with ID                  |                   |  `DELETE`   | /api/reports/:id

---

## Contributors

* Caio Marcelo Campoy Guedes ([caiomcg](https://github.com/caiomcg)) caiomcg@gmail.com

>Created By **[Caiomcg](http://caimcg.com)** 2017.

---
