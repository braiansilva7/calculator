const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const db = require('./mysql');
const calc = require('./calc');
const selectAll = require('./selectAll');

app.use(cors());
app.use(bodyParser.json());

//ROTA PARA REALIZAR OS CÁLCULOS
app.post('/calculate', (req, res) => {
   calc(req, res, db);
});

//ROTA PARA SELECIONAR OS REGISTROS NO BANCO
app.get('/select', (req, res) => {
  selectAll(req, res, db);
});

app.listen(3000, () => {
  console.log('API conectada com sucesso!');
});
