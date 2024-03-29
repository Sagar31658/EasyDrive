const express = require('express'),
      morgan = require('morgan'),
      compress = require('compression'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      path = require("path"),
      methodOverride = require('method-override'),
      shopRoutes = require('../routes/shopRoutes'),
      testRouter = require('../routes/testRouter'),
      userRoutes = require('../routes/userRoutes'); 

module.exports = function () {
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    const corsOptions ={
        origin:'*', 
        credentials:true,
        optionSuccessStatus:200
    }
    app.use(cors(corsOptions));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride());

    app.use(express.static("node_modules"));
    app.use('/api', shopRoutes);
    app.use('/user', userRoutes); 
    app.use('/api', testRouter); 
    __dirname = path.resolve();
    if(process.env.NODE_ENV==='production'){
        app.use(express.static(path.join(__dirname, "/frontend/build")));
        app.get('*',(req,res) => {
            res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
        })
    }
    

    return app;
};
