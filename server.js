//imports
const express = require('express');
const {models, sync, seed} = require('./models');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = process.env.port || 1337;


// Logging middleware
app.use(morgan('dev'));


// Static middleware
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// API routes
app.get('/api/dimension', (req, res, next)=> {
    models.Dim.findAll()
      .then((dimensions) => res.json(dimensions))
      .catch(next)
});

app.get('/api/dimension/:id', (req, res, next)=> {
    models.Dim.findAll({where : {dimension: req.params.id}})
      .then((dimension) => res.json(dimension))
      .catch(next)
});

// For get requests that aren't to an API route, we will send the index.html!
app.get('/', (req, res, next) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Internal server error');
});

//Initialize
const init = async ()=> {
    await sync();
    await seed();
    
    app.listen(port, ()=> {console.log(`Listening on port ${port}`)});
};

init();