//actualizamos la tabla de inmediato
creartabla();
//Seleccionamos el boton 
var agregarcarro = document.getElementById("botonB");
//Agregamos evento al boton
agregarcarro.addEventListener("click",agregarcarroClick);
//funcion para validar y guardar datos
function agregarcarroClick(){
    var nombre = document.getElementById("Nombre").value;
    var dui = document.getElementById("DUI").value;
    var nit = document.getElementById("NIT").value;
    var marca = MarcaCarro();
    var anio = document.getElementById("Año").value;
    var color = document.getElementById("Color").value;
    var placa = document.getElementById("Placa").value;
    var texttarea = document.getElementById("texttarea").value;
    
    
    agregarcarrosa(nombre,dui,nit,marca,anio,color,placa,texttarea);
    creartabla();
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
        FalloCell.innerHTML = lista[z].Fallo;
        
        
        
        
        
        tbody.appendChild(row);
    }
    
    
    
}



//Creamos un arreglo
    var listaCarros = [];

//Creamos la funcion para actualizar la tabla

function agregarcarrosa(nombre,dui,nit,marca,anio,color,placa,texttarea){
    
    
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
    console.log(nuevocarro);
    listaCarros.push(nuevocarro);
    basedatoscarros(listaCarros);
    
    
}

function consegircarros(){
    var BDlista = localStorage.getItem("BDcarros");
    if(BDlista == null){
       listaCarros = [];
       }else{
       listaCarros = JSON.parse(BDlista);
       }
    
    return listaCarros;
}

function basedatoscarros(plista){
    localStorage.setItem("BDcarros",JSON.stringify(plista));
    
}
