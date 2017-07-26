const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

const host = 'http://localhost';
const port = process.env.npm_config_port ? process.env.npm_config_port : 3000;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/api/globalsearch/get', (req, res) => {
  // Could filter here on the server, but instead I filter
  // in the React component due to the requirements
  console.log(req.query.searchtext);
  res.setHeader('Content-Type','application/json');
  res.send(JSON.stringify({
    searchResults: [
      {"type":"User","name":"Sam Smith"},
      {"type":"User","name":"Rick Smith"},
      {"type":"User","name":"Adam Jones"},
      {"type":"User","name":"Amy Johnson"},
      {"type":"User","name":"Sara Smith"},
      {"type":"User","name":"April Johns"},
      {"type":"User","name":"Samantha Adams"},
      {"type":"User","name":"George Jetson"},
      {"type":"User","name":"Frank Jordan"},
      {"type":"User","name":"Charlie Adams"},
      {"type":"Group","name":"Mrs. Smith's 1st Grade"},
      {"type":"Group","name":"Mr. Jordan's 2nd Grade"},
      {"type":"Group","name":"Mr. Adam's 7th Grade"},
      {"type":"Group","name":"Mrs. John's 3rd Grade"},
      {"type":"Group","name":"Mr. Smith's 9th Grade"}
    ]
  }));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.info('==> Listening on port %s. Open up %s:%s/ in your browser.', port, host, port);
});
