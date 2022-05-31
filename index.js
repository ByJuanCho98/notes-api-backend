// const http = require("http");

/* const app = http.createServer((req, resp) => {
    resp.writeHead(200, { 'Content-Type': 'application/json'})
    resp.end(JSON.stringify(notes))
}) */

/* const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`); */

const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware')
const app = express()

app.use(cors())
app.use(express.json())

app.use(logger)

let notes = [
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
]

app.get('/', (req, resp) => {
  resp.send('<h1>yoo</h1>')
})
app.get('/notes', (req, resp) => {
  resp.json(notes)
})
app.get('/notes/:id', (req, resp) => {
  const id = req.params.id //* en params estan todos los obj de la ruta
  const note = notes.find(note => note.id === parseInt(id))

  if (note) {
    resp.json(note)
  } else {
    resp.status(404).end()
  }
})

app.delete('/notes/:id', (req, resp) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  resp.status(204).end()
})

app.post('/notes', (req, resp) => {
  const note = req.body
  if (!note || !note.title) {
    return resp.status(400).json(
      {
        error: 'Note title is missing'
      }
    )
  }

  const ids = notes.map(note => note.id)
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
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
