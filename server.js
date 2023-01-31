const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const api = require('./routes/api')

const app = express();

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use('/api', api) 

const PORT = 3011

app.listen(PORT, () => {
  console.log('Example app listening on port =', PORT);
});