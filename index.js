/* imports */
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
require('./utils/auth/index');
const {
  logErrors,
  ormErrorHandler,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
/* swagger */
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpect = require('./swagger.config');
/* express */
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

/* use swagger */
app.use(
  '/api/v1/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc(swaggerSpect))
);

/* whitelist */
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

app.use(cors(options));
app.get('/', (req, res) => {
  res.send('Hola desde mi servidor de express');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(
    'Hola desde el servidor de express corriendo en el puerto: ' + port
  );
});
