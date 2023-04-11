require('./mongodb')
const express = require("express");
const bodyParser= require("body-parser");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(bodyParser.urlencoded({extends:true}));

let Producto=require('./models/productos')



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
  },
 
];

app.get("/api/productos", (req, res) => {
  Producto.find({}).then((productos) => {
    res.json(productos);
  });
});


app.use("/", express.static("front"));



  //nueva
  app.post("/api/pay", (req, res) => {
    const ids = req.body;
    Producto.find({}).then(productos => {
      const copiaProductos = productos.map(p => ({ ...p.toObject() }));
      ids.forEach(id => {
        const producto = copiaProductos.find(p => p.id == id);
  
        if (producto.stock > 0) {
          producto.stock--;
          Producto.findByIdAndUpdate(producto._id, { stock: producto.stock }, { new: true }).then(updatedProducto => {
            console.log(updatedProducto);
          });
        } else {
          throw ("No hay stock");
        }
      });
      res.send(copiaProductos);
    }).catch(error => {
      console.log(error);
    });
  });
  




app.listen(port, () => {
  console.log('Example app listening at http://localhost:'+port)
});
