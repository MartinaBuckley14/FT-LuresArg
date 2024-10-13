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

/*=============================================
=               PRE-ENTREGA 3                =
=============================================*/
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const galeriaProductos = document.querySelector("#productos");
let carritoVacio = document.querySelector("#carrito_vacio");
let carritoConProductos = document.querySelector("#carrito_con_productos");
const carritoPrecioFinal = document.querySelector("#carrito-precio-final");


//CREO ARRAY DE PRODUCTOS
const señuelos = fetch("./productos.json")
.then(resp => resp.json())
.then(productos => mostrarProductos(productos));


//CREAR TARJETAS PARA GALERIA DE PRODUCTOS
function mostrarProductos(señuelos) {
    señuelos.forEach(señuelo => {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class= "img_producto" src=${señuelo.foto}> 
        `;
    
        let divBody = document.createElement("div");
        divBody.classList.add("producto_detalle");
        divBody.innerHTML = `
            <h3 class="producto_nombre">${señuelo.nombre}</h3>
            <p>${señuelo.modelo} <br> $${señuelo.precio}</p>
            <button class="producto_agregar" id="${señuelo.id}">Agregar al carrito</button>
        `;
        let botonAgregar = divBody.querySelector(".producto_agregar");
        botonAgregar.addEventListener("click", () => agregarProductoAlCarrito(señuelo));
    
        div.append(divBody);
        galeriaProductos.append(div);
    })
}


//FUNCION PARA AGREGAR PRODUCTOS AL CARRITO
function agregarProductoAlCarrito(señuelo) {

    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        newWindow: false,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: false,
        style: {
          background: "rgba(189, 142, 99, 1)",
          borderRadius: "2rem",
          fontSize: "30px",
        },
        onClick: function(){}
    }).showToast();

    const productoRepetido = carrito.find(producto => producto.id === señuelo.id);

    if (productoRepetido) {
        productoRepetido.cantidad++;
    }else {
        carrito.push({...señuelo, cantidad: 1});
    }
    

    estadoDelCarrito();
    
}

//CHEQUEAR EL ESTADO DEL CARRITO
function estadoDelCarrito(){
    //Carrito vacio?
    if(carrito.length === 0){
        carritoVacio.classList.remove("carrito-oculto");
        carritoConProductos.classList.add("carrito-oculto");
    }else {
        carritoVacio.classList.add("carrito-oculto");
        carritoConProductos.classList.remove("carrito-oculto");
    }

    productosEnCarrito()
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//FUNCION PARA CREAR TARJETAS DE PRODUCTOS Y CHEQUEAR LOS PRODUCTOS EN CARRITO
function productosEnCarrito(){
    carritoConProductos.innerHTML = '';
    carrito.forEach(señuelo => {
        let div = document.createElement("div");
        div.classList.add("producto-carrito");
        div.innerHTML = `
          <h3>Señuelo: ${señuelo.nombre}</h3>
          <p>$${señuelo.precio}</P>
          <p>Cant: ${señuelo.cantidad}</p>
          <p>Subtotal: $${señuelo.precio * señuelo.cantidad}</p>
          <button class="eliminar_producto" id="${señuelo.id}"><i class="bi bi-trash3"></i></button>  
        `

        let botonEliminar = div.querySelector(".eliminar_producto");
        botonEliminar.addEventListener("click", () => {
            eliminarProducto(señuelo.id)
        })

        
        carritoConProductos.append(div);
    })
}

//FUNCION PARA ELIMINAR PRODUCTOS DEL CRRITO
function eliminarProducto(id) {
    carrito = carrito.filter(señuelo => señuelo.id !== id);

    estadoDelCarrito();
}

function calcularTotalCompra(carrito) {
    return carrito.reduce((acc,señuelo) => acc + (señuelo.precio * señuelo.cantidad), 0);
}

const totalCompra = calcularTotalCompra(carrito);
carritoPrecioFinal.innerText = "$"+ totalCompra;
