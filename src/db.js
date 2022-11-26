import mysql from 'mysql';
const dbConnection = mysql.createConnection({
  host     : 'containers-us-west-52.railway.app',
  port: '7662',
  user     : 'root',
  password : '53VwFOwyjQ7bzzAyfKva',
  database : 'railway'
});

const pool  = mysql.createPool({
  host     : 'containers-us-west-52.railway.app',
  port: '7662',
  user     : 'root',
  password : '53VwFOwyjQ7bzzAyfKva',
  database : 'railway'
});

export {
    dbConnection,
    pool
}