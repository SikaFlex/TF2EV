require('./mongodb')
const express = require("express");
const bodyParser= require("body-parser");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(bodyParser.urlencoded({extends:true}));


let Producto=require('./models/productos')



//Stock de productos


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
            console.log('Producto actualizado:', updatedProducto); 
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

