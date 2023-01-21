let musicas = [
    {titulo: 'Guitar Solo', artista: 'João Tinti', src:'music/The Gentlemen-DivKid.mp3', img:'images/Rock.jpg'},
    {titulo: 'Eletronic', artista: 'Pedro Santos', src:'music/Will 2 Pwr-half.cool.mp3', img:'images/Eletronica.jpg'},
    {titulo: 'Jazz & Blues', artista: 'André Fellipe', src:'music/Sweet Relief-Zachariah Hickman.mp3', img:'images/Jazz.png'}
];

let musica = document.querySelector('audio');
let indexMúsica = 0;

let duraçãoMúsica = document.querySelector('.fim');

duraçãoMúsica.textContent = segundosParaMinutos(Math.floor(musica.duration));

let imagem = document.querySelector('img');
let nomeMúsica = document.querySelector('.descrição h2');
let nomeArtista = document.querySelector('.descrição i');

renderizarMusica(indexMúsica);

// Eventos
document.querySelector('.botão-play').addEventListener('click', tocarMúsica);

document.querySelector('.botão-pause').addEventListener('click', pausarMúsica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMúsica--;
    if(indexMúsica < 0){
        indexMúsica = 2;
    }
    renderizarMusica(indexMúsica);
});
document.querySelector('.próxima').addEventListener('click', () => {
    indexMúsica++;
    if(indexMúsica > 2){
        indexMúsica = 0;
    }
    renderizarMusica(indexMúsica);
});

// Funções
function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMúsica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duraçãoMúsica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });

}

function tocarMúsica () {
    musica.play();
    document.querySelector('.botão-pause').style.display = 'block';
    document.querySelector('.botão-play').style.display = 'none';
}

function pausarMúsica () {
    musica.pause();
    document.querySelector('.botão-pause').style.display = 'none';
    document.querySelector('.botão-play').style.display = 'block';
}

function atualizarBarra () {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos (segundos) {
    let campoMinuto = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if(campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }
    return campoMinuto+':'+campoSegundos;
}