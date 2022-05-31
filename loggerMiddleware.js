//* middleWare. intercpeta la peticion
//* use significa que cualquier peticion pasara por alla
const logger = (req, resp, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.body)
  console.log('-------------')
  next()
}

module.exports = logger
