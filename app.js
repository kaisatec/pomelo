//const ConstDefine= require("./ConstDefine.js");

 
var ConstDefine={
  Const_Set:"s",//table name
 Const_Customer:"c",//table name
 Const_IP:"t",//table name
 Const_SecretRoute:"Grapetreetown306__",
 Const_TimeOut:60//second default 600
};
//var KKV= require('./KKV.js');

//---------------------------------------------------redis or tidis
var RedisOptions={
  hostName: "143.110.151.236",//"localhost",//"192.168.183.193",// "localhost",//"192.168.0.101",//
   
  port:   "6379",
  password: "GrapeTreeTown120103__R"//"Grapetreetown306"
};
//---------------------------------------------------
var SQLOptions={
    host: "143.110.151.236",//"localhost",//192.168.0.101
    port:  "3306",
    database:"customer",
    user:"clientremote",//"root",//"clientremote",// "root",
    password:"GrapeTreeTown120103__R"//"GrapetreeTown306__R"// "Grapetreetown306"
  };
//-------------------------------------------------------Database




//-------------------------------------------------------Database
var mysql = require('mysql');
var redis = require("redis");
//---------------------------------------------------
var dbMysql = mysql.createConnection( SQLOptions);
dbMysql.connect(function(err) {  
  
  if (err) //throw err; 
  console.log("error:"+err);

  console.log("mysql Connected!");  
}); 


dbMysql.on('error', function (err) {
  console.log('Error ' + err);
}); 

dbMysql.on('connect', function() {
  console.log('Connected to dbMysql');
});
//----------------------------------------------------
//var dbRedis = redis.createClient();
var dbRedis = redis.createClient(RedisOptions.port, RedisOptions.hostName, {no_ready_check: true});
console.log('connect to redis');
if(RedisOptions.password.length>0){

  dbRedis.on('error', function (err) {
    console.log('Error ' + err);
  }); 
  dbRedis.on('connect', function() {
    console.log('Redis Connected!');
  });

  dbRedis.auth(RedisOptions.password, function (err) {
    if (err)  {
      console.log('redis password error ' + err);
    }
    console.log('redis password ok');
  });
}else{

  dbRedis.on('error', function (err) {
    console.log('Error ' + err);
  }); 

  dbRedis.on('connect', function() {
    console.log('Redis Connected!');
  });
}
//-------------------------------------------------------KKV
function KKV(){
}
//set set_ set_s
KKV.prototype.del_ = function(key,callbackFunction){

  //dbRedis.del(key);
  //var sqlString="DELETE from "+ConstDefine.Const_Customer+" where keyString='"+key+"'";
  var sqlString="DELETE from c where keyString='"+key+"'";
  console.log(sqlString);
   
  dbRedis.del(ConstDefine.Const_Customer+"_"+key);

 
    console.log("redis del ok");
    dbMysql.query(sqlString, function (err, result) {
  
      if (err)// throw err;
      {
        console.log("error:"+err);
      }
    
    });

   
 
     //---------------------------------------------------
     return callbackFunction();
  

}
KKV.prototype.set_=function(key,value,callbackFunction){
  
  dbRedis.get(ConstDefine.Const_Customer+"_"+key, function(err, reply) {
    // reply is null when the key is missing
    dbRedis.set(ConstDefine.Const_Customer+"_"+key,value);
    var sqlString="";
    //console.log("!="+reply+"!");
    if((reply==null)||(reply=="")){
        //sqlString="INSERT INTO "+ConstDefine.Const_Customer+" (keyString, valueString) VALUES ('"+key+"', '"+ value+"')";
        sqlString="INSERT INTO c (keyString, valueString) VALUES ('"+key+"', '"+ value+"')";
        
    }else{
        //sqlString="UPDATE "+ConstDefine.Const_Customer+" SET  valueString = '"+value+"' WHERE keyString = '"+key+"'";
        sqlString="UPDATE c SET  valueString = '"+value+"' WHERE keyString = '"+key+"'";
        
    }
    dbMysql.query(sqlString, function (err, result) {
       if (err)// throw err;
       console.log("error:"+err);
    
     });
     //---------------------------------------------------
     return callbackFunction();
  });
}
/*
KKV.prototype.setTimeout=function (key, timeout) {
 
	if (typeof val === 'object') {
	 val = JSON.stringify(val)
	}
	dbRedis.set('t_'+key, val);
	dbRedis.expire('t_'+key, timeout);
}
*/
KKV.prototype.jsonParser=function (stringValue) {

  var string = JSON.stringify(stringValue);
  var objectValue = JSON.parse(string);
  return objectValue['keyString'];
}
KKV.prototype.get_=async function(key,callbackFunction){
   
  return await dbRedis.get(ConstDefine.Const_Customer+"_"+key, function(err, reply) {
    // reply is null when the key is missing
    if(reply==null){
      //sqlString="select * from customer where keyString='"+key+"'"; 
      sqlString="select * from c where keyString='"+key+"'"; 
      dbMysql.query(sqlString, function (err,  result) {
        if (err)// throw err;
        console.log("error:"+err);

        if((result==null)||(result="")){
          return callbackFunction(null);
        }else{
          var a=result[0];
          dbRedis.set(ConstDefine.Const_Customer+"_"+key, this.jsonParser(result));
          return callbackFunction(result);
        }
      });
    }else{
      return callbackFunction(reply);
    }
  });
 
}
 
