# How to get started

1. Clone the repository
2. Open cloned directory in terminal
4. Navigate to server directory using `cd server`
3. Run `npm install` to install all serverpackages
5. Start the server using `npm start`
6. Navigate to client directory using `cd ../client`
7. Run `npm install` to install all client packages 
8. Start the client using `npm start`
9. Client will start at `http://localhost:3000`. Open this address in the browser to view it.

## Import the schema
If you want to import the current version of the Moseeqi schema:

1. Open MySQL Workbench
2. Create a schema named `moseeqi`
3. Go to `Server > Data Import`
4. Choose the `Import from Self-Contained File` option
5. Browse to this project directory and select `moseeqi.sql` under `server/schema` 
6. Click `Start Import`

## Automatic server restart
If you want the Node server to restart automatically after every save: 

1. Install nodemon using `npm install -g nodemon`
2. Instead of `npm start`, use `nodemon index.js`
