const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito")

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const productos = [
   {
    id: 1, nombre: "Iphone 8", precio: 100000, img:"https://www.cellshop.com/10321011-home_default/iphone-swap-xr-64gb-white-grado-b.jpg", cantidad:1,
   },
   {
    id: 2, nombre: "Iphone X", precio: 120000, img:"https://icanarias.online/35022-home_default/iphone-12-128gb-negro.jpg" , cantidad:1,
   },
   {
    id: 3, nombre: "Iphone 11", precio: 140000, img:"http://www.vicionet.com/Vel/418-home_default/apple-iphone-11-128gb-.jpg" , cantidad:1,
   },
   {
    id: 4, nombre: "Iphone 12", precio: 180000, img:"https://amonpul.com/wp-content/uploads/2022/08/iphone-12-2-250x250.jpg", cantidad:1,
   },
   {
    id: 5, nombre: "Iphone 13", precio: 240000, img:"https://d2ye0ltusw47tz.cloudfront.net/24838748-home_default/i-phone-13-256-gb-pink.jpg", cantidad:1,
   },
   {
    id: 6, nombre: "Iphone 14", precio: 300000, img:"https://rentik.com/663-home_default/iphone-14-pro.jpg", cantidad:1,
   },
]

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



const saveLocal = () =>  {
  localStorage.setItem("carrito",JSON.stringify (carrito))
}



});
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
    <p>Cantidad:  ${product.cantidad}</p>
    <p>Total $ :  ${product.cantidad * product.precio}</p>
    `

    modalContainer.append(carritoContent)

    let eliminar = document.createElement ("span");

    eliminar.innerText = "❌";
    eliminar.className = "delete-product";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarProducto);
});
const total = carrito.reduce ((acc, el) => acc + el.precio * el.cantidad, 0)

const totalBuying = document.createElement("div")
totalBuying.className = "total-content"
totalBuying.innerHTML = `total a pagar: $${total} `
modalContainer.append(totalBuying)
}

verCarrito.addEventListener("click", pintarCarrito)

const eliminarProducto = () => {
  const foundId = carrito.find ((element) => element.id)

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });
  carritoCounter ();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";
  cantidadCarrito.innerText = carrito.length;
}