const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://ByJuanCho98:Juancho1231*@bootcamp-midu.xzofh.mongodb.net/?retryWrites=true&w=majority'

// conexion a mongo
mongoose.connect(connectionString/* , {
  useNewUrlParser: true,
  useUnifiedTopoly: true,
  useFindAndModify: false,
  useCreateIndex: true
} */)
  .then((value) => {
    console.log('database connected')
  }).catch((err) => {
    console.log(err)
  })

//* read db
/* Note.find()
  .then(result => {
    console.log(result)
    mongoose.connection.close()
  }) */

//* post db
/* const note = new Note({
  title: 'Titulo desde instancia de Note',
  completed: false
})

note.save()
  .then(result => {
    //* objeto que se ha guardado en la db
    console.log(result)
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
  }) */
