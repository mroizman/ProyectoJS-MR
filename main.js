const shopContent = document.getElementById("shopContent")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")

const carrito = []

const productos = [
   {
    id: 1, nombre: "Iphone 8", precio: 100000, img:"https://www.cellshop.com/10321011-home_default/iphone-swap-xr-64gb-white-grado-b.jpg",
   },
   {
    id: 2, nombre: "Iphone X", precio: 120000, img:"https://icanarias.online/35022-home_default/iphone-12-128gb-negro.jpg" 
   },
   {
    id: 3, nombre: "Iphone 11", precio: 140000, img:"http://www.vicionet.com/Vel/418-home_default/apple-iphone-11-128gb-.jpg"
   },
   {
    id: 4, nombre: "Iphone 12", precio: 180000, img:"https://amonpul.com/wp-content/uploads/2022/08/iphone-12-2-250x250.jpg"
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
    carrito.push({
        id : product.id,
        img : product.img,
        nombre : product.nombre,
        precio : product.precio,
    });
  });

});
verCarrito.addEventListener("click", ()=> {
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
    <p> $${product.precio}</p>`

    modalContainer.append(carritoContent)
})
const total = carrito.reduce ((acc, el) => acc + el.precio, 0)

const totalBuying = document.createElement("div")
totalBuying.className = "total-content"
totalBuying.innerHTML = `total a pagar: $${total} `
modalContainer.append(totalBuying)
})
