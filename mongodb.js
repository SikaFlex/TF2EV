const mongoose = require('mongoose');
const url = 'mongodb+srv://pesadiyagb:696913@cluster0.gp9xcoo.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url)
  .then(() => {
    console.log('La base de datos está conectada');
  })
  .catch((err) => {
    console.error(err);
  });




 



