require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const api = require('./routes/api')
const cron = require('node-cron');
const starter = require('./starter');
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express();

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use('/api', api) 
app.use(errorMiddleware)

cron.schedule('* * * * *', () =>  {
  starter.run()
  console.log('will execute every minute until stopped');
});

const PORT = process.env.PORT || 3011

app.listen(PORT, () => {
  console.log('Example app listening on port =', PORT);
});