const express = require('express');
const { url } = require('inspector');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./model/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//app.use(function(req,res,next){
  //  console.log('middleware1 called');
    //next();
//});
app.use(express.urlencoded());
app.use(express.static('assets'));
var contactLlist = [
    {
        name: "Ankita",
        phone: "7633023490"
    },
    {
        name: "Sagar",
        phone: "7991383871"
    }

]
app.get('/',function(req,res){

Contact.find({},function(err,contacts){
    if (err){
        console.log('error in searching contacts from db');
        return;
    }
    return res.render('home', {
        title: "Contact List",
        contact_list: contacts
    });
});
    
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "Let us play"
    })
});

app.post('/create-contact',function(req,res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('Error in creating contact');
    return;}
    console.log('*****',newContact);
    return res.redirect('back');
    })
});
app.get('/delete-contact', function(req,res){
    let id = req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if (err){
            console.log('Error in deleting');
            return;
        }
        return res.redirect('back');
    });

});

app.listen(port,function(err){
    if (err){
        console.log('Error is running on the server',err);
    }
    console.log('My express server is running on my port',port);
});