const audio = new Audio('click.mp3');
let nameUser = '';

//PEGA EVENTOS DO TECLADO
const inputs = document.querySelectorAll('.grid-item');
inputs.forEach((input) => {
  input.addEventListener('keypress', (event) => {

    if (event.key !== 'Enter' && !/[\d()+\-*/c\r.]/i.test(event.key)) {
        event.preventDefault();
        return;
    }

    audio.currentTime = 0;
    audio.play();

    if(event.key !== 'Enter'){
        addToDisplay(event.key);
    }
    if (event.key === 'Enter') {
      calculate();
    }
    if(event.key.toUpperCase() == 'C'){
        clearDisplay();
    }
  });
});


//LIMPAR NO DO USUÁRIO
function toClean() {
    audio.currentTime = 0;
    audio.play();

    document.getElementById('name').value = '';
}

//CADASTRA NOME DO USUÁRIO
function save() {
    audio.currentTime = 0;
    audio.play();

    nameUser = document.getElementById('name').value;
    if(nameUser !== ''){
        document.querySelector('.containerReturn').style.display = 'none';
        document.getElementById('display').value = '';
        document.querySelector('.containerRegister').style.display = 'none';
        document.querySelector('.container').style.display = 'flex';
        document.querySelector('.containerUser').style.display = 'flex';
        document.querySelector('.containerNewRegister').style.display = 'flex'; 
        document.querySelector('.user').innerHTML = nameUser; 
        
        // PEGA O ELEMENTO DE ENTRADA DE TEXTO E ADICIONA O FOCO
        const inputDisplay = document.querySelector('.btnClean');
        inputDisplay.focus();
        
    }else{
        window.alert('O campo nameUser não pode ser vazio!');

    }
}

//REALIZA NOVO REGISTRO
function record() {
    audio.currentTime = 0;
    audio.play();

    nameUser = '';
    document.getElementById('name').value = '';

    document.querySelector('.containerRegister').style.display = 'flex';
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.containerUser').style.display = 'none';
    document.querySelector('.containerNewRegister').style.display = 'none';
    document.getElementById('table_history').style.display = 'none';
    document.querySelector('.user').innerHTML = ''; 
}

//MOSTRA OS DADOS DIGITADOS NO DISPLAY E ARMAZENA OS DADOS
function addToDisplay(value) {
    audio.currentTime = 0;
    audio.play();

    document.getElementById('display').value += value;
}

//LIMPA A TELA DO DISPLAY
function clearDisplay() {
    audio.currentTime = 0;
    audio.play();

    document.getElementById('display').value = '';
}

//RECEBE OS DADOS DO DISPLAY E ENVIA PARA API REALIZAR OS CÁLCULOS
function calculate() {
    audio.currentTime = 0;
    audio.play();

    var expression = document.getElementById('display').value;
    if(expression == ''){
        document.getElementById('display').value = '';
        return;
    }

    axios.post('http://localhost:3000/calculate', { value: expression, name: nameUser }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        document.getElementById('display').value = response.data.result;
    }).catch(error => {
        document.getElementById('display').value = error.response.data.result;
    });

}

//VISUALIZAR O HISTÓRICO
function viewHistory(){
    audio.currentTime = 0;
    audio.play();

    axios.get('http://localhost:3000/select', {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if(response.data.length > 0){
            const tableHtml = `
                <table>
                    <tr>
                    <th>Nome</th>
                    <th>Operação</th>
                    <th>Resultado</th>
                    <th>Data</th>
                    </tr>
                    ${response.data.map(result => `
                    <tr>
                        <td>${result.name}</td>
                        <td>${result.operation}</td>
                        <td>${result.result}</td>
                        <td>${result.date}</td>
                    </tr>
                    `).join('')}
                </table>
                `;

        const tabelaHistoricoDiv = document.getElementById('table_history');
        tabelaHistoricoDiv.style.display = 'flex';

        tabelaHistoricoDiv.innerHTML = tableHtml;


        document.querySelector('.container').style.display = 'none';
        document.querySelector('.containerUser').style.display = 'none';
        document.querySelector('.containerNewRegister').style.display = 'none';
        document.querySelector('.containerReturn').style.display = 'flex';
        }else{
            const tabelaHistoricoDiv = document.getElementById('table_history');
            tabelaHistoricoDiv.style.display = 'flex';

            tabelaHistoricoDiv.innerHTML = 'NENHUM REGISTRO ENCONTRADO';
        }
    }).catch(error => {
        console.error(error);
    });
}

//RETORNAR A CALCULADORA
function viewReturn() {
    audio.currentTime = 0;
    audio.play();

    const tabelaHistoricoDiv = document.getElementById('table_history');
    tabelaHistoricoDiv.style.display = 'none';

    document.querySelector('.container').style.display = 'flex';
    document.querySelector('.containerUser').style.display = 'flex';
    document.querySelector('.containerNewRegister').style.display = 'flex';
    document.querySelector('.containerReturn').style.display = 'none';
}



