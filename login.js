const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/InventoryMngmt';
//MongoClient.connect( url, (err, database) => {
  //  if(err) return console.log(err)
    //console.log('connected')
//})
var db;
//var MonogCLient = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017/InventoryManagement';
/*MongoClient.connect(url,function(err,database){
    if(err) return console.log(err);
    db=database.db('InventoryMngmt');
    db.collection('login').insertOne({
        username:"aditya",
        password:300,
        gmail:"aditya@gmail.com"
    },function(err,result){
        if(err) return console.log(err);
        console.log("data inserted !!")
    })
});
*/
MongoClient.connect(url,(err,database)=>{
    if(err) console.log(err);
    db=database.db('InventoryMngmt');
    db.collection('login').updateOne(
        {"username" : "srinivas "},
        {$set: {"username":"sandeep","gmail":"sandeep@gmail.com"}},
        (err,res)=>{
        if(err) throw err;
        //console.log(res);
        console.log("data updated");
    })
})



/*   http://ngitone.adobeconnect.com/pqv89rhlmgxa/ */