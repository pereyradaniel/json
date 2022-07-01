stockProductos = [
  {
    id: 1,
    producto: "Yerba",
    marca: "La Merced",
    categoria: "Almacen",
    peso: 500,
    precio: 400,
    stock: 50,
    img: "./img/yerba-mate-la-merced-opt.jpg",
  },
  {
    id: 2,
    producto: "Dulce de Leche",
    marca: "La Serenisima",
    categoria: "Lacteos",
    peso: 500,
    precio: 400,
    stock: 50,
    img: "./img/dulce-de-leche-la-serenisima-estilo-colonial-opt.jpg",
  },
  {
    id: 3,
    producto: "Dulce de Leche",
    marca: "Vacalin",
    categoria: "Lacteos",
    peso: 500,
    precio: 400,
    stock: 50,
    img: "./img/dulce-de-leche-vacalin-sin-tacc-original-opt.jpg",
  },
  {
    id: 4,
    producto: "Alfajor",
    marca: "Havanna",
    categoria: "Almacen",
    peso: "90G",
    precio: 200,
    stock: 50,
    img: "./img/alfajor-havanna-opt.jpg",
  },
  {
    id: 5,
    producto: "Bebida",
    marca: "Coca Cola",
    categoria: "Bebidas",
    peso: "1.70L",
    precio: 280,
    stock: 50,
    img: "./img/Coca-cola-Sabor-Original-1-5-opt.jpg",
  },
  {
    id: 6,
    producto: "Bebida",
    marca: "Sprite Zero",
    categoria: "Bebidas",
    peso: 125,
    precio: 280,
    stock: 50,
    img: "./img/sprite125-opt.jpg",
  },
  {
    id: 7,
    producto: "Bebida",
    marca: "Paso de los Toros Tonica",
    categoria: "Bebidas",
    peso: 150,
    precio: 280,
    stock: 50,
    img: "./img/Gaseosa-Paso-De-Los-Toros-Tonica-150-opt.jpg",
  },
  {
    id: 8,
    producto: "Bebida",
    marca: "Paso de los Toros Pomelo",
    categoria: "Bebidas",
    peso: 150,
    precio: 280,
    stock: 50,
    img: "./img/paso de los toros pomelo-opt.jpg",
  },
  {
    id: 9,
    producto: "Dulce de Leche",
    marca: "La Serenisima",
    categoria: "Lacteos",
    peso: 500,
    precio: 400,
    stock: 50,
    img: "./img/dulce-de-leche-la-serenisima-estilo-colonial-opt.jpg",
  },
  {
    id: 10,
    producto: "Dulce de Leche",
    marca: "Vacalin",
    categoria: "Lacteos",
    peso: 500,
    precio: 400,
    stock: 50,
    img: "./img/dulce-de-leche-vacalin-sin-tacc-original-opt.jpg",
  },
  {
    id: 11,
    producto: "Leche",
    marca: "La Serenisa",
    categoria: "Lacteos",
    peso: 500,
    precio: 400,
    stock: 50,
    img: "./img/leche-la-serenisima-descremada-opt.jpg",
  },
  {
    id: 12,
    producto: "Tomates",
    marca: "Noel",
    categoria: "Almacen",
    peso: 400,
    precio: 120,
    stock: 50,
    img: "./img/tomates perita-opt.jpg",
  },
  {
    id: 13,
    producto: "Harina",
    marca: "Cañuelas",
    categoria: "Almacen",
    peso: 1000,
    precio: 120,
    stock: 50,
    img: "./img/harina-canuelas-opt.jpg",
  },
];

let carritoDeCompras = [];

const contenedorProductos = document.getElementById("productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");

const botonTerminar = document.getElementById("boton-terminar");
const finCompra = document.getElementById("fin-compra");

const contadorCarrito = document.getElementById("contador-carrito");
const precioTotal = document.getElementById("precioTotal");

const selectCategoria = document.getElementById("selectCategoria");
const buscar = document.getElementById("search");

//filtro
selectCategoria.addEventListener("change", () => {
  if (selectCategoria.value == "Todos") {
    mostrarProductos(stockProductos);
  } else {
    let arrayNuevo = stockProductos.filter(
      (item) => item.categoria == selectCategoria.value
    );
    mostrarProductos(arrayNuevo);
  }
});

//Buscado

mostrarProductos(stockProductos);

//logica Ecommerce
function mostrarProductos(array) {
  contenedorProductos.innerHTML = "";

  for (const el of array) {
    let div = document.createElement("div");
    div.className = "productos";
    div.innerHTML = `<div class="card" style="width: 18rem;">
        <img src="${el.img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${el.producto}</h5>
            <h6>Precio $${el.precio}</h6>
            <p class="card-text">${el.marca}</p>
            <a id="boton${el.id}" class="btn btn-light btn-estilo"><i class="fa-solid fa-cart-arrow-down"></i> Agregar al Carrito</a>
        </div>
    </div> `;

    contenedorProductos.appendChild(div);

    let btnAgregar = document.getElementById(`boton${el.id}`);

    btnAgregar.addEventListener("click", () => {
      agregarAlCarrito(el.id);
    });
  }
}

function agregarAlCarrito(id) {
  let yaExiste = carritoDeCompras.find((elemento) => elemento.id == id);

  if (yaExiste) {
    yaExiste.cantidad = yaExiste.cantidad + 1;
    document.getElementById(
      `cantidad${yaExiste.id}`
    ).innerHTML = `<p id="cantidad${yaExiste.id}">cantidad: ${yaExiste.cantidad}</p>`;
    actualizarCarrito();
  } else {
    let productoAgregar = stockProductos.find((ele) => ele.id === id);
    productoAgregar.cantidad = 1;
    carritoDeCompras.push(productoAgregar);
    actualizarCarrito();
    mostrarCarrito(productoAgregar);
  }
}

function mostrarCarrito(productoAgregar) {
  let div = document.createElement("div");
  div.classList.add("productoEnCarrito");
  div.innerHTML = `<img src="${productoAgregar.img}" width=50>
    <p>${productoAgregar.producto}</p>

                <p>Precio: $${productoAgregar.precio}</p>
                <p id="cantidad${productoAgregar.id}">cantidad: ${productoAgregar.cantidad}</p>
                <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`;
  contenedorCarrito.appendChild(div);

  guardarCarrito();

  let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`);
  btnEliminar.addEventListener("click", () => {
    if (productoAgregar.cantidad == 1) {
      btnEliminar.parentElement.remove();
      carritoDeCompras = carritoDeCompras.filter(
        (item) => item.id !== productoAgregar.id
      );
      actualizarCarrito();
    } else {
      productoAgregar.cantidad = productoAgregar.cantidad - 1;
      document.getElementById(
        `cantidad${productoAgregar.id}`
      ).innerHTML = `<p id="cantidad${productoAgregar.id}">cantidad: ${productoAgregar.cantidad}</p>`;
      actualizarCarrito();
      guardarCarrito();
    }
  });
}

function actualizarCarrito() {
  contadorCarrito.innerText = carritoDeCompras.reduce(
    (acc, el) => acc + el.cantidad,
    0
  );
  precioTotal.innerText = carritoDeCompras.reduce(
    (acc, el) => acc + el.precio * el.cantidad,
    0
  );
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
  console.log("prueba" + carritoDeCompras);
}
