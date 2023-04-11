const mongoose = require('mongoose');
const url = 'mongodb+srv://pesadiyagb:696913@cluster0.gp9xcoo.mongodb.net/?retryWrites=true&w=majority'

const {model,Schema}=mongoose

mongoose.connect(url)
  .then(() => {
    console.log('La base de datos está conectada');
  })
  .catch((err) => {
    console.error(err);
  });




  const productSchema = new Schema({
    id:Number,
    nombre: String,
    precio: Number,
    imagen: String,
    stock:Number

  })

  const Producto= new model('Producto',productSchema)
  Producto.find({}).then (result=>{
    console.log(result)
    mongoose.connection.close()
  })

  const newproduct= new Producto({
    id: 5,
    nombre: "Peru",
    precio: 50,
    imagen: "img/Machu.jpg",
    stock: 9,

  })
  newproduct.save()
    .then(result=>{
        console.log(result)
        mongoose.connection.close()
    })
    .catch(err=>{
        console.error(err)
    })