module.exports = (error, req, resp, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    resp.status(400).send({ error: 'id used is malformed' })
  } else {
    resp.status(500).end()
  }
}
