# API-CIWeb

A node.js express API for the Federal University of Paraíba Informatics Center
---

### Requirements ###

* **[MySQL 5.7.18](https://www.mysql.com/)**
* **[Node.js 6.10.2 LTS](http://nodejs.org/en/)**

### Installation ###

**Obs.: The following instructions were tested on Ubuntu distribution.**

1. After 'git clone' command, run the following commands to install dependencies:
  - user@user:~/path_to_cloned_folder$ **npm install**
  - **Manually install the dependencies that may have not been installed by the above command**
2. Start the server and access the browser
  - user@user:~/path_to_cloned_folder$ **npm start**
---

## API Routes ##

### Auth ###
|   Action                                 | Required          | Method    | URL
| -----------------------------------------|-------------------|-----------|-----------------------------------------------------
|   Sign in user (local authentication)    |                   |  `POST`   | /api/auth/login
|   Register or Sign in (facebook oauth)   |                   |  `GET`    | /api/auth/facebook?access_token=:token
|   Get Reset Password                     |                   |  `POST`   | /api/auth/reset_password
|   Set new password after reset password  | Get Reset Pass    |  `POST`   | /api/auth/reset_password/:token

---

## Contributors

* Caio Marcelo Campoy Guedes ([caiomcg](https://github.com/caiomcg)) caiomcg@gmail.com

>Created By **[Caiomcg](http://caimcg.com)** 2017.

---