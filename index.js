require('./mongodb')
const express = require("express");
const bodyParser= require("body-parser");
const app = express();
const port = process.env.PORT || 4000;
const path = require("path");
app.use(express.json());
app.use(bodyParser.urlencoded({extends:true}));


let Producto=require('./models/productos') //variable global de producto que la cogemos del model productos



//Stock de productos


app.get("/api/productos", (req, res) => {
  Producto.find({}).then((productos) => {
    res.json(productos);
  });
});


app.use("/", express.static("front"));




app.post("/api/pay", (req, res) => {
  const ids = req.body;
  Producto.find({}).then(productos => {
    const copiaProductos = productos.map(p => ({ ...p.toObject() }));
    ids.forEach(id => {
      const producto = copiaProductos.find(p => p.id == id);

      if (producto.stock > 0) {
        producto.stock--;
        Producto.findByIdAndUpdate(producto._id, { stock: producto.stock }, { new: true }).then(updatedProducto => {
         
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

 


app.get("/sobrenosotros", (req, res) => {
  const filePath = path.join(__dirname, "front", "quienesomos.html");
  res.sendFile(filePath);
});


app.get("/donde", (req, res) => {
  const filePath = path.join(__dirname, "front", "donde.html");
  res.sendFile(filePath);
});







app.listen(port, () => {
  console.log('Example app listening at http://localhost:'+port)
});