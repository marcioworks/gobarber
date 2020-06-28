const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const authMiddleware = require('./app/middleware/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const FileController = require('./app/controllers/FileController');
const ProviderController = require('./app/controllers/ProviderController');

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.get('/providers', authMiddleware, ProviderController.index);

routes.post('/session', SessionController.store);

routes.post('/files', upload.single('file'), FileController.store);

module.exports = routes;
