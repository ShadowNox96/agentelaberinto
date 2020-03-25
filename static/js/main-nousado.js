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
var time = 0;
var time2=500;
let eje;

function changeAgente(x) {
    var pared = document.getElementById("pared").checked;
    var agente = document.getElementById("agente").checked;
    var meta = document.getElementById("meta").checked;
    tx = parseInt(document.querySelector(".tx").textContent);
    ty = parseInt(document.querySelector(".ty").textContent);
    if (pared) {
        //Pared es de color roja
        if (x.style.background == "rgb(255, 0, 0) none repeat scroll 0% 0%") {
            console.log("pared de color roja a gris")
            x.style.background = "rgb(209, 209, 209)";
        } else {
            console.log("pared de color gris a roja")
            x.style.background = "rgb(255, 0, 0)";
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
        } else if (x.style.background == "rgb(115, 255, 0) none repeat scroll 0% 0%") {
            x.style.background = "rgb(209, 209, 209)"
            idMeta = 0;
            me = 0;
        } else {
            alert("Ya se colocó una meta en la posicion: " + idMeta)
        }


    }
}

function mover(){
       eje= setInterval(moverNorte,time2); 
}

function moverNorte() {
    
    var x = 0;
    var y = 0;
    //Espliteo el id para manejarlo como partes enteras y asi poder sumarlo
    x = parseInt(idAgente.split(',')[0]);
    y = parseInt(idAgente.split(',')[1]);

    
    
        //Movimiento hacia arriba
    if (y - 1 != -1) {
        //Verifico si es el mismo id que la meta
        if (x + "," + (y - 1) == idMeta) {
            alert("Juego Ganado");
            clearInterval(eje); 
        }
        //Si es del gris normarl entra
        if (document.getElementById(x + "," + (y - 1)).style.backgroundColor == "rgb(209, 209, 209)") {
            console.log("Entra a Y")
            //Le pongo color azul la siguiente
            document.getElementById(x + "," + (y - 1)).style.backgroundColor = "rgb(0, 153, 255)"
            //Vuelvo color gris la anterior
            document.getElementById(x + "," + y).style.backgroundColor = "rgb(" + rgb + "," + rgb + "," + rgb + ")"
            idAgente = x + "," + (y - 1) 

        } else {
            setTimeout(() => {  MoverDerecha(x, y); }, time);
            
        }
    } else {
        setTimeout(() => {  MoverDerecha(x, y); }, time);
    }
}

    




function MoverDerecha(x, y) {

    if (x + 1 < tx) {
        //Verifico si es el mismo id que la meta
        if ((x + 1) + "," + (y) == idMeta) {
            alert("Juego Ganado");
            clearInterval(eje); 
        }
        if (document.getElementById((x + 1) + "," + (y)).style.backgroundColor == "rgb(209, 209, 209)") {
            console.log("Entra")
            //Le pongo el color azul a la siguiente
            document.getElementById((x + 1) + "," + (y)).style.backgroundColor = "rgb(0, 153, 255)"
            //Vuelvo color gris la anterior
            document.getElementById(x + "," + y).style.backgroundColor = "rgb(" + rgb + "," + rgb + "," + rgb + ")"
            idAgente = (x + 1) + "," + (y)
        } else {
            setTimeout(() => {  MoverSur(x, y); }, time); 
        }
    } else {
        setTimeout(() => {  MoverSur(x, y); }, time);
    }
}

function MoverSur(x, y) {
    if (y + 1 < ty) {
        //Verifico si es el mismo id que la meta
        if ((x) + "," + (y + 1) == idMeta) {
            alert("Juego Ganado");
            clearInterval(eje); 
        }
        if (document.getElementById((x) + "," + (y + 1)).style.backgroundColor == "rgb(209, 209, 209)") {
            console.log("Entra")
            //Le pongo el color azul a la siguiente
            document.getElementById((x) + "," + (y + 1)).style.backgroundColor = "rgb(0, 153, 255)"
            //Vuelvo color gris la anterior
            document.getElementById(x + "," + y).style.backgroundColor = "rgb(" + rgb + "," + rgb + "," + rgb + ")"
            idAgente = (x) + "," + (y + 1)
            console.log(idAgente)
        } else {
            setTimeout(() => {  MoverIzquierda(x, y); }, time);
        }
    } else {
        setTimeout(() => {  MoverIzquierda(x, y); }, time);
    }
}

