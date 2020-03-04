//Funcion para cambiar el color a un agente
let idAgente = 0;
let idMeta = 0;
let idAgente2 =0;
let ag = 0;
let ag2 =0;
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
var matriz2
var pared2 = 988;
var meta2 = 999;
var i =0;
var PF = require('pathfinding');

function changeAgente(x) {
    var pared = document.getElementById("pared").checked;
    var agente = document.getElementById("agente").checked;
    var meta = document.getElementById("meta").checked;
    tx = parseInt(document.querySelector(".tx").textContent);
    ty = parseInt(document.querySelector(".ty").textContent);
    px = parseInt(x.id.split(",")[1]);
    py = parseInt(x.id.split(",")[0]);
    

    if(localStorage.getItem('matriz') == undefined){
        matriz2 = new Array(tx)
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
            matriz2[px][py] =pared2;
        
            
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
        }else if(ag2 == 0){
            x.style.background ="rgb(0, 153, 255)";
            idAgente2 = x.id;
            ag2 =1; 
        }else if (x.style.background == "rgb(0, 153, 255) none repeat scroll 0% 0%" && idAgente == x.id) {
            x.style.background = "rgb(209, 209, 209)";
            idAgente = 0;
            ag = 0;
        }else if (x.style.background == "rgb(0, 153, 255) none repeat scroll 0% 0%" && idAgente2 == x.id) {
            x.style.background = "rgb(209, 209, 209)";
            idAgente2 = 0;
            ag2 = 0;
        }else {
            alert("Ya se colocó un agente en la posicion:" + idAgente)
        }

    } else if (meta) {
        //Meta es de color verde
        if (me == 0) {
            x.style.background = "rgb(115, 255, 0)";
            idMeta = x.id;
            me = 1;
            matriz2[px][py] =meta2;
        }else if (x.style.background == "rgb(115, 255, 0) none repeat scroll 0% 0%") {
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
    console.log(matriz2)
    eje = setInterval(iniciar,500); 
    he=setInterval(MoverHeuristico,500); 
}

function iniciar(){
    var x = parseInt(idAgente.split(",")[0]);
    var y = parseInt(idAgente.split(",")[1]);
    
    if(Terminar(x,y)){
        return;
    }
    //Moverse la matriz esta al reves [y][x]

    //Aca verifica los movimientos en la fila superior
    if(y == 0 ){
        //Verifico si esta en la esquina 0,0
        if(x ==0 && y ==0){
            if(matriz2[y][x+1]  <= matriz2[y+1][x]){
                MoverDerecha(x,y);
            }else if(matriz2[y+1][x] != pared2){
                MoverAbajo(x,y);
            }
        }
        //Verificar en la posicion X=n, y=0
        else if(x == tx-1 && y ==0){
            if(matriz2[y+1][x] <= matriz2[y][x-1]){
                MoverAbajo(x,y)
            }else if(matriz2[y][x-1] != pared2){
                MoverIzquierda(x,y);
            }
        }
        //Verificacion dentro de la fila superior exceptuando las esquinas
        else {
            if(matriz2[y][x+1] <= matriz2[y+1][x] && matriz2[y][x+1] <= matriz2[y][x-1]){
                MoverDerecha(x,y);
            }else if(matriz2[y+1][x] <= matriz2[y][x-1]){
                MoverAbajo(x,y);
            }else if(matriz2[y][x-1] != pared2){
                MoverIzquierda(x,y);
            }
        }
    }
    //Verificando la esquina inferior izquierda donde x=0 y=n
    else if(x==0){
        if(x ==0 && y == ty-1){
            if(matriz2[y-1][x] <= matriz2[y][x+1]){
                MoverArriba(x,y);
            }else if(matriz2[y][x+1] != pared2){
                MoverDerecha(x,y);
            }
        }
        //Verificando dentro de la columna izquierda
        else{
            if(matriz2[y-1][x] <= matriz2[y][x+1] && matriz2[y-1][x] <= matriz2[y+1][x]){
                MoverArriba(x,y);
            }else if(matriz2[y][x+1] <= matriz2[y+1][x]){
                MoverDerecha(x,y);
            }else if(matriz2[y+1][x] != pared2){
                MoverAbajo(x,y);
            }
        }
    }
    //Verificando columna derecha
    else if(x == tx-1 && y <ty-1){
        if(matriz2[y-1][x] <= matriz2[y+1][x] && matriz2[y-1][x] <= matriz2[y][x-1]){
            MoverArriba(x,y);
        }else if(matriz2[y+1][x] <= matriz2[y][x-1]){
            MoverAbajo(x,y);
        }else if(matriz2[y][x-1] != pared2){
            MoverIzquierda(x,y);
        }
    }
    //Verificando la fila inferior
    else if(y == ty-1){
        //Verificar punto x=tx y=ty
        if(y== ty-1 && x == tx-1){
            if(matriz2[y-1][x] <= matriz2[y][x-1]){
                MoverArriba(x,y);
            }else if(matriz2[y][x-1] != pared2){
                MoverIzquierda(x,y);
            }
        }else {
            if(matriz2[y-1][x] <= matriz2[y][x+1] && matriz2[y-1][x] <= matriz2[y][x-1]){
                MoverArriba(x,y);
            }else if(matriz2[y][x+1] <= matriz2[y][x-1]){
                MoverDerecha(x,y);
            }else if(matriz2[y][x-1] != pared2){
                MoverIzquierda(x,y);
            }
        }
    }else{
        if(matriz2[y-1][x] <= matriz2[y][x+1] && matriz2[y-1][x] <= matriz2[y+1][x] && matriz2[y-1][x] <= matriz2[y][x-1]){
            MoverArriba(x,y);
        }else if(matriz2[y][x+1] <= matriz2[y+1][x] && matriz2[y][x+1] <= matriz2[y][x-1]){
            MoverDerecha(x,y);
        }else if(matriz2[y+1][x] <= matriz2[y][x-1]){
            MoverAbajo(x,y);
        }else if(matriz2[y][x-1] != pared2){
            MoverIzquierda(x,y);
        }
    }
}

function MoverArriba(x,y){
    //Moverser
    document.getElementById((x) + "," + (y-1)).style.backgroundColor = "rgb(0, 153, 255)"
    //Vuelvo color gris la anterior
    document.getElementById(x + "," + y).style.backgroundColor = "rgb(" + rgb + "," + rgb + "," + rgb + ")"
    idAgente = (x) + "," + (y-1) 
    matriz2[y][x]+=1;
    
    
}

function MoverIzquierda(x,y){
    //Moverser
    document.getElementById((x-1) + "," + (y)).style.backgroundColor = "rgb(0, 153, 255)"
    //Vuelvo color gris la anterior
    document.getElementById(x + "," + y).style.backgroundColor = "rgb(" + rgb + "," + rgb + "," + rgb + ")"
    idAgente = (x-1) + "," + (y) 
    matriz2[y][x]+=1;
    
}

function MoverAbajo(x,y){
    //Moverser
    document.getElementById((x) + "," + (y+1)).style.backgroundColor = "rgb(0, 153, 255)"
    //Vuelvo color gris la anterior
    document.getElementById(x + "," + y).style.backgroundColor = "rgb(" + rgb + "," + rgb + "," + rgb + ")"
    idAgente = (x) + "," + (y+1) 
    matriz2[y][x]+=1;
}
function MoverDerecha(x,y){
    //Moverser
    document.getElementById((x+1) + "," + (y)).style.backgroundColor = "rgb(0, 153, 255)"
    //Vuelvo color gris la anterior
    document.getElementById(x + "," + y).style.backgroundColor = "rgb(" + rgb + "," + rgb + "," + rgb + ")"
    idAgente = (x+1) + "," + (y) 
    matriz2[y][x]+=1;
}

function MoverHeuristico(){
    var xinit = parseInt(idAgente2.split(",")[0]);
    var yinit = parseInt(idAgente2.split(",")[1]);
    var xid1 = parseInt(idAgente.split(",")[0]);
    var yid1 = parseInt(idAgente.split(",")[1]);
    var xMeta = parseInt(idMeta.split(",")[0]);
    var yMeta = parseInt(idMeta.split(",")[1]);
    var grid = new PF.Grid(tx,ty);
    var finder = new PF.AStarFinder();
    grid.setWalkableAt(xMeta, yMeta, true);
    grid.setWalkableAt(xid1, yid1, true);

    for(var i =0; i< tx; i++){
        for(var j=0; j<ty; j++){
            if(matriz2[j][i] == pared2){
                grid.setWalkableAt(i,j,false);
            }
        }
    }
    var path = finder.findPath(xinit, yinit, xMeta, yMeta, grid);
    console.log(path)
    MoverAgenteHeuristico(path);
    
}

function MoverAgenteHeuristico(path){
    if(i+1 < path.length){
            //Moverser
        document.getElementById((path[i+1][0]) + "," + (path[i+1][1])).style.backgroundColor = "rgb(0, 153, 255)"
        //Vuelvo color gris la anterior
        document.getElementById(path[i][0] + "," + path[i][1]).style.backgroundColor = "rgb(209, 209, 209)"
        i+=1;
    }else{
        clearInterval(he)
        alert('You Lose!!')
    }
    
    
}

function Terminar(x,y){
    try{
        if(matriz2[y-1][x] == meta2){
            clearInterval(eje);
            MoverArriba(x,y);
            alert('Juego Ganado')
            return true;
            
        }
    }catch(e){
            
    }
    
    try{
        if(matriz2[y][x+1] == meta2){
            clearInterval(eje);
            MoverDerecha(x,y);
            alert('Juego Ganado')
            return true;
            
        }
    }catch(e){
            
    }

    try{
        if(matriz2[y+1][x] == meta2){
            clearInterval(eje);
            MoverAbajo(x,y)
            alert('Juego Ganado')
            return true;
            
        }
    }catch(e){
            
    }

    try{
        if(matriz2[y][x-1] == meta2){
            clearInterval(eje);
            MoverIzquierda(x,y);
            alert('Juego Ganado')
            return true;
            
        }
    }catch(e){
            
    }
    
    
}