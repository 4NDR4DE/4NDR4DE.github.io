//actualizamos la tabla de inmediato
creartabla();
//Seleccionamos el boton 
var agregarcarro = document.getElementById("botonB");
//Agregamos evento al boton
agregarcarro.addEventListener("click",agregarcarroClick);
//funcion para validar y guardar datos
function agregarcarroClick(){
    //seleccionamos los elementos que ocuparemos
    var nombre = document.getElementById("Nombre").value;
    var dui = document.getElementById("DUI").value;
    var nit = document.getElementById("NIT").value;
    var marca = MarcaCarro();
    var anio = document.getElementById("Año").value;
    var color = document.getElementById("Color").value;
    var placa = document.getElementById("Placa").value;
    var texttarea = document.getElementById("texttarea").value;
    //validamos
    if(validacion(nombre,dui,nit,anio,color,placa,texttarea) == true){
        agregarcarrosa(nombre,dui,nit,marca,anio,color,placa,texttarea);
        creartabla();
    }
    
}

//funcion para actualizar el modelo del carro
function MarcaCarro(){
    //selecionamos el listbox
    var valor = document.getElementById("Marcas").value;
    //actualizamos segun el valor seleccionado
    switch(parseInt(valor)){
        case 1:
            document.getElementById("Modelo").value = "Modelo:Toyota BD1A";
            var Modelo = "Modelo:Toyota BD1A";
            break;
        case 2:
             document.getElementById("Modelo").value = "Modelo:Nissan CD88U";
            var Modelo = "Modelo:Nissan CD88U";
            break;
        case 3:
             document.getElementById("Modelo").value = "Modelo:Honda T1R0";
            var Modelo = "Modelo:Honda T1R0";
            break;
        case 4:
             document.getElementById("Modelo").value = "Modelo:Kia KlKl";
            var Modelo = "Modelo:Kia KlKl";
            break;
        case 5:
             document.getElementById("Modelo").value = "Modelo:Hyundai 33OP4";
            var Modelo = "Modelo:Hyundai 33OP4";
            break;
            
           }
    //retornamos el modelo 
    return Modelo;
}

//Utilizamos la magia de DOM
function creartabla(){
    //actualizamos la tabla segun el areglo
    var lista = consegircarros();
    //seleccionamos el elemento a actualizar
    tbody = document.querySelector("#lista_de_carros tbody");
    //refrescamos el inerhtml
    tbody.innerHTML = '';
    //creamos un for para imprimir la lista de carros
    for(var z = 0; z < lista.length; z++){
        //creamos un row 
        var row = tbody.insertRow(z),
        NombreCell = row.insertCell(0),
        DuiCell = row.insertCell(1),
        NitCell = row.insertCell(2),
        MarcaCell = row.insertCell(3),
        AnioCell = row.insertCell(4),
        ColorCell = row.insertCell(5),
        PlacaCell = row.insertCell(6),
        FalloCell = row.insertCell(7);
        //Insertamos lista
        NombreCell.innerHTML = lista[z].Nombre;
        DuiCell.innerHTML = lista[z].DUI;
        NitCell.innerHTML = lista[z].NIT;
        MarcaCell.innerHTML = lista[z].Marca;
        AnioCell.innerHTML = lista[z].Anio;
        ColorCell.innerHTML = lista[z].Color;
        PlacaCell.innerHTML = lista[z].Placa;
        var fail = (lista[z].Fallo).slice(0,10) + "..."
        FalloCell.innerHTML = fail;
        //usamos appendchild para pasarle el row
        tbody.appendChild(row);
    } 
}
//Creamos un arreglo global para almacenar los objetos
    var listaCarros = [];

//Creamos la funcion para actualizar la tabla

function agregarcarrosa(nombre,dui,nit,marca,anio,color,placa,texttarea){
    
    //creamos un objeto
    var nuevocarro = {
        Nombre: nombre,
        DUI: dui,
        NIT: nit,
        Marca: marca,
        Anio: anio,
        Color: color,
        Placa: placa,
        Fallo: texttarea   
    };
    //guardamos el objeto nuevo carro en el array
    console.log(nuevocarro);
    listaCarros.push(nuevocarro);
    //guardamos el objeto en el localstorage
    basedatoscarros(listaCarros);  
}
//rescatamos los datos que tenemos en el localstorage
function consegircarros(){
    //escojemos el item BDcarros
    var BDlista = localStorage.getItem("BDcarros");
    //verificamos si esta vacia o no
    if(BDlista == null){
       listaCarros = [];
       }else{
       listaCarros = JSON.parse(BDlista);
       }
    //retornamos la lista de carros
    return listaCarros;
}
//guardamos los objetos en el localstorage
function basedatoscarros(plista){
    //Utilizamos JSON para guardar el objeto de la lista
    localStorage.setItem("BDcarros",JSON.stringify(plista));
    
}
//validamos datos
function validacion(nombre,dui,nit,anio,color,placa,texttarea){
    var validado = false;
    if(nombre.length < 4){//si el nombre es menor a 4
       alert("Nombre no completo");
       }else{
           if(dui.length < 10 || dui.length > 10){//verificamos el dui
              alert("DUI no valido");
              }else{
                  var contar_numeros = dui.replace(/[^0-9]/g,"").length;
  
                  if(dui.substr(8,1) == "-" && contar_numeros == 9){//verificamos
                     
                      if(nit.length < 18 || nit.length > 18){//verificamos el nit
                         alert("NIT no valido");
                         }else{
                             var contar_numeros2 = nit.replace(/[^0-9]/g,"").length;
                             if((nit.substr(4,1) == "-")&&(nit.substr(11,1) == "-")&&(nit.substr(16,1) == "-") && contar_numeros2 == 15){//utilizamos los parametros que queremos comprobar
                                var contar_numeros3 = anio.replace(/[^0-9]/g,"").length; 
                                 if((anio.length < 4 || anio.length > 4)){//comprobamos el año
                                    alert("Año no valido");
                                    }else{
                                     if(contar_numeros3 == 4){
                                        if(parseInt(anio) < 2000 || parseInt(anio) > 2022 ){
                                           alert("Año no valido");
                                           }else{
                                               if(placa.length < 7 || placa.length > 7){//comprobamos la placa
                                                  alert("Placa no valida");
                                                  }else{
                                                      if(texttarea.length > 7){//comprobamos el mensaje
                                                           validado = true;
                                                         }
                                                  }
                                           }
                                         
                                        }else{
                                            alert("Año no valido");
                                        }
                                    }
                                }else{
                         alert("NIT no valido");
                     }
                         }
                     }else{
                         alert("DUI no valido");
                     }
              }
       }
    
    return validado;
}

