//Bienvenida al cliente

alert("¡Bienvenido a Señuelos FT! \n A continuacion tendra todos nuestros modelos para elegir su preferido");

//Variables a utilizar durante la compra
let señuelos = [
    {
        nombre: "Bananita",
        modelo: "Sinking",
        precio: 1200
    },
    {
        nombre: "Koinor",
        modelo: "Golden-boy",
        precio: 3000
    },
    {
        nombre: "Teitei",
        modelo: "Flouting",
        precio: 600
    },
    {
        nombre: "Rufa",
        modelo: "Semi-sinking",
        precio: 600
    }

]
let señuelo1 = señuelos[0].nombre;
let señuelo2 = señuelos[1].nombre;
let señuelo3 = señuelos[2].nombre;
let señuelo4 = señuelos[3].nombre;


let sumaTotal = 0;

let carrito = [];

let productoAgregado = "El producto ha sido agregado con éxito. ¿Desea seguir comprando? (si/no)"
//Menu muestra al usuario

function menuInicial() {
    let menuInicial = "Nuestros modelos disponibles son: \n" +
        "1-" + señuelo1 + "\n" +
        "2-" + señuelo2 + "\n" +
        "3-" + señuelo3 + "\n" +
        "4-" + señuelo4 + "\n" +
        "5- Terminar y salir\n"
        "¿De cuál le gustaría conocer los detalles?";

    return parseInt(prompt(menuInicial));
}



//Mostrar datos del señuelo

function mostrarDatos(señueloElegido) {
    let i = señueloElegido - 1;
    let decision = prompt("Este es nuestro señuelo " + señuelos[i].nombre + ", tiene un estilo " + señuelos[i].modelo + " para aquellos peces que se encuentran a veces en zonas profundas y a veces un poco mas en la superficie. \n Su precio es de $" + señuelos[i].precio + "\n Desea agregar este producto a su carrito?");

    if (decision === "si"){

        carrito.push(señuelos[i].precio);
        sumaTotal = sumaTotal + señuelos[i].precio;
        let continuarTerminar = prompt(productoAgregado).toLowerCase();

        if(continuarTerminar === "si"){
            comprar();
        }else if (continuarTerminar === "no"){
            alert("El total de su compra es $" + sumaTotal);
        }else {
            alert("Opcion invalida, vuelva a intentar por SI o por NO.");
            mostrarDatos(señueloElegido);
        }

    }else if (decision === "no") {
        comprar();
    }else {
        alert("Opcion invalida, vuelva a intentar por SI o por NO.");
        mostrarDatos(señueloElegido);
    }
}


function comprar() {
    let señueloElegido= menuInicial();

    if (señueloElegido >= 1 && señueloElegido <= 4 ){
        mostrarDatos(señueloElegido);
    }else if (señueloElegido === 5){
        salir();
    }else {
        alert("El número ingresado no corresponde a ningun producto. \n Ingrese un número del 1 al 4 para ver detalles del producto o 5 para terminar y salir");
        menuInicial();
    }
}

function salir(señueloElegido){
    if (señueloElegido === 5){
        alert("Muchas gracias por su compra, vuelva pronto!")
    }
}

comprar();


