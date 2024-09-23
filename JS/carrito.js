/*=============================================
=               PRE-ENTREGA 3                =
=============================================*/

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoVacio = document.querySelector("#carrito_vacio");
const carritoConProductos = document.querySelector("#carrito_con_productos");
const carritoPrecioFinal = document.querySelector("#carrito-precio-final");

if(carrito.length > 0) {
    carritoVacio.classList.add("carrito-oculto");
    carritoConProductos.classList.remove("carrito-oculto");
    productosEnCarrito();
}else {
    carritoVacio.classList.remove("carrito-oculto");
    carritoConProductos.classList.add("carrito-oculto");  
}

//FUNCION PARA AGREGAR PRODUCTOS AL CARRITO
function agregarProductoAlCarrito(señuelo) {
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

//FUNCION PARA CREAR TARJETAS DE PRODUCTOS EN CARRITO

//ESTILO DE TARJETAS
/*<div class="producto-carrito">
    <h3>${senuelo.nombre}</h3>
    <p>$${senuelo.precio}</P>
    <p>Cant: ${senuelo.cantidad}</p>
    <p>Subtotal: $${senuelo.precio * senuelo.cantidad}</p>
    <button class="carrito-button">❌</button>
</div>*/

//FUNCION PARA CHEQUEAR LOS PRODUCTOS EN CARRITO
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
          <button class="eliminar_producto" id="${señuelo.id}">❌</button>  
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
    const productoRepetido = carrito.find(señuelo => señuelo.id === id);

    if(productoRepetido.cantidad > 1) {
        productoRepetido.cantidad--;
    }else {
        carrito = carrito.filter(señuelo => señuelo.id !== id);
    }

    estadoDelCarrito();
    actualizarTotal();
}

//FUNCION PARA MANEJAR PRECIO FINAL DEL CARRITO
function actualizarTotal(){
    const totalCompra = calcularTotalCompra(carrito);
    carritoPrecioFinal.innerText = "$"+ totalCompra;
}

function calcularTotalCompra(carrito) {
    return carrito.reduce((acc,señuelo) => acc + (señuelo.precio * señuelo.cantidad), 0);
}

actualizarTotal();
