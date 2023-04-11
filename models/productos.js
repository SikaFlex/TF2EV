const mongoose = require("mongoose")
const {Schema,model}=mongoose

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
    
  })

    module.exports=Producto