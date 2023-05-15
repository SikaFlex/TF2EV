const mongoose = require('mongoose');
const url = 'mongodb+srv://pesadiyagb:696913@cluster0.gp9xcoo.mongodb.net/?retryWrites=true&w=majority'

const {model,Schema}=mongoose

mongoose.connect(url)
  .then(() => {
    console.log('La base de datos está conectada mongo');
  })
  .catch((err) => {
    console.error(err);
  });




 



