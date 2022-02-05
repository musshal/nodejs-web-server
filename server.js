const http = require('http');

const requestListener = (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('X-Powered-By', 'NodeJS');

  // response.statusCode = 200;

  const { method, url } = request;

  if (url === '/') {
    // TODO: (2) logika respons bila url bernilai '/'
    if (method === 'GET') {
      response.statusCode = 200;
      // response bila client menggunakan GET
      response.end(
        JSON.stringify({
          message: 'Ini adalah homepage',
        })
      );
    } else {
      // response bila client tidak menggunakan GET
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses dengan ${method} request`,
        })
      );
    }
  } else if (url == '/about') {
    // TODO: (3) logika respons bilai url bernilai '/about'
    if (method === 'GET') {
      // response bila client menggunakan GET
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: 'Halo! Ini adalah halaman about',
        })
      );
    } else if (method === 'POST') {
      // response bila client menggunakan POST
      let body = [];

      request.on('data', (chunk) => {
        body.push(chunk);
      });

      request.on('end', () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 200;
        response.end(
          JSON.stringify({
            message: `Hai, ${name}! Ini adalah halaman about`,
          })
        );
      });
    } else {
      // response bila client tidak menggunakan GET ataupun POST
      response.statusCode = 400;
      response.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses menggunakan ${method} request`,
        })
      );
    }
  } else {
    // TODO: (1) logika response bila url bukan '/' atau '/about'
    response.statusCode = 404;
    response.end(
      JSON.stringify({
        message: 'Halaman tidak ditemukan!',
      })
    );
  }

  // if (method == 'GET') {
  //   response.end('<h1>Hello!</h1>');
  // }

  // if (method == 'POST') {
  //   let body = [];

  //   request.on('data', (chunk) => {
  //     body.push(chunk);
  //   });

  //   request.on('end', () => {
  //     body = Buffer.concat(body).toString();
  //     const { name } = JSON.parse(body);
  //     response.end(`<h1>Hai, ${name}!</h1>`);
  //   });
  // }

  // if (method == 'PUT') {
  //   response.end('<h1>Bonjour!</h1>');
  // }

  // if (method == 'DELETE') {
  //   response.end('<h1>Salam!</h1>');
  // }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
