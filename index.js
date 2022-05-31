// const http = require("http");

/* const app = http.createServer((req, resp) => {
    resp.writeHead(200, { 'Content-Type': 'application/json'})
    resp.end(JSON.stringify(notes))
}) */

/* const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`); */
require('./mongo')

const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware')
const app = express()

const Note = require('./models/Note')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

app.use(cors())
app.use(express.json())

app.use(logger)

/* let notes = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false
  },
  {
    userId: 1,
    id: 3,
    title: 'cambio',
    completed: true
  }
] */

app.get('/', (req, resp) => {
  resp.send('<h1>Home page</h1>')
})
app.get('/notes', (req, resp) => {
  Note.find({}).then(notes => {
    resp.json(notes)
  })
})
app.get('/notes/:id', (req, resp, next) => {
  const id = req.params.id //* en params estan todos los obj de la ruta

  Note.findById(id).then(note => {
    if (note) {
      resp.json(note)
    } else {
      resp.status(404).end()
    }
  }).catch(err => {
    next(err)
  })
})

app.put('/notes/:id', (req, resp, next) => {
  const id = req.params.id
  const note = req.body

  const newNoteInfo = {
    title: note.title,
    completed: note.completed
  }
  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => { //* es el pasado... lo que encontro por id xd. para eso se agrega el 3er parametro
      resp.json(result)
    })
})

app.delete('/notes/:id', (req, resp, next) => {
  const id = req.params.id

  Note.findByIdAndDelete(id)
    .then(() => resp.status(204).end())
    .catch(error => next(error))
})

app.post('/notes', (req, resp, next) => {
  const note = req.body

  if (!note || !note.title) {
    return resp.status(400).json(
      {
        error: 'Note title is missing'
      }
    )
  }

  const newNote = new Note({
    title: note.title,
    completed: typeof note.completed !== 'undefined' ? note.completed : false
  })

  newNote.save()
    .then(savedNote => { resp.json(savedNote) })
    .catch(error => next(error))
  /* const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    title: note.title,
    completed: typeof note.completed !== 'undefined' ? note.completed : false
  }

  // notes = [...notes, newNote]
  notes = notes.concat(newNote)

  resp.status(201).json(newNote)
})

app.use((req, resp) => {
  resp.status(404).json({
    error: 'Not Found. Using logger'
  }) */
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001
// https://intense-wildwood-93811.herokuapp.com/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