KKV.prototype.get_s=async function(key,callbackFunction){
   
	return await dbRedis.get(ConstDefine.Const_Customer+"_"+key, function(err, reply) {
	  // reply is null when the key is missing
	  if(reply==null){
    //sqlString="select * from customer where keyString='"+key+"'"; 
    sqlString="select * from c where keyString='"+key+"'"; 
    
		dbMysql.query(sqlString, function (err,  result) {
      
      if (err) //throw err;
      console.log("error:"+err);

		  if((result==null)||(result="")){
			return callbackFunction(null);
		  }else{
			dbRedis.set(ConstDefine.Const_Customer+"_"+key,"1");
			return callbackFunction(result);
		  }
		});
	  }else{
		return callbackFunction(reply);
	  }
	});
   
  }

  KKV.prototype.get_s1=async function(key,callbackFunction){
   
    return await dbRedis.get(ConstDefine.Const_Set+"_"+key, function(err, reply) {
      // reply is null when the key is missing
      if(reply==null){
      //sqlString="select * from customer where keyString='"+key+"'"; 
      sqlString="select * from c where keyString='"+key+"'"; 
      dbMysql.query(sqlString, function (err,  result) {
        
        if (err) //throw err;
        console.log("error:"+err);
        if((result==null)||(result="")){
        return callbackFunction(null);
        }else{
        dbRedis.set(ConstDefine.Const_Set+"_"+key,this.jsonParser(result));
        return callbackFunction(result);
        }
      });
      
      }else{
      
        return callbackFunction(reply);
      }
    });
     
    }

  KKV.prototype.set_s=function(key,value,callbackFunction){
  
	dbRedis.get(ConstDefine.Const_Customer+"_"+key, function(err, reply) {
	  // reply is null when the key is missing
	  dbRedis.set(ConstDefine.Const_Customer+"_"+key,"1");
	  var sqlString="";
	  //console.log("!=="+reply+"!");
	  if((reply==null)||(reply=="")){
      //sqlString="INSERT INTO "+ConstDefine.Const_Customer+" (keyString, valueString) VALUES ('"+key+"', '"+ value+"')";
      sqlString="INSERT INTO c (keyString, valueString) VALUES ('"+key+"', '"+ value+"')";
      
	  }else{
      //sqlString="UPDATE "+ConstDefine.Const_Customer+" SET  valueString = '"+value+"' WHERE keyString = '"+key+"'";
      sqlString="UPDATE c SET  valueString = '"+value+"' WHERE keyString = '"+key+"'";
      
	  }
	  dbMysql.query(sqlString, function (err, result) {

     if (err)// throw err;
     console.log("error:"+err);
	  
	   });
	   //---------------------------------------------------
	   return callbackFunction();
	});
  }
  KKV.prototype.set_s1=function(key,value,callbackFunction){
  
    dbRedis.get(ConstDefine.Const_Set+"_"+key, function(err, reply) {
      // reply is null when the key is missing
      dbRedis.set(ConstDefine.Const_Set+"_"+key,value);
      var sqlString="";
 
      if((reply==null)||(reply=="")){
        //sqlString="INSERT INTO "+ConstDefine.Const_Customer+" (keyString, valueString) VALUES ('"+key+"', '"+ value+"')";
        sqlString="INSERT INTO c (keyString, valueString) VALUES ('"+key+"', '"+ value+"')";
        
      }else{
        //sqlString="UPDATE "+ConstDefine.Const_Customer+" SET  valueString = '"+value+"' WHERE keyString = '"+key+"'";
        sqlString="UPDATE c SET  valueString = '"+value+"' WHERE keyString = '"+key+"'";
      }
      dbMysql.query(sqlString, function (err, result) {
  
       if (err)// throw err;
       console.log("error:"+err);
      
       });
       //---------------------------------------------------
       return callbackFunction();
    });
    }
