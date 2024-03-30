const html = document.querySelector('html')
const btn_foco = document.querySelector('.app__card-button--foco')
const btn_curto = document.querySelector('.app__card-button--curto')
const btn_longo = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const ipt_musica = document.getElementById('alternar-musica')
const btn_play_pause = document.getElementById('start-pause')
const btn_contador = document.querySelector('#start-pause span')
const icn_btn_contador = document.querySelector('.app__card-primary-butto-icon')
const temporizador = document.querySelector('#timer')

const som_play = new Audio('sons/play.wav')
const som_pause = new Audio('sons/pause.mp3')
const som_fim = new Audio('sons/beep.mp3')

let tempoDecorrido = 1500 // valor em segundos
let intervalo = null

const musica = new Audio('sons/luna-rise-part-one.mp3') // cria objeto do tipo audio que carrega o audio das pastas do projeto
musica.loop = true // como esse audio tem um tempo limitado (6 min) e queremos que ele rode o tempo todo, setamos a propriedade interna dele chamada loop para true, fazendo ele repetir sempre que acabar
ipt_musica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
}) // na mudança do input verificamos se a musica esta pausada, se sim da play senao pausa

btn_foco.addEventListener('click', () => {
    tempoDecorrido = 1500 // em segundos
    alteraContexto('foco')
    btn_foco.classList.add('active')
})

btn_curto.addEventListener('click', () => {
    tempoDecorrido = 300 // em segundos
    alteraContexto('descanso-curto')
    btn_curto.classList.add('active')
})

btn_longo.addEventListener('click', () => {
    tempoDecorrido = 900 // em segundos
    alteraContexto('descanso-longo')
    btn_longo.classList.add('active')
})

function alteraContexto(contexo) {
    mostrarTempo()
    
    botoes.forEach((elemento) => {
        elemento.classList.remove('active')
    }) // ao clicar em algum botao, a funcao eh chamada e passa por esse trecho removendo o active de todos os botoes (mesmo que não tenha), entao ao finalizar a execucao da funcao o codigo volta la para o event listener que o chamou, executando a linha seguinte que atribui o active ao botao correspondente

    html.setAttribute('data-contexto', contexo)

    banner.src = `imagens/${contexo}.png`

    switch (contexo) {
        case 'foco':
            titulo.innerHTML = "Otimize sua produtividade,<br><strong class='app__title-strong'>mergulhe no que importa.</strong>"
            break;
        case 'descanso-curto':
            titulo.innerHTML = "Que tal dar uma descansada?,<br><strong class='app__title-strong'>Faça uma pausa curta.</strong>"
            break;
        case 'descanso-longo':
            titulo.innerHTML = "Hora de voltar à superficie,<br><strong class='app__title-strong'>Faça uma pausa longa.</strong>"
            break;
        default:
            break;
    }
}

btn_play_pause.addEventListener('click', iniciarPausar)

function contagemRegressiva() {
    if (tempoDecorrido <= 0) {
        som_fim.play()
        alert('Tempo Finalizado')
        zerar()
        return
    }
    tempoDecorrido -= 1
    mostrarTempo()
}

function iniciarPausar() {
    if (intervalo) {
        som_pause.play()
        zerar()
        return
    }
    som_play.play()
    intervalo = setInterval(contagemRegressiva, 1000)
    btn_contador.innerHTML = 'Pausar'
    icn_btn_contador.src = 'imagens/pause.png'
}

function zerar() {
    clearInterval(intervalo)
    intervalo = null
    btn_contador.innerHTML = 'Começar'
    icn_btn_contador.src = 'imagens/play_arrow.png'
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorrido * 1000) // criamos um tipo date com nosso tempo para podermos formata-lo, como ele so trabalha em milissegundos multiplicamos por 1000
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'}) // usamos essa funcao para formatar os milissegundos que enviamos, indicando q na parte de minutos queremos 2 digitos e segundos tambem
    temporizador.innerHTML = `${tempoFormatado}`
}

mostrarTempo() // chamo a funcao aqui para que o relogio ja fique na tela assim q a pagina carrega