const http = require('http')
const fs = require('fs')
const host = 'localhost'
const port = 3000

const server = http.createServer(function(request, response) {

  /* Destructure request object to get the url path, method and headers if needed */
  const { headers, method, url } = request;

  console.log('url', url)
  /* Handle GET request for homepage and return index.html with headers */
  if(url === '/') {
    fs.readFile(`./public/index.html`, function(error, data) {
      if(error) {
        response.writeHead(404)
        response.write('404 Not Found')
        console.log('throw error ', error)
      }
      else {
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.write(data)
      }
      response.end()
    })
  }
  /* handle GET request for image and return image.jpg with Content-Type: image/jpeg header */
  else {
    fs.readFile(`./public${url}`, function(error, data) {
      if(error) {
        response.writeHead(404)
        response.write('404 Not Found')
        console.log('throw error ', error)
      }
      else {
        response.writeHead(200, {'Content-Type': 'image/jpeg'})
        response.write(data)
      }
      response.end()
    })
  }
})

/* Start server on port 3000 */
server.listen(port, function(error) {
  if(error) {
    console.log('Throw error: something went wrong', error)
  } else {
    console.log(`Server is listening at http://${host}/${port}`)
  }
})