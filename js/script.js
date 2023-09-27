const button = document.querySelector('.button-add-task')
const input = document.querySelector('.form-control-lg')
const descricao = document.querySelector('.form-control')
const categoria = document.querySelector('.form-select')
const prioridade = document.querySelector('.form-check-input')
const card = document.querySelectorAll('.card')
const listaCompleta = document.querySelector('.list-task')

const editCard = document.querySelector('.edit-card');
const editForm = document.getElementById('edit-form');
const editTarefa = document.getElementById('edit-tarefa');
const editDescricao = document.getElementById('edit-descricao');
const editCategoria = document.getElementById('edit-categoria');
const editPrioridade = document.getElementById('edit-prioridade');
let editingIndex = -1; // Índice da tarefa sendo editada

let minhaLista = []
function AddTarefa() {
    if (!input.value){
        alert('É obrigatório que o campo nome seja preenchido')
    } 
    
    // Preenche o card com os dados inseridos no formulário
    else if(input.value){
    minhaLista.push({
        tarefa: input.value,
        texto: descricao.value,
        categoria: categoria.value,
        urgencia: prioridade.checked,
        conclude: false
    })
}
    console.log(minhaLista)
    input.value = ''
    descricao.value = ''
    categoria.value = ''
    prioridade.checked = false
    MostrarTarefa()
}

// Função para exibir os cards de task
function MostrarTarefa() {
    let novaLiPendentes = ''
    let novaLiConcluidas = ''

    minhaLista.forEach((item, index) => {
        const cardId = `task-card-${index}`
        console.log(cardId) 
        const listItem = `
        
        
        <div id="${cardId}" class="card ${item.urgencia ? "border-danger" : "border-dark"}">
        <div class="card-header">${item.categoria}</div>
        <div class="card-body" >
            <h2 class="card-title">${item.tarefa}</h2>
            <h4 class="card-text text-end text-danger">${item.urgencia ? "Urgente" : ""}</h4>
            <p class="card-text">${item.texto}</p>
            <p class="card-text text-end">Id:${cardId}</p>
        <button class="btn btn-outline-success" onclick="Concluir(${index})">Concluir</button>
        <button class="btn btn-outline-danger" onclick="Deletar(${index})">Deletar</button>
        <button class="btn btn-primary" onclick="Editar(${index})">Editar</button>
        </div>
      </div>


        `
        // Separa as task concluídas das pendentes
        if (item.conclude) {
            novaLiConcluidas += listItem
          } else {
            novaLiPendentes += listItem
          }
    })

    

    listaCompleta.innerHTML = novaLiPendentes
    const listaConcluidas = document.querySelector('.list-task-completed')
    listaConcluidas.innerHTML = novaLiConcluidas

// Guarda as informações no local storage
    localStorage.setItem('lista', JSON.stringify(minhaLista))
}


  

function Concluir(index) {
    minhaLista[index].conclude = !minhaLista[index].conclude
    MostrarTarefa()
}

function Deletar(index) {
    minhaLista.splice(index, 1)
    console.log(index)
    MostrarTarefa()
}

  // Função para exibir o formulário de edição
function Editar(index) {
    editingIndex = index;
    const task = minhaLista[index];
  
    // Preencha o formulário de edição com os detalhes da tarefa
    editTarefa.value = task.tarefa;
    editDescricao.value = task.texto;
    editCategoria.value = task.categoria;
    editPrioridade.checked = task.urgencia;
  
    document.querySelector('.container').style.display = 'none';
    // Exiba o formulário de edição e oculte o card original
    editCard.style.display = 'block';

  }
  
  // Evento de envio do formulário de edição
  editForm.addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Atualize os detalhes da tarefa com os valores do formulário de edição
    minhaLista[editingIndex].tarefa = editTarefa.value
    minhaLista[editingIndex].texto = editDescricao.value
    minhaLista[editingIndex].categoria = editCategoria.value
    minhaLista[editingIndex].urgencia = editPrioridade.checked
  
    // Limpe o formulário de edição
    editTarefa.value = ''
    editDescricao.value = ''
    editCategoria.value = ''
    editPrioridade.checked = false
  
    // Oculte o formulário de edição e mostre o card original
    editCard.style.display = 'none'
    document.querySelector('.container').style.display = 'block'
  
    MostrarTarefa()
  });
  
  // Adicione eventos de clique aos botões "Editar" dos cards
  const editButtons = document.querySelectorAll('.btn-primary');
  editButtons.forEach((button, index) => {
    button.addEventListener('click', () => Editar(index));
  });


// Função para exibir os itens salvos no local storage ao recarregar á página
function Recarregar() {
    const taskLocalStorage = localStorage.getItem('lista')

    if (taskLocalStorage) {
        minhaLista = JSON.parse(taskLocalStorage)
    }

    MostrarTarefa()

}


// Altera o status de prioridade do card
prioridade.addEventListener('change', function () {
    MostrarTarefa();
});

// Adicione eventos de clique aos botão adicionar do formulário
button.addEventListener('click', AddTarefa)

Recarregar()