KKV.prototype.set=function(key,value, callbackFunction){
 
	var v=false;
	dbRedis.set(key,value); 
	return callbackFunction();
  }
   
KKV.prototype.get=async function(key, callbackFunction){
	 
	return await dbRedis.get(key, function(err, reply) {
	  // reply is null when the key is missing
	  if(reply==null){
   
		 return callbackFunction(null);
		   
	  }else{
		return callbackFunction(reply);
	  }
	});
}
 
KKV.prototype.getKeyWithTimeout=async function(key,  ip, timeout, callbackFunction){
   
  return await dbRedis.get(ConstDefine.Const_IP+"_"+key, function(err, reply) {
    // reply is null when the key is missing
    if(reply==null){

	   dbRedis.set(ConstDefine.Const_IP+"_"+key,ip);
	   dbRedis.expire(ConstDefine.Const_IP+"_"+key, timeout);
       return callbackFunction("y");
         
    }else{
	
		if(ip==reply){
		   dbRedis.expire(ConstDefine.Const_IP+"_"+key, timeout);
           return callbackFunction("y");
		}
	    else{

			return callbackFunction("n");
		}
         
    }
  });
}

var kv = new KKV();
 
//var kv = new KKV.KKV();
var encodeString="12345678";
//---------------------------------------------
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
//---------------------------------------------app
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//---------------------------------------------------------paypal
var IPNController= require('./ipn.ctrl.js');
 
//app.post("/customer989/ipn",  IPNController.runIt(function(result){
app.get("/"+ConstDefine.Const_SecretRoute+"/ipn",   function(result){
 
  IPNController.runIt();
  
  switch(result){

    case Const_PaypalWebAccept:{
 
      break;
    }
 
    case Const_PaypalSubscriptionPayment:{
 
      break;
    }
    case Const_PaypalSubscriptionSignUp:{
 
      break;
    }
    case Const_PaypalSubscriptionCancel:{
 
      break;
    }
    case Const_PaypalSubscriptionEot:{
 
      break;
    }
    case Const_PaypalErrorValidatingIPN:{
 
      break;
    }
    case Const_PaypalProcessError:{
 
      break;
    }
    case Const_PaypalRecurringPaymentSuspended:{
 
      break;
    }
    case Const_PaypalrecurringPaymentSuspendedDueToMaxFailedPayment:{
 
      break;
    }
    case Const_PaypalUnhandledTransactionType:{
 
      break;
    }
    default:{

    }
  }

//}));
});
 
//------------------------------------------------------------------------------------
app.get("/:id", function (req, res) {

	var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
		   req.connection.remoteAddress || 
		   req.socket.remoteAddress || 
		   req.connection.socket.remoteAddress;

	//-----------------------------------------------------------------------------	 
	let user_id = req.params.id;
	if (!user_id) {
		return res
		.status(400)
		.send({ e: "t", i:"?"});// message: "Please provide user_id" });
	}
	if(user_id.length>8){
  
		return res
		.status(400)
		.send({ e: "t", i:"-"});// message: "long user_id" });
	   
	}else if(user_id.length<8){

		return res
		.status(400)
		.send({ e: "t", i:"|"});// message: "short user_id" });

	}else{ //00101000 f9B 71N       8rB91019
		var c1=user_id[2];
		var c2=user_id[4];
		if(((c1=='f')||(c1=='9')||(c1=='B'))&&((c2=='7')||(c2=='1')||(c2=='N'))){

		}else{

			return res
			.status(400)
			.send({ e: "t", i: "x"});// "wrong user id" });
		}
	}
 
	kv.get_s(user_id,function(result) { //const g=db.get(88888888);

		if (result==""){

		     return res
		     .status(400)
			 .send({ e: "t", i:"x"}); // message: "wrong user id" });

		}
		else{
			

			kv.getKeyWithTimeout(user_id,ip,ConstDefine.Const_TimeOut,function(result){

				if (result=="y")
				   return res.send({ e: "f", i: result});//, message: "users list." });
				else
			       return res.send({ e: "t", i: "#"});//different ip attack


			});

			 
		}

	});
	//-----------------------------------------------------------------------------	
   
	  
});
 
const nodemailer = require("nodemailer");
// async..await is not allowed in global scope, must use a wrapper
async function emailer() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <wangzheng@protonmail.com>', // sender address
    to: "xizhuyi989@gmail.com" ,// wangzheng@hotmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


//app.get("/"+ConstDefine.Const_SecretRoute+"/paypalipn", function (req, res) {

app.get("/"+ConstDefine.Const_SecretRoute+"/paypalipn",   function(result){

 
 
  emailer().catch(console.error);

  return res
  .status(400)
  .send({ e: "t", i: "|" });// "too short user id" });
   
 
});



