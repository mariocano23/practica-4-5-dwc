"use strict";




var doc = window.document;

function eliminarTareas() { //Función que elimina las tareas que ya están el HTML.
    let tareas = doc.getElementsByClassName("tarea");
    while (tareas.length>0) {
        tareas[0].remove();
    }
    let acabadas = doc.getElementsByClassName("acabada");
    while (acabadas.length>0) {
        acabadas[0].remove();
    }
}

function cuentaElementos(elemento) { //Función para obtener el número de un tipo de elemento en un HTML.
    let elementos = doc.querySelectorAll(elemento);
    return elementos.length;
}

function añadir() { //Función que recoge el texto de la textarea, crea una tarea y la añade a pendientes.
    let textarea = doc.querySelector("#tareas textarea");
    let tarea = doc.createElement("div");
    let texto = textarea.value;
    if(!texto==""){ //Si el usuario intenta crear una tarea sin añadir texto no se creara y se mostrara un aviso.
        tarea.setAttribute("class","tarea");
        let id = "tarea"+(cuentaElementos(".tarea")+cuentaElementos(".acabada"));
        tarea.setAttribute("id",id);
        tarea.setAttribute("draggable", true);
        tarea.innerHTML=`<p>${texto}</p>
        <p class="botones">
        <input type="button" value="Borrar" class="del" onclick='borrar("${id}")'/>
        <input type="button" value="Acabar" class="end" onclick='acabar("${id}")'/>
        </p>`;
        doc.getElementById("pendientes").appendChild(tarea);
        if(doc.getElementById("errorTexto")!=null){
            doc.getElementById("errorTexto").remove();
        }
    }else{
        if(doc.getElementById("errorTexto")!=null){
            
        }else{
            let msgError = doc.createElement("p");
        msgError.setAttribute("id","errorTexto");
        msgError.textContent="No se puede crear una tarea sin texto.";
        doc.getElementById("tareas").appendChild(msgError);
        }  
    }
    textarea.value="";
    
}

function borrar(id){ //Función para eliminar una tarea pendiente si se ha creado por error o ya no es necesaria.
   doc.getElementById(id).remove();
}

function acabar(id) {//Función que pasa una tarea de pendiente a acabada y hace los cambios pertinentes al elemento.
    let acabado = doc.getElementById(id);
    acabado.setAttribute("class","acabada");
    let arch = doc.querySelector("#"+id+" .del");
    arch.setAttribute("value","Archivar");
    arch.setAttribute("onclick","archivar('"+id+"')");
    let volv = doc.querySelector("#"+id+" .end");
    volv.setAttribute("value","Volver");
    volv.setAttribute("onclick","volver('"+id+"')");
    doc.getElementById("acabadas").appendChild(acabado);
}

function volver(id) {//Función que pasa una tarea de acabada a pendiente y hace los cambios pertinentes al elemento.
    let acabado = doc.getElementById(id);
    acabado.setAttribute("id",id);
    acabado.setAttribute("class","tarea");
    let arch = doc.querySelector("#"+id+" .del");
    arch.setAttribute("value","Borrar");
    arch.setAttribute("onclick","borrar('"+id+"')");
    let volv = doc.querySelector("#"+id+" .end");
    volv.setAttribute("value","Acabar");
    volv.setAttribute("onclick","acabar('"+id+"')");
    doc.getElementById("pendientes").appendChild(acabado);
}

function volver2() {//Función que pasa una tarea de acabada a pendiente y hace los cambios pertinentes al elemento.
    this.setAttribute("class","tarea");
    let arch = doc.querySelector("#"+id+" .del");
    this.
    arch.setAttribute("value","Borrar");
    arch.setAttribute("onclick","borrar('"+id+"')");
    let volv = doc.querySelector("#"+id+" .end");
    volv.setAttribute("value","Acabar");
    volv.setAttribute("onclick","acabar('"+id+"')");
    doc.getElementById("pendientes").appendChild(acabado);
}

function archivar(id) {//Función que oculta la tarea acabada que quieras.
    let archivado = doc.getElementById(id);
    archivado.classList.add("archivado");
    doc.getElementById("acabadas").appendChild(archivado);
}

function mostrar() { //Función para mostrar las tareas archivadas.
    let desaparecidos = doc.getElementsByClassName("archivado");
    while (desaparecidos.length>0) {
        desaparecidos[0].classList.remove("archivado");
    }
}

function insertAfter(nuevoElemento, elementoExistente) { //Función que añade un elemento nuevo después de uno ya existente.
    let parent = elementoExistente.parentNode;
    parent.replaceChild(nuevoElemento, elementoExistente);
    parent.insertBefore(elementoExistente, nuevoElemento);
}

eliminarTareas();

window.onload = () => {
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
            console.log(evento);
            if (evento.target.id=="pendientes"&&tarea.className=="acabada") {
                volver(tarea.id);
            }else{
                if(evento.target.id=="acabadas"&&tarea.className=="tarea"){
                    acabar(tarea.id);
                }else{
                    if((evento.target.className=="acabada"&&tarea.className=="acabada")||(evento.target.className=="tarea"&&tarea.className=="tarea")){
                        insertAfter(tarea,evento.target);
                    }
                }
            }
        }
    );

};//Fin de window.onload. 



