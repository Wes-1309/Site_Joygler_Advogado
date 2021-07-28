//MENU

window.onscroll=function(){rolagem()};

function rolagem(){
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop >80){
        document.querySelector("#header").style.height="8vh";
        document.querySelector("#header").style.backgroundColor="#222";
        document.getElementsByTagName("a")[0].style.fontSize="0.9rem";
        document.getElementsByTagName("a")[1].style.fontSize="0.9rem";
        document.getElementsByTagName("a")[2].style.fontSize="0.9rem";
        document.getElementsByTagName("a")[3].style.fontSize="0.9rem";
        document.getElementsByTagName("a")[4].style.fontSize="0.9rem";
        document.getElementsByTagName("a")[5].style.fontSize="0.9rem";
        document.getElementsByTagName("a")[6].style.fontSize="0.9rem";
        document.getElementsByTagName("img")[0].style.height="5vh";
        document.querySelector(".menu-items").style.marginTop = "1.5%"
        document.querySelector(".image").style.marginLeft = "15%"
        document.querySelector(".image").style.marginTop = "0.8%"

    }else{
        document.querySelector("#header").style.height="12vh";
        document.querySelector("#header").style.backgroundColor="transparent";
        document.getElementsByTagName("a")[0].style.fontSize="1.2rem";
        document.getElementsByTagName("a")[1].style.fontSize="1.2rem";
        document.getElementsByTagName("a")[2].style.fontSize="1.2rem";
        document.getElementsByTagName("a")[3].style.fontSize="1.2rem";
        document.getElementsByTagName("a")[4].style.fontSize="1.2rem";
        document.getElementsByTagName("a")[5].style.fontSize="1.2rem";
        document.getElementsByTagName("a")[6].style.fontSize="1.2rem";
        document.getElementsByTagName("img")[0].style.height="9vh";
        document.querySelector(".menu-items").style.marginTop = "2.5%"
        document.querySelector(".image").style.marginLeft = "12%"
        document.querySelector(".image").style.marginTop = "0.5%"
    }
}

//SLIDER

let totalSlides = document.querySelectorAll('.slider--item').length;
let currentSlide = 0;

document.querySelector('.slider--width').style.width = `calc(100vw * ${totalSlides})`;
document.querySelector('.slider--control').style.height = `${document.querySelector('.slider').clientHeight}px`;

function goPrev(){

    currentSlide--;
    if(currentSlide < 0){
        currentSlide = totalSlides - 1;
    }
    updateMargin();
}

function goNext(){
    currentSlide++;
    if(currentSlide > (totalSlides - 1)){
        currentSlide = 0;
    }
    updateMargin();
}

function updateMargin(){
    let sliderItemWidth = document.querySelector('.slider--item').clientWidth;
    let newMargin = (currentSlide * sliderItemWidth);
    document.querySelector('.slider--width').style.marginLeft = `-${newMargin}px`;

}

setInterval(goNext, 5000);



//Animação da especialização no banner

const TypeWriter = function(txtElement, words, wait = 1000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

//Tipo do métodos
TypeWriter.prototype.type = function(){
    //Atual index das palavras
    const current = this.wordIndex % this.words.length;
    //Pegar o texto cheio da palavra atual
    const fullTxt = this.words[current];

    //Verifica se está deletado
    if(this.isDeleting){
        //Remove os caracteres
        this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
        // Adiciona os caracteres
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    // Inserir txt dentro do elemente
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Velocidade inicial
    let typeSpeed = 150;

    if(this.isDeleting){
        typeSpeed /= 2;
    }

    //Se a palavara está completa
    if(!this.isDeleting && this.txt === fullTxt){
        //Efetua uma pausa no final
        typeSpeed = this.wait;
        //Set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        //Move para outra palavra
        this.wordIndex++;
        //Pause antes de iniciar a digitação
        typeSpeed = 200;
    }

    setTimeout(()=> this.type(), typeSpeed)
}

// Inicia On DOm load
document.addEventListener('DOMContentLoaded', init);
//Inicia a digitação
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    
    //Inicia TypeWriter
    new TypeWriter(txtElement, words, wait);
}

// SLIDER CLIENTES


//VARIÁVEIS

let thumbnails = document.getElementsByClassName("thumbnail");
let slider2 = document.getElementById("slider2");
let buttonRight = document.getElementById("slide-right");
let buttonLeft = document.getElementById("slide-left");

//Eventos

buttonLeft.addEventListener('click', () => { //Esse evento faz com que o slider volte 125px para a esquerda
    slider2.scrollLeft -= 125;
})

buttonRight.addEventListener('click', () => { //Esse evento faz com que o slider volter 125 px para a direita
    slider2.scrollLeft +=125;
})

//Evento para calcular o tamnho do slider versus o tamanho do container
const maxScrollLeft = slider2.scrollWidth - slider2.clientWidth;

function autoPlay(){
    if(slider2.scrollLeft > (maxScrollLeft - 1)){
        slider2.scrollLeft -= maxScrollLeft;
    }else{
        slider2.scrollLeft += 1;
    }
}

let play = setInterval(autoPlay, 100);

//PAUSE O SLIDE NO HOVER

for (let i=0; i < thumbnails.length; i++){
    thumbnails[i].addEventListener('mouseover', () => {
        clearInterval(play);
    })
    thumbnails[i].addEventListener('mouseout', () => {
        return play = setInterval(autoPlay, 100);
    })
}