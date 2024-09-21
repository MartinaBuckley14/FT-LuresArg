/*=============================================
=               PRE-ENTREGA 2                =
=============================================*/

//Bienvenida al cliente

// alert("¡Bienvenido a Señuelos FT! \n A continuacion tendra todos nuestros modelos para elegir su preferido");

// //Variables a utilizar durante la compra
// let señuelos = [
//     {
//         nombre: "Bananita",
//         modelo: "Sinking",
//         precio: 1200
//     },
//     {
//         nombre: "Koinor",
//         modelo: "Golden-boy",
//         precio: 3000
//     },
//     {
//         nombre: "Teitei",
//         modelo: "Flouting",
//         precio: 600
//     },
//     {
//         nombre: "Rufa",
//         modelo: "Semi-sinking",
//         precio: 600
//     }

// ]
// let señuelo1 = señuelos[0].nombre;
// let señuelo2 = señuelos[1].nombre;
// let señuelo3 = señuelos[2].nombre;
// let señuelo4 = señuelos[3].nombre;


// let sumaTotal = 0;

// let carrito = [];

// let productoAgregado = "El producto ha sido agregado con éxito. ¿Desea seguir comprando? (si/no)"
// //Menu muestra al usuario

// function menuInicial() {
//     let menuInicial = "Nuestros modelos disponibles son: \n" +
//         "1-" + señuelo1 + "\n" +
//         "2-" + señuelo2 + "\n" +
//         "3-" + señuelo3 + "\n" +
//         "4-" + señuelo4 + "\n" +
//         "5- Terminar y salir\n"
//         "¿De cuál le gustaría conocer los detalles?";

//     return parseInt(prompt(menuInicial));
// }

// //Mostrar datos del señuelo

// function mostrarDatos(señueloElegido) {
//     let i = señueloElegido - 1;
//     let decision = prompt("Este es nuestro señuelo " + señuelos[i].nombre + ", tiene un estilo " + señuelos[i].modelo + " para aquellos peces que se encuentran a veces en zonas profundas y a veces un poco mas en la superficie. \n Su precio es de $" + señuelos[i].precio + "\n Desea agregar este producto a su carrito?");

//     if (decision === "si"){

//         carrito.push(señuelos[i].precio);
//         sumaTotal = sumaTotal + señuelos[i].precio;
//         let continuarTerminar = prompt(productoAgregado).toLowerCase();

//         if(continuarTerminar === "si"){
//             comprar();
//         }else if (continuarTerminar === "no"){
//             alert("El total de su compra es $" + sumaTotal);
//         }else {
//             alert("Opcion invalida, vuelva a intentar por SI o por NO.");
//             mostrarDatos(señueloElegido);
//         }

//     }else if (decision === "no") {
//         comprar();
//     }else {
//         alert("Opcion invalida, vuelva a intentar por SI o por NO.");
//         mostrarDatos(señueloElegido);
//     }
// }

// function comprar() {
//     let señueloElegido= menuInicial();

//     if (señueloElegido >= 1 && señueloElegido <= 4 ){
//         mostrarDatos(señueloElegido);
//     }else if (señueloElegido === 5){
//         salir();
//     }else {
//         alert("El número ingresado no corresponde a ningun producto. \n Ingrese un número del 1 al 4 para ver detalles del producto o 5 para terminar y salir");
//         comprar();
//     }
// }

// function salir(señueloElegido){
//     if (señueloElegido === 5){
//         alert("Muchas gracias por su compra, vuelva pronto!")
//     }
// }

// comprar();

const galeriaProductos = document.querySelector("#productos");
const carritoConProductos = document.querySelector("#carrito-con-productos");
const carritoPrecioFinal = document.querySelector("#carrito-precio-final");

const productos = [];
let carrito = [];


class senuelo {
    constructor (id, foto, nombre, modelo, precio){
        this.id = id;
        this.foto = foto;
        this.nombre = nombre;
        this.modelo = modelo;
        this.precio = precio;
    }
}


productos.push(new senuelo("knr", "./multimedia/fotoprod/koinor.jpeg", "Koinor", "Golden-boy", 3000));
productos.push(new senuelo("teit", "multimedia/fotoprod/teitei.jpg", "Teitei", "Flouting", 600));
productos.push(new senuelo("ruf", "./multimedia/fotoprod/rufa.jpeg", "Rufa", "Semi-sinking", 900));


/* Estilo de tarjeta de producto. */
/* <div class="producto">
        <img class="producto_img" src="./multimedia/fotoprod/ban.12cm.jpeg" alt="">
        <div class="producto_body">
         <h4 class="producto_titulo">Señuelo 1</h4>
         <p>$1000</p>
         <button class="producto_agregar" id="agregar_preducto" type="submit">Agregar al carrito</button>
        </div>
    </div>
*/

productos.forEach((senuelo) => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class= "img_producto" src=${senuelo.foto}> 
    `;

    let divBody = document.createElement("div");
    divBody.classList.add("producto_body");
    divBody.innerHTML = `
        <h3>${senuelo.nombre}</h3>
        <p>${senuelo.modelo} <br> $${senuelo.precio}</p>
    `;
    
     
    let button = document.createElement("button");
    button.classList.add("producto_agregar");
    button.innerText = "Agregar al carrito";

    button.addEventListener("click", () => {
        agregarProducto(senuelo);
    })

    div.append(divBody);
    divBody.append(button);
    galeriaProductos.append(div);
})

function agregarProducto(senuelo) {
    let productoRepetido = carrito.find((senuelo) => senuelo.id === senuelo.id);

    carrito.push({...senuelo, cantidad: 1});
    carrito.push(senuelo);
}









/*=============================================
=                   CARRITO                   =
=============================================*/

// let carrito = document.querySelector(".productos_en_carrito");

// carrito = [];
