//carrito

const Clickbutton = document.querySelectorAll(".button")
const tbody = document.querySelector(".tbody")
let carrito = []

Clickbutton.forEach(btn => {
  btn.addEventListener("click", addToCarritoItem)
})


function addToCarritoItem(e){
  const button = e.target
  const item = button.closest(".card")
  const itemTitle = item.querySelector(".card-title").textContent;
  const itemPrice = item.querySelector(".precio").textContent;
  const itemImg = item.querySelector(".card-img-top").src;

  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)
}


function addItemCarrito(newItem){

  const alert = document.querySelector(".alert")

  setTimeout( function(){
    alert.classList.add("hide")
  }, 2000)
    alert.classList.remove("hide")

  const InputElemn = tbody.getElementsByClassName("input__elemento")
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemn[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }

  carrito.push(newItem)

  renderCarrito()
} 


function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement("tr")
    tr.classList.add("ItemCarrito")
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener("click", removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener("change", sumaCantidad)
  })
  CarritoTotal()
}

function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector(".itemCartTotal")
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}

function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector(".title").textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  const alert = document.querySelector(".remove")

  setTimeout( function(){
    alert.classList.add("remove")
  }, 2000)
    alert.classList.remove("remove")

  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector(".title").textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

function addLocalStorage(){
  localStorage.setItem("carrito", JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if(storage){
    carrito = storage;
    renderCarrito()
  }
}

// evento de clic al botón de compra
let botonCompra = document.querySelector("#botonCompra");

const compraRealizada = botonCompra.addEventListener('click', function() {
  // alerta de confirmación con SweetAlert
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Gracias por su compra',
    showConfirmButton: false,
    timer: 1500
  })
  
});


//formulario

let nombFormu = document.querySelector("#nombre");
let mailFormu = document.querySelector("#correo");


nombFormu.addEventListener("input", function () {
   
  if (nombFormu.value === "") {
    Swal.fire({
        title: 'Ingrese su Apellido y Nombre por favor',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
  }
});

mailFormu.addEventListener("input", function () {
   
  if (mailFormu.value === "") {
    Swal.fire('Ingrese un email valido por favor.')
  }
});

let formulario = document.querySelector("#formulario");

let info = document.querySelector(".datos");

//Muestra en el DOM
const mostrarInfo = formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  info.innerHTML = `
  <div class="alert alert-warning" role="alert">
<h3> Bienvenido ${nombFormu.value}. Gracias por elegirnos. Nos contactaremos a ${mailFormu.value} en los proximos días. </h3></div>`;
});

// FETCH




const lista = document.querySelector("#listaProductos");
const mostrarProd = async () => {
  const resp = await fetch("./data.json");
  const data = await resp.json();
  data.forEach((prod) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <h4>${prod.nombre}</h4>
        <h5>${prod.precio}</h5>
      
        `;
    lista.append(li);
  });
};
mostrarProd(); 