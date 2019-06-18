import routes from 'src/route/routes';

const next = require('next');
const express = require('express');
// const { createServer } = require('http');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  express()
    .use(handler)
    .listen(3000);
});
