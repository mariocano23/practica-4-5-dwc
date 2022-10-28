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
                    if((evento.target.className=="tarea"&&tarea.className=="tarea")){
                        insertAfter(tarea,evento.target);
                    }
                }
            }
        }
    );

};//Fin de window.onload. 



