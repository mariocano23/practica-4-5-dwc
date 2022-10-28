"use strict";

import {añadir,borrar,acabar,volver,archivar,mostrar,creaIds,eliminarTareas,insertAfter} from "./Biblioteca/bibliotecaElementos.js";

window.onload = () => {

    eliminarTareas();

    document.añadir=añadir;
    document.borrar=borrar;
    document.acabar=acabar;
    document.volver=volver;
    document.archivar=archivar;
    document.mostrar=mostrar;

    var tarea;

    document.addEventListener("dragenter", function (evento) {//Evento que pone un estilo para indicar sobre donde vas a soltar la tarea.
        if (evento.target.id=="pendientes"||evento.target.id=="acabadas"||evento.target.classList.contains("tarea")) {
            evento.target.classList.add("destacado");
        }  
    });

    document.addEventListener("dragleave", function (evento) {//Evento que quita el estilo de destacado al dejar de tener el elemento arrastrado encima.
        if (evento.target.id=="pendientes"||evento.target.id=="acabadas"||evento.target.classList.contains("tarea")) {
            evento.target.classList.remove("destacado");
        }
        
    });

    document.addEventListener("dragend", function (evento) {//Evento que quita el estilo destacado al soltar el elemento. 
        evento.target.parentNode.classList.remove("destacado");
        evento.target.classList.remove("destacado");
    });


//Eventos para poder arrastarar y soltar las tareas.

    document.addEventListener(
        "dragstart",
        function(evento){
            tarea = evento.target;
        }
    );

    document.addEventListener(
        "dragover",
        function (evento) {
        evento.preventDefault();
        }
    );

    document.addEventListener(
        "drop",
        function (evento) {
            evento.preventDefault();
            if (evento.target.id=="pendientes"&&tarea.className=="acabada") { 
                volver(tarea.id);
            }else{
                if(evento.target.id=="acabadas"&&tarea.className=="tarea"){
                    acabar(tarea.id);
                }else{
                    if((evento.target.classList.contains("tarea")&&tarea.classList.contains("tarea"))){ //Comprobación para poder añadir una tarea pendienta después de otra al soltarla sobre ella.
                        insertAfter(tarea,evento.target);
                        evento.target.classList.remove("destacado");
                    }
                }
            }
        }
    );

};//Fin de window.onload. 



