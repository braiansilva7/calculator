//REALIZA OS CÁLCULOS E CADASTRA NO BANCO AS OPERAÇÕES REALIZADAS
const calc = (req, res, db) => {
    const value = req.body.value;
    let result;
  
    try {
      result = eval(value);
    } catch (err) {
      result = null;
    }
  
    if (result !== null && !isNaN(result)) {
      const date = new Date(); // cria um objeto Date com a data e hora atuais
      const dateFormat = date.toISOString().slice(0, 19).replace('T', ' '); // formata a data para o formato esperado pelo MySQL/MariaDB

      db.connection.query('INSERT INTO history (name, operation, result, date) VALUES (?, ?, ?, ?)', [`${req.body.name}`, `${req.body.value}`, `${Number(result.toFixed(10))}`, `${dateFormat}`], (err, result) => {
        if (err) throw err;
      
        console.log(`Registro inserido com sucesso!`);
      });
      
      res.json({ result: Number(result.toFixed(10)) });
    } else {
      res.status(400).json({ result: 'Operação inválida.' });
    }
};

module.exports = calc;