const mongoose = require('mongoose')
const notesSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
})

notesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', notesSchema)

module.exports = Note
