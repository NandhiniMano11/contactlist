var mongoose = require( 'mongoose' ); 

mongoose.connect('mongodb+srv://custom_todo:todo123@cluster0.smisz.mongodb.net/demo?retryWrites=true&w=majority', 
{
useUnifiedTopology: true,
useNewUrlParser: true}) 

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open');
  console.log('http://localhost:4000/api-docs');
}); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});
