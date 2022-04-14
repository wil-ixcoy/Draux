const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  logErrors,
  ormErrorHandler,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = 3000;
app.use(express.json());

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
