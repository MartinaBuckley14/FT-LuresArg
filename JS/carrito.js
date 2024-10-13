/*=============================================
=               PRE-ENTREGA 3                =
=============================================*/

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoVacio = document.querySelector("#carrito_vacio");
const carritoConProductos = document.querySelector("#carrito_con_productos");
const carritoPrecioFinal = document.querySelector("#carrito-precio-final");
const botonVaciarCarrito = document.querySelector("#boton_vaciar");
const botonFinalizarCompra = document.querySelector(".boton_final")


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

    productoRepetido ? productoRepetido.cantidad++:carrito.push({...señuelo,cantidad:1});
    
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
    Toastify({
        text: "Producto eliminado del carrito",
        duration: 3000,
        newWindow: false,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: false,
        style: {
          background: "rgba(189, 142, 99, 1)",
          borderRadius: "2rem",
          fontSize: "20px",
        },
        onClick: function(){}
    }).showToast();

    const productoRepetido = carrito.find(señuelo => señuelo.id === id);

    productoRepetido.cantidad > 1 ? productoRepetido.cantidad--:carrito = carrito.filter(señuelo => señuelo.id !== id);

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


//FUNCION PARA VACIAR CARRITO
function vaciarCarrito () {
    if(carrito.length > 0) {
        carrito = [];
    }else{
        Swal.fire({
            title: "Su carrito esta vacío",
            icon: "error",
            confirmButtonColor: "#bd8e63",
            confirmButtonText: "Ok",
            allowOutsideClick: false
        }); 
    }

    estadoDelCarrito();
    actualizarTotal();
}

botonVaciarCarrito.addEventListener("click", vaciarCarrito);

// FUNCION FINALIZAR COMPRA
function finalizarCompra() {
    if(carrito.length > 0){
        Swal.fire({
            title: "Desea finalizar su compra?",
            text: "El pedido sera enviado al vendedor",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#bd8e63",
            cancelButtonColor: "#4e3525",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            allowOutsideClick: false,
            customClass: {
                title: "tituloAlerta",
                content: "textoAlerta",
            }
            }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Pedido realizado con éxito!",
                text: "Tu compra ha sido enviada al vendedor, en breve nos pondremos en contacto",
                icon: "success",
                confirmButtonColor: "#bd8e63"
              });
              vaciarCarrito();
            }
        });
    }else{
        Swal.fire({
            title: "Usted no tiene productos en el carrito",
            icon: "error",
            confirmButtonColor: "#bd8e63",
            confirmButtonText: "Ok",
            allowOutsideClick: false
        }); 
    }  
}

botonFinalizarCompra.addEventListener("click", finalizarCompra);