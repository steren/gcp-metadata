// https://cloud.google.com/compute/docs/storing-retrieving-metadata

const express = require('express');
const axios = require('axios');
const app = express();

const axiosInstance = axios.create({
  baseURL: 'http://metadata.google.internal/',
  timeout: 1000,
  headers: {'Metadata-Flavor': 'Google'}
});

app.get('/', (req, res) => {
  let path = req.query.path || 'computeMetadata/v1/project/project-id';
  axiosInstance.get(path).then(response => {
    console.log(response.status)
    console.log(response.data);
    res.send(response.data);
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening on port', port);
});