//---------------------------------------------------------------app
// default route
app.get("/", function (req, res) {

  //emailer().catch(console.error);

	return res.send({ e: "f", i: "o" }); //nothing return 
  });


app.get("/"+ConstDefine.Const_SecretRoute+"/get/:id", function (req, res) {

	  //console.log(req.headers.origin+"!!!!");
	  let key = req.params.id;
	  let value = req.params.value;
	  if (!key) {
		return res
		.status(400)
		.send({ e: "t", i:"?"});// message: "Please provide user_id" });
	  }
	  //------------------------------------------------------
	  if(key.length!=6){//000000
 
			return res
			.status(400)
			.send({ e: "t", i: "x"});// "wrong user id" });
	 
	  }
	  //----------------------------------------------------
  
	  kv.get_s1(key, function(result) { //const g=db.get(88888888);
	
		  return res.send({ e: "f", i: result });//, message: "users list." });
	  
	  });
  
   
});


app.get("/"+ConstDefine.Const_SecretRoute+"/set/:id/:value", function (req, res) {

	  //console.log(req.headers.origin+"!!!!");
	  let key = req.params.id;
	  let value = req.params.value;
	  if (!key) {
		return res
		.status(400)
		.send({ e: "t", i:"?"});// message: "Please provide user_id" });
	  }
	  //------------------------------------------------------
	  if(key.length!=6){//000000
  
		return res
		.status(400)
		.send({ e: "t", i: "x" });// "wrong user id" });
	   
	  } 
	 
	  //----------------------------------------------------
  
	  kv.set_s1(key,value,function() { //const g=db.get(88888888);
	
		  return res.send({ e: "f", i: "o"});//, message: "users list." });
	  
	  });
  
   
});

app.get("/"+ConstDefine.Const_SecretRoute+"/add/:id/:value", function (req, res) {

	  //console.log(req.headers.origin+"!!!!");
	  let key = req.params.id;
	  let value = req.params.value;
	  if (!key) {
		return res
		.status(400)
		.send({ e: "t", i:"?"});// message: "Please provide user_id" });
	  }
	  //------------------------------------------------------
	  if(key.length>8){
  
		return res
		.status(400)
		.send({ e: "t", i: "-" });// "too long user id" });
	   
	  }else if(key.length<8){
  
		return res
		.status(400)
		.send({ e: "t", i: "|" });// "too short user id" });
	   
	  }else {

		var c1=key[2];
		var c2=key[4];
		if(((c1=='f')||(c1=='9')||(c1=='B'))&&((c2=='7')||(c2=='1')||(c2=='N'))){

		}else{

			return res
			.status(400)
			.send({ e: "t", i: "x"});// "wrong user id" });
		}

	  }
	  //----------------------------------------------------
  
	  kv.set_s(key,value,function() { //const g=db.get(88888888);
	
		  return res.send({ e: "f", i: "o"});//, message: "users list." });
	  
	  });
  
   
});
app.get("/"+ConstDefine.Const_SecretRoute+"/put/:id/:value", function (req, res) {
  
	  //console.log(req.headers.origin+"!!!");
	  //let user = req.body.user;
	  let key = req.params.id;
	  let value = req.params.value;
	  if (!key) {
		  return res
			.status(400)
			.send({ e: "t", i: "?" });
	  }
	//------------------------------------------------------
	if(key.length>8){
  
		return res
		.status(400)
		.send({ e: "t", i: "-" });// "too long user id" });
	   
	}
	if(key.length<8){
  
		return res
		.status(400)
		.send({ e: "t", i: "|" });// "too short user id" });
	   
	}
	kv.set_s(key,value,function() { //const g=db.get(88888888);
		return res.send({ e: "f", i: "o"
	  });//, message: "users list." });
	});
  
  });
  
app.get("/"+ConstDefine.Const_SecretRoute+"/del/:id", function (req, res) {

	let key = req.params.id;
	let value = req.params.value;
	if (!key) {
	  return res
		.status(400)
		.send({ e: "t", i:"?" });// "Please provide user_id" });
	}
	if(key.length>8){
	  return res
	  .status(400)
	  .send({ e: "t", i: "-" });// "too long user id" });
	}
  kv.del_(key, function() { //const g=db.get(88888888);
	
    return res.send({ e: "f", i: "o"});//, message: "users list." });
  
  });
  
  });

  //----------------------------------------------------------------------
  // set port
  app.listen(process.env.PORT || 80, function () {
	console.log("Node app is running on port 80");
  });
  
   
 
 
 