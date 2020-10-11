"use strict"

let hh = 0;
let mm = 0;
let ss= 0;
let segundosTotales = 0;

let hhI = 0;
let mmI = 0;
let ssI = 0;

let inter = [];
let tempo = 1000;
let cron;
let activo = 0;
let countInter = -1;
let textoIntervalos = ``;
let tiempoAcumSeg = 0;
let tiempoAcumMin = 0;
let tiempoAcumHor = 0;
let segundosUltimoIntervalo;
let minutosUltimoIntervalo;
let horasUltimoIntervalo;


function comenzar(){
    if(activo == 0){
    cron = setInterval(() => {timer();}, tempo);
    activo++;
    }
}
function pausa(){
    if(tiempoAcumHor != hh || tiempoAcumMin != mm || tiempoAcumSeg != ss){
    clearInterval(cron);
    tiempoAcumulado();
    tiempoAcumuladoTotal();
    document.getElementById('intervalos').innerText = textoIntervalos;
    textoIntervalos = "";
    activo = 0;
}
}

function parar(){
    clearInterval(cron);
    hh = 0;
    mm = 0;
    ss = 0;
    hhI = 0;
    mmI = 0;
    ssI = 0;
    segundosTotales = 0;
    segundosUltimoIntervalo = 0;
    minutosUltimoIntervalo = 0;
    horasUltimoIntervalo = 0;
    tiempoAcumSeg = 0;
    tiempoAcumMin = 0;
    tiempoAcumHor = 0;
    document.getElementById('counter').innerText = '00:00:00'
    document.getElementById('intervalos').innerText="";
    inter = [];
    activo = 0;
    
}

function tiempoAcumulado(){
    inter.unshift([`Intervalo ${inter.length + 1}:`, `${(hh < 10 ? '0' + hh : hh)}`, `${(mm < 10 ? '0' + mm : mm)}`,`${(ss < 10 ? '0' + ss : ss)}`]);

function tiempoIntervalo(){
    
        if(inter.length > 1){
        segundosUltimoIntervalo = segundosTotales - ((Number(inter[1][1]) * 3600) + (Number(inter[1][2]) * 60) + Number(inter[1][3]));
        minutosUltimoIntervalo = Math.trunc(segundosUltimoIntervalo / 60);
        horasUltimoIntervalo = Math.trunc(segundosUltimoIntervalo / 3600);
        hhI = horasUltimoIntervalo;
        mmI = minutosUltimoIntervalo - (hhI * 60);
        ssI = segundosUltimoIntervalo - (mmI * 60) - (hhI * 3600);
            
        inter[0].push(`${hhI < 10 ? '0' + hhI : hhI}:${mmI < 10 ? '0' + mmI : mmI}:${ssI < 10 ? '0' + ssI : ssI}`);
    }else{
        inter[0].push(`${hh < 10 ? '0' + hh : hh}:${(mm < 10 ? '0' + mm : mm)}:${(ss < 10 ? '0' + ss : ss)}`)
    }
}

function añadirTextoInter(){
    for(let i = 0; i < inter.length; i++){
      textoIntervalos += `${inter[i][0]} ${inter[i][4]} \n`;
    }
}
    tiempoIntervalo();
    añadirTextoInter();
}

function tiempoAcumuladoTotal(){
    tiempoAcumSeg += Number(inter[0][4].slice(6,8));
    tiempoAcumMin += Number(inter[0][4].slice(3,5));
    tiempoAcumHor += Number(inter[0][4].slice(0,2));
}

function timer(){
    ss++;
    segundosTotales ++;
    if(ss == 60){
        ss = 0;
        mm++;
            if(mm == 60){
                hh++;
                mm = 0;
    }
    };
    
    let format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
    document.getElementById('counter').innerText = format;
}

function temaDark(){
    if(document.getElementById("light")){
        document.getElementById("light").id= "dark";
        document.getElementById("buttonDark").value="Light Mode";
        document.getElementById("buttonDark").id = "buttonLight";
    }else{
    document.getElementById("dark").id= "light"; 
    document.getElementById("buttonLight").value="Dark Mode";
    document.getElementById("buttonLight").id= "buttonDark"
        
    }
}