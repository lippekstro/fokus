const btn_add_tarefa = document.querySelector('.app__button--add-task')
const form_add_tarefa = document.querySelector('.app__form-add-task')
const txt_tarefa = document.querySelector('.app__form-textarea')
const ul_tarefas = document.querySelector('.app__section-task-list')

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

btn_add_tarefa.addEventListener('click', () => {
    form_add_tarefa.classList.toggle('hidden')
})

form_add_tarefa.addEventListener('submit', (evento) => {
    evento.preventDefault()
    const tarefa = {
        descricao: txt_tarefa.value
    }
    tarefas.push(tarefa)
    const elemento_tarefa = criarElementoTarefa(tarefa)
    ul_tarefas.append(elemento_tarefa)
    atualizarTarefas(tarefas)

    txt_tarefa.value = ''
    form_add_tarefa.classList.add('hidden')
})

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.addEventListener('click', () => {
        const nova_descricao = prompt('Qual o novo nome da tarefa?')
        if (nova_descricao) {
            paragrafo.textContent = nova_descricao
            tarefa.descricao = nova_descricao
            atualizarTarefas(tarefas)
        }

    })

    const imgBtn = document.createElement('img')
    imgBtn.setAttribute('src', 'imagens/edit.png')
    botao.append(imgBtn)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    return li
}

tarefas.forEach(tarefa => {
    const elemento_tarefa = criarElementoTarefa(tarefa)
    ul_tarefas.append(elemento_tarefa)
});

function atualizarTarefas(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}