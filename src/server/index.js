import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';

import config from './config';
import routes from './routes';
import bluebird from 'bluebird';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

Promise = bluebird;

mongoose.Promise = Promise;

mongoose.connect(config.mongo.host, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongo.host}`);
});

export default app;
