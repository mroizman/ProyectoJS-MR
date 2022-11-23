const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito")


let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const productos = []

const catalogoJson = `productos.json`;
console.log(catalogoJson);

async function EjecutarCatalogo() {
  const respuesta = await fetch(catalogoJson);
  const datosDeCatalogoJson = await respuesta.json();
  CargarDatosJsonEnLista(datosDeCatalogoJson);
  cargaDeProductos();

  console.log("Catalogo añadido a la Web!...")
}

EjecutarCatalogo();
function CargarDatosJsonEnLista(datos){
  datos.forEach((producto) => {
    productos.push(producto);
    //permite agregar los datos del catalogoJuegos.json a la lista de juegos.
  });
}

function cargaDeProductos(){
productos.forEach((product)=>  {

  let content = document.createElement("div")
  content.className = "card" 
  content.innerHTML = 
  `<img src="${product.img}" >
  <h3> ${product.nombre}</h3>
  <p class="precio"> ${product.precio} $</p>
  `;
  shopContent.append(content)

  let comprar = document.createElement("button")
  comprar.innerText = "comprar"
  comprar.className = "boton-comprar"
  content.append(comprar)

  comprar.addEventListener("click",()=> {
const repeat = carrito.some ((repeatProduct) => repeatProduct.id === product.id)

if (repeat) {
  carrito.map((prod) => {
    if(prod.id === product.id) {
      prod.cantidad++;
    }
  })
}else {
    
    carrito.push({
        id : product.id,
        img : product.img,
        nombre : product.nombre,
        precio : product.precio,
        cantidad:product.cantidad,

    });
  
  carritoCounter()
  saveLocal ()
}
  });







});
}
const pintarCarrito = () => {
  modalContainer.innerHTML = ""
    modalContainer.style.display= "flex"
    const modalHeader = document.createElement("div")
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-tittle">Carrito </h1>
    `;
    modalContainer.append(modalHeader)

    const modalbutton = document.createElement("h1")
    modalbutton.innerText = "x"
    modalbutton.className = "modal-header-button"

    modalbutton.addEventListener("click",() => {
      modalContainer.style.display = "none"
    })

    modalHeader.append(modalbutton)


    carrito.forEach ((product) => {
    let carritoContent = document.createElement("div")
    carritoContent.className= "modal-content"
    carritoContent.innerHTML = `
    <img src="${product.img}"
    <h3> ${product.nombre}</h3>
    <p>$ ${product.precio}</p>
    <span class="restar"> - </span>
    <p>Cantidad:  ${product.cantidad}</p>
    <span class="sumar"> + </span>
    <p>Total $ :  ${product.cantidad * product.precio}</p>
    <span class="quitar"> ❌ </span>
    `
    

    modalContainer.append(carritoContent)

    let sumar = carritoContent.querySelector (".sumar")
    
    sumar.addEventListener("click", () => {
      product.cantidad++
      saveLocal ()
      pintarCarrito ()
    }) 

    let restar = carritoContent.querySelector(".restar")

    restar.addEventListener("click", () => {
      if(product.cantidad !== 1) {
      product.cantidad--}
      saveLocal ()
      pintarCarrito()
      
    })

    let quitar = carritoContent.querySelector (".quitar")
    
    quitar.addEventListener("click", () => {
      eliminarProducto (product.id)
      saveLocal ()
      pintarCarrito ()
    }) 

    
});
const total = carrito.reduce ((acc, el) => acc + el.precio * el.cantidad, 0)

const totalBuying = document.createElement("div")
totalBuying.className = "total-content"
totalBuying.innerHTML = `total a pagar: $${total} `
modalContainer.append(totalBuying)

const finalizarCompra = document.createElement("div")
finalizarCompra.className = "finalizarCompra"
finalizarCompra.innerHTML = `<button class="finalizarCompra"> FINALIZAR COMPRA </button>`
modalContainer.append(finalizarCompra)

let finalizar = finalizarCompra.querySelector(".finalizarCompra")
finalizar.addEventListener("click", () => {
  swal("Felicitaciones", "Usted ha realizado la compra con éxito", "success")
} )
};



verCarrito.addEventListener("click", pintarCarrito)

const eliminarProducto = (id) => {
  const foundId = carrito.find ((element) => element.id === id)
console.log(foundId)
  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });
  carritoCounter ();
  saveLocal ();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";
  const carritoLength = carrito.length;
  localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
  

}

carritoCounter()

const saveLocal = () =>  {
  localStorage.setItem("carrito",JSON.stringify (carrito))
}