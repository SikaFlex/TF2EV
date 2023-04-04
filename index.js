const express = require("express");

const app = express();
const port = 4000;

app.use(express.json());

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
  },
 
];

app.get("/api/productos", (req, res) => {
  res.send(productos);
});

app.use("/", express.static("front"));

app.post("/api/pay", (req, res) => {
    const ids = req.body;
    ids.forEach(id => {
      const producto = productos.find(p => p.id === id);
      if (producto) {
        producto.stock--;
      }
    });
    res.send(productos);
  });
  
app.listen(port, () => {
  console.log('Example app listening at http://localhost:'+port)
});
