const express = require("express");
<<<<<<< HEAD

=======
const bodyParser= require("body-parser");
>>>>>>> 3aca8b794e1ff3620cd29fee4581f54b2d03a377
const app = express();
const port = 4000;

app.use(express.json());
<<<<<<< HEAD

const productos = [

    {
    id: 1,
    nombre: "Helmo",
    precio: 50,
    imagen: "img/descarga.jpg",
    stock: 50,
  },
    {
    id: 2,
    nombre: "pepe",
    precio: 50,
    imagen: "img/descarga.jpg",
    stock: 50,
  },
    {
    id: 3,
    nombre: "Raimon",
    precio: 50,
    imagen: "img/descarga.jpg",
    stock: 50,
  },
    {
    id: 4,
    nombre: "Tumadre",
    precio: 50,
    imagen: "img/descarga.jpg",
    stock: 50,
  },
    {
    id: 5,
    nombre: "Helmo",
    precio: 50,
    imagen: "img/descarga.jpg",
    stock: 50,
  },
    {
    id: 6,
    nombre: "Helmo",
    precio: 50,
    imagen: "img/descarga.jpg",
    stock: 50,
=======
app.use(bodyParser.urlencoded({extends:true}));

//Stock de productos
let productos = [

    {
    id: 1,
    nombre: "Egipto",
    precio: 50,
    imagen: "img/desert.jpg",
    stock: 5,
  },
    {
    id: 2,
    nombre: "Islandia",
    precio: 50,
    imagen: "img/island.jpg",
    stock: 6,
  },
    {
    id: 3,
    nombre: "Noruega",
    precio: 50,
    imagen: "img/nor.jpg",
    stock: 10,
  },
    {
    id: 4,
    nombre: "España",
    precio: 50,
    imagen: "img/spain.jpg",
    stock: 8,
  },
    {
    id: 5,
    nombre: "Peru",
    precio: 50,
    imagen: "img/Machu.jpg",
    stock: 9,
  },
    {
    id: 6,
    nombre: "Nueva York",
    precio: 50,
    imagen: "img/ny.jpg",
    stock: 7,
>>>>>>> 3aca8b794e1ff3620cd29fee4581f54b2d03a377
  },
 
];

app.get("/api/productos", (req, res) => {
  res.send(productos);
});

app.use("/", express.static("front"));

<<<<<<< HEAD
app.post("/api/pay", (req, res) => {
    const ids = req.body;
    ids.forEach(id => {
      const producto = productos.find(p => p.id === id);
      if (producto) {
        producto.stock--;
      }
    });
    res.send(productos);
=======

//funcion del carro para pagar
app.post("/api/pay", (req, res) => {
    const ids = req.body;
    const copiaProductos=productos.map(p=>({...p}));
    ids.forEach(id => {
      const producto = copiaProductos.find(p => p.id === id);
       
      if (producto.stock>0) {
        producto.stock--;
      }
      else{
        throw("No hay stock");
      }
    });
    productos=copiaProductos.find(p=>p.id==id);
    res.send(producto);
    
>>>>>>> 3aca8b794e1ff3620cd29fee4581f54b2d03a377
  });
  
app.listen(port, () => {
  console.log('Example app listening at http://localhost:'+port)
});
