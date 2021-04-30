const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient

var db;
var s;

MongoClient.connect('mongodb://localhost:27017/InventoryMngmt',(err,database) =>{
    if(err) return console.log(err)
    db=database.db('InventoryMngmt')
    })

app.set('view engine','ejs')
app.use(express.static('public'))

//Home page
app.get('/',(req,res)=>{
    db.collection('ladies').find().toArray((err,result) =>{
        if(err) return console.log(err)
    res.render('Home.ejs',{data:result})
    })
})

//Add product
app.get('/createProd',(req,res) =>{
        res.render('add.ejs')
    })

app.get('/updateProd',(req,res)=>{
    res.render('update.ejs')
})

app.get('/deleteProd',(req,res)=>{
    res.render('delete.ejs')
})

app.post('/AddData',(req,res)=>{
    db.collection('ladies').save(req.body,(err,result)=>{
        if(err) return console.log(err);
        res.redirect('/');
    })
})

app.post('/delete',(req,res)=>{
    db.collection('ladies').findOneAndDelete(
        {pid:req.body.pid},(err,result)=>{
            if(err) return console.log(err);
            res.redirect('/');
        })
})

/*
app.post('/update',(req,res)=>{
    db.collection('ladies').find().toArray((err,result)=>{
        if(err) return console.log(err)
        for(var i=0;i<result.length;i++){
            if(result[i].pid==req.body.id){
                s=result[i].quantity;
                console.log(s);
                break;
            }
        }
        db.collection('ladies').findOneAndUpdate({pid:req.body.pid},
        {$set:{quantity:s+req.body.quantity}}),(err,res)=>{
            if(err) return console.log(err);
            res.redirect('/');
        })
    })
})*/
app.post('/update',(req,res)=>{
    db.collection('ladies').find().toArray((err,result)=>{
        if(err)
        return console.log(err);
        for(var i=0;i<result.length;i++){
            if(result[i].pid==req.body.id)
            {
                s=result[i].quantity
                break;
            }
           }

       db.collection('ladies').findOneAndUpdate({pid:req.body.id},{
       
       
            $set :{quantity:(parseInt(s)+ parseInt(req.body.quantity)).toString()}},(err,result)=>{
                if (err)
                res.send(err)
               console.log(req.body.id+'stock updated')
               res.redirect('/')
            })
        })
})

app.listen(9000,()=>{
    console.log('Listening on port 9000')
})