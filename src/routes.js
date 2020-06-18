const { Router } = require('express');

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello World Marcio' }));
module.exports = routes;
