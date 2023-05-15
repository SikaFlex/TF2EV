const mongoose = require('mongoose');
const url = 'mongodb+srv://pesadiyagb:696913@cluster0.gp9xcoo.mongodb.net/?retryWrites=true&w=majority'

const {model,Schema}=mongoose

mongoose.connect(url)
  .then(() => {
<<<<<<< HEAD
    console.log('La base de datos está conectada mongo');
=======
    console.log('La base de datos está conectada');
>>>>>>> 4755ffff47a58ac471bc47f042812a99f7d892b2
  })
  .catch((err) => {
    console.error(err);
  });




 