function MoverIzquierda(x, y) {
    if (x - 1 != -1) {
        //Verifico si es el mismo id que la meta
        if ((x - 1) + "," + (y) == idMeta) {
            alert("Juego Ganado");
            clearInterval(eje); 
        }
        if (document.getElementById((x - 1) + "," +(y)).style.backgroundColor == "rgb(209, 209, 209)") {
            console.log("Entra")
            //Le pongo el color azul a la siguiente
            document.getElementById((x - 1) + "," +(y)).style.backgroundColor = "rgb(0, 153, 255)"
            //Vuelvo color gris la anterior
            document.getElementById(x + "," + y).style.backgroundColor = "rgb(" + rgb + "," + rgb + "," + rgb + ")"
            idAgente = (x - 1) + "," + (y)
            console.log(idAgente)
        } else {
            setTimeout(() => {  MoverNorte2(x, y); }, time);
            
        }
    } else {
        setTimeout(() => {  MoverNorte2(x, y); }, time);
    }
}

function MoverNorte2(x, y) {
    //Movimiento hacia arriba
    if (y-1 != -1) {
        //Verifico si es el mismo id que la meta
        if (x + "," + (y - 1) == idMeta) {
            alert("Juego Ganado");
            clearInterval(eje); 
        }
        
        //Si es del gris nuevo entra
        if (document.getElementById(x+","+(y-1)).style.backgroundColor == "rgb("+rgbant+", "+rgbant+", "+rgbant+")") {
            
            //Le pongo color azul la siguiente
            document.getElementById(x + "," +(y - 1)).style.backgroundColor = "rgb(0, 153, 255)"
            //Vuelvo color gris la anterior
            document.getElementById(x + "," + y).style.backgroundColor = "rgb("+(rgb-10)+","+(rgb-10)+","+(rgb-10)+")"
            idAgente = x + "," + (y - 1)

        } else {
            avaluo+=1;
            setTimeout(() => {  MoverDerecha2(x, y); }, time); 
        }
    } else {
        setTimeout(() => {  MoverDerecha2(x, y); }, time);
    }
}

function MoverDerecha2(x, y) {
    if (x + 1 < tx) {
        //Verifico si es el mismo id que la meta
        if ((x + 1) + "," + (y) == idMeta) {
            alert("Juego Ganado");
            clearInterval(eje); 
        }
        
        if (document.getElementById((x + 1)+","+(y)).style.backgroundColor == "rgb("+rgbant+", "+rgbant+", "+rgbant+")") {
            
            //Le pongo el color azul a la siguiente
            document.getElementById((x + 1) + "," +(y)).style.backgroundColor = "rgb(0, 153, 255)"
            //Vuelvo color gris la anterior
            document.getElementById(x + "," + y).style.backgroundColor = "rgb("+(rgb-10)+","+(rgb-10)+","+(rgb-10)+")"
            idAgente = (x + 1) + "," + (y)
        } else {
            avaluo+=1;
            setTimeout(() => {  MoverSur2(x, y); }, time); 
            
        }
    } else {
        setTimeout(() => {  MoverSur2(x, y); }, time);
    }
}

function MoverSur2(x, y) {
    if (y + 1 < ty) {
        //Verifico si es el mismo id que la meta
        if ((x) + "," + (y + 1) == idMeta) {
            alert("Juego Ganado");
            clearInterval(eje); 
        }
        
        if (document.getElementById((x)+","+(y + 1)).style.backgroundColor == "rgb("+rgbant+", "+rgbant+", "+rgbant+")") {
            
            //Le pongo el color azul a la siguiente
            document.getElementById((x)+ "," +(y + 1)).style.backgroundColor = "rgb(0, 153, 255)"
            //Vuelvo color gris la anterior
            document.getElementById(x + "," + y).style.backgroundColor = "rgb("+(rgb-10)+","+(rgb-10)+","+(rgb-10)+")"
            idAgente = (x) + "," + (y + 1)
            console.log(idAgente)
        } else {
            avaluo+=1;
            setTimeout(() => {  MoverIzquierda2(x, y); }, time);
            
        }
    } else {
        setTimeout(() => {  MoverIzquierda2(x, y); }, time);
    }
}

function MoverIzquierda2(x, y) {
    if (x - 1 != -1) {
        //Verifico si es el mismo id que la meta
        if ((x - 1) + "," + (y) == idMeta) {
            alert("Juego Ganado");
            clearInterval(eje); 
        }
        
        if (document.getElementById((x - 1)+","+(y)).style.backgroundColor == "rgb("+rgbant+", "+rgbant+", "+rgbant+")") {
            
            //Le pongo el color azul a la siguiente
            document.getElementById((x - 1) + "," +(y)).style.backgroundColor = "rgb(0, 153, 255)"
            //Vuelvo color gris la anterior
            document.getElementById(x + "," + y).style.backgroundColor = "rgb("+(rgb-10)+","+(rgb-10)+","+(rgb-10)+")"
            idAgente = (x - 1) + "," + (y)
            console.log(idAgente)
        } else{
            avaluo+=1;
            if(avaluo<=4){
                rgb = rgb-10;
                rgbant = rgb;
                
                avaluo=0;
            }
        }
    }else{
        if(avaluo<=4){
            rgb = rgb-10;
            rgbant = rgb;
            
            avaluo=0;
        }
    } 
    
    
}