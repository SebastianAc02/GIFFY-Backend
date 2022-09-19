# GIFFY-Backend
Backend API service for GIFFY app BY Sebastian Acosta
The api is a microservice built using express framework and node js

Key Features

<h3>-- Database:</h3>

* Technologies used
- The app uses mongo DB
- It was used mongoose to connect node server with database

* How it was used
- The database stores the users and the gifs they put in favorites.
- The database was modeled to have a relation of one to many -> (one user may have different gifs) 
  and (one gif only contains one user) .


<h3>-- Node API : </h3>
The API will be use by geckogifs app to help storing the data from users including their favorites gifs!.

* Cool features
<h4>-Security: safety first!</h4>
-> Bcrypt was used to encrypt user passwords BEFORE they reach the database. In this way, possible leaks of information are avoided.

-> Json Web Token was implemented in order to give our users the ability to login. Hand in hand with a secret to decrypt the token and access the user's information.

<h4>-Propper code responses: </h4>
-> The server will use the correct code responses in case is a success (201, 200 , etc) or a fail (400, 404, etc)

-> The server also is using adequate error handling midleware which will help get the information on why the request may go wrong.

<h4>-Testing: </h4>
-> The server was tested using jest makes the basic comprobations to check the most used endpoints.







