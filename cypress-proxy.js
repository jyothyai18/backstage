const http = require('http');

http.createServer((req, res) => {
  const proxy = http.request({
    hostname: 'host.docker.internal',
    port: 3000,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: 'localhost:3000' },
  }, response => {
    res.writeHead(response.statusCode, response.headers);
    response.pipe(res);
  });

  proxy.on('error', () => {
    res.writeHead(502);
    res.end('Bad Gateway');
  });

  req.pipe(proxy);
}).listen(3001, '127.0.0.1');