//Funcion para cambiar el color a un agente
function changeAgente(x){
    var pared = document.getElementById("pared").checked;
    var agente = document.getElementById("agente").checked;
    var meta = document.getElementById("meta").checked;
    var id = x.id;
    console.log(id)
    if(pared){
        //Pared es de color roja
        if(x.style.background == "rgb(255, 0, 0) none repeat scroll 0% 0%"){
            console.log("pared de color roja a gris")
            x.style.background = "rgb(209, 209, 209)";
        }else{
            console.log("pared de color gris a roja")
            x.style.background = "rgb(255, 0, 0)";
        }

    }else if(agente){
        //Agente es de color azul
        x.style.background = "rgb(0, 153, 255)";
    }else if(meta){
        //Meta es de color verde
        x.style.background = "rgb(115, 255, 0)";
    }


}