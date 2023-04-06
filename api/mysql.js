const mysql = require('mysql');

//CRIAÇÃO DO BANCO
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'teste',
  password : 'teste',
  database : 'calculator'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados!');
});

const db = {};
db.connection = connection;

module.exports = db;