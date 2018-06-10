const express = require('express');
const hbs = require('hbs');
const fs =require('fs');

//so the port will grab the port by using process.env which is object contains all
//all the information regarding our all the environments
const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('viewengine','hbs');
//To serve static files such as images, CSS files,
// and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.static(__dirname+'/public'));

//middleware control who can access and what req,res can pass through
app.use((req,res,next)=>{
   let now = new Date().toString();
   let log = `${now}: ${req.method} ${req.url}`;
   console.log(log);
   fs.appendFile('server.log',log + '\n',(err)=>{
      if(err){
          console.log('Unabl to append to server.log');
      }
      next();
   });
});

app.use((req,res,next)=>{
    res.render('maintenance.hbs',{
        PageTitle: 'Maintenance Page'
    })
});

hbs.registerHelper('screamIt',(text)=>{
   return text.toUpperCase();
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        PageTitle:'Home Page',
        WelcomeMessage:'Welcome to our Home page'
    });
});


app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        PageTitle:'About Page'
    });
});


app.get('/bad',(req,res)=>{
    res.render('home.hbs',{
        errorMessage:'Unable to handle request'
    });
});

app.listen(port,()=>{
   console.log(`Server is up and running at port ${port}`);
});