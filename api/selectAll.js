//SELECIONA TODOS OS REGISTROS DO BANCO HISTORY
const selectAll = (req, res, db) => {
    return new Promise((resolve, reject) => {
      db.connection.query('SELECT name, operation, result, DATE_FORMAT(date, "%d/%m/%Y %H:%i") AS date FROM history', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    })
      .then(results => {
        console.log(`Registros selecionados com sucesso!`);
        res.json(results);
      })
      .catch(err => {
        console.error(`Erro ao selecionar registros: ${err}`);
        res.status(500).send('Erro ao selecionar registros');
      });
  };
  
  module.exports = selectAll;
  