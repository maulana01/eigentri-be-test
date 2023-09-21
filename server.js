/** @format */

const express = require('express');
const bodyParser = require('body-parser');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('docs.yaml');
const app = express();
const port = 4001;

const routes = require('./src/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).json({ status: 200, message: 'Eigen Tri API', version: '1.0' }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/books', routes.books);
app.use('/api/v1/members', routes.members);
app.listen(port, () => console.log(`listening on port ${port}`));
