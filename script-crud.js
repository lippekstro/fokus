const btn_add_tarefa = document.querySelector('.app__button--add-task')
const form_add_tarefa = document.querySelector('.app__form-add-task')
const txt_tarefa = document.querySelector('.app__form-textarea')
const ul_tarefas = document.querySelector('.app__section-task-list')
const p_descricao_tarefa = document.querySelector('.app__section-active-task-description')
const btn_remover_concluidas = document.querySelector('#btn-remover-concluidas')
const btn_remover_tudo = document.querySelector('#btn-remover-todas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let li_tarefaSelecionada = null

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

    if (tarefa.completa) {
        li_tarefaSelecionada.classList.add('app__section-task-list-item-complete')
        botao.setAttribute('disabled', 'disabled')
    } else {
        li.addEventListener('click', () => {
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                })
            if (tarefaSelecionada == tarefa) {
                paragrafo.textContent = ''
                tarefaSelecionada = null
                li_tarefaSelecionada = null
                return
            }
            tarefaSelecionada = tarefa
            li_tarefaSelecionada = li
            p_descricao_tarefa.textContent = tarefa.descricao

            li.classList.add('app__section-task-list-item-active')
        })
    }



    return li
}

tarefas.forEach(tarefa => {
    const elemento_tarefa = criarElementoTarefa(tarefa)
    ul_tarefas.append(elemento_tarefa)
});

function atualizarTarefas(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && li_tarefaSelecionada) {
        li_tarefaSelecionada.classList.remove('app__section-task-list-item-active')
        li_tarefaSelecionada.classList.add('app__section-task-list-item-complete')
        li_tarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
        tarefaSelecionada.completa = true
    }
})

const removerTarefas = (somenteCompletas) => {
    const seletor = somenteCompletas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item'
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove()
    })
    tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    atualizarTarefas()
}

btn_remover_concluidas.onclick = () => removerTarefas(true)
btn_remover_tudo.onclick = () => removerTarefas(false)