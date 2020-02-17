//Funcion para cambiar el color a un agente
let idAgente = 0;
let idMeta = 0;
let ag = 0;
let me = 0;
let tx = 0;
let ty = 0;
var rgb = 160;
var rgbant =160;
var avaluo=0;
var value = true;
var time = 3000;
var px =0;
var py =0;
var matriz2 = [];


function changeAgente(x) {
    var pared = document.getElementById("pared").checked;
    var agente = document.getElementById("agente").checked;
    var meta = document.getElementById("meta").checked;
    tx = parseInt(document.querySelector(".tx").textContent);
    ty = parseInt(document.querySelector(".ty").textContent);
    console.log(tx)
    console.log(px)
    px = parseInt(x.id.split(",")[1]);
    py = parseInt(x.id.split(",")[0]);
    

    if(localStorage.getItem('matriz') == undefined){
        
        for(var x1=0; x1< tx; x1++){
            matriz2[x1]= new Array(ty);
        }
        
        for(var x1=0; x1< tx; x1++){
            for(var y=0; y< ty; y++){
                matriz2[x1][y]=0 ;
            }
        }
        
        console.log(matriz2)
        localStorage.setItem('matriz',1)
    }   

    if (pared) {
        //Pared es de color roja
        if (x.style.background == "rgb(255, 0, 0) none repeat scroll 0% 0%") {
            console.log("pared de color roja a gris")
            matriz2[px][py] =0;
            console.log(matriz2)
            x.style.background = "rgb(209, 209, 209)";
        } else {
            console.log("pared de color gris a roja")
            x.style.background = "rgb(255, 0, 0)";
            matriz2[px][py] =99;
            console.log(matriz2)
        }

    } else if (agente) {
        //Agente es de color azul
        //Verifico que no se haya agregado un agente
        if (ag == 0) {
            //Verifico si esa posicion ya tiene un agente para ver si lo quer quitar
            //Si no tiene pone el agente y alamaceno el id
            x.style.background = "rgb(0, 153, 255)";
            idAgente = x.id;
            
            ag = 1;
        } else if (x.style.background == "rgb(0, 153, 255) none repeat scroll 0% 0%") {
            x.style.background = "rgb(209, 209, 209)";
            idAgente = 0;
            ag = 0;

        } else {
            alert("Ya se colocó un agente en la posicion:" + idAgente)
        }

    } else if (meta) {
        //Meta es de color verde
        if (me == 0) {
            x.style.background = "rgb(115, 255, 0)";
            idMeta = x.id;
            me = 1;
            matriz2[px][py] =98;
        } else if (x.style.background == "rgb(115, 255, 0) none repeat scroll 0% 0%") {
            x.style.background = "rgb(209, 209, 209)"
            idMeta = 0;
            matriz2[px][py] =0;
            me = 0;
        } else {
            alert("Ya se colocó una meta en la posicion: " + idMeta)
        }
    }
}


function mover(){
    
    iniciar();
}

function iniciar(){
    var x = parseInt(idAgente.split(",")[0]);
    var y = parseInt(idAgente.split(",")[1]);
    console.log("si entra2")
    
    //Moverse la matriz esta al reves [y][x]
    if(idAgente == ((tx-1)+","+(ty-1))){
        console.log("si entra")
        if((matriz2[x-1][y]) < (matriz2[x][y-1])){
            MoverArriba(x,y);
        }else if((matriz2[x-1][y]) == (matriz2[x][y-1])){
            MoverArriba(x,y);
        }else{
            MoverIzquierda();
        }
    }
    
   
    
}

function MoverArriba(x,y){
    //Moverser
    document.getElementById((x) + "," + (y-1)).style.backgroundColor = "rgb(0, 153, 255)"
    //Vuelvo color gris la anterior
    document.getElementById(x + "," + y).style.backgroundColor = "rgb(" + rgb + "," + rgb + "," + rgb + ")"
    idAgente = (x) + "," + (y-1) 
    console.log("mueve")
    matriz2[x][y]+=1;
    console.log(matriz2)
}

function MoverIzquierda(x,y){
    //Moverser
    document.getElementById((x-1) + "," + (y)).style.backgroundColor = "rgb(0, 153, 255)"
    //Vuelvo color gris la anterior
    document.getElementById(x + "," + y).style.backgroundColor = "rgb(" + rgb + "," + rgb + "," + rgb + ")"
    idAgente = (y-1) + "," + (x) 
    console.log("mueve")
    matriz2[x][y]+=1;
    console.log(matriz2)
}


