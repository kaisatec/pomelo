//const ConstDefine= require("./ConstDefine.js");

const Const_Customer="c";//table name
const Const_IP="t";//table name
const Const_SecretRoute="Grapetreetown306__";
const Const_TimeOut=60;//second default 600

var KKV= require('./KKV.js');
var kv = new KKV.KKV();


 

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

  emailer().catch(console.error);

	return res.send({ e: "f", i: "." });
  });



app.get("/"+ConstDefine.Const_SecretRoute+"/add/:id/:value", function (req, res) {

	  console.log(req.headers.origin+"!!!!");
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
	
		  return res.send({ e: "t", i: "o"});//, message: "users list." });
	  
	  });
  
   
});
app.get("/"+ConstDefine.Const_SecretRoute+"/put/:id/:value", function (req, res) {
  
	  console.log(req.headers.origin+"!!!");
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
		return res.send({ e: "t", i: "o"
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
	kv.del_(key);
  
  });

  //----------------------------------------------------------------------
  // set port
  app.listen(process.env.PORT || 80, function () {
	console.log("Node app is running on port 80");
  });
  
  
/*
// default route
app.get("/", function (req, res) {
  return res.send({ e: true, i: "-" });
});
app.get("/encode/:id", function (req, res) {
	let user_id = req.params.id;
	if (!user_id) {
		return res
		  .status(400)
		  .send({ error: true, message: "Please provide user_id" });
	  }
	encodeString=user_id;
	return res.send({ e: true, i: encodeString });
  });
//------------------------------------------------------------------------------------
app.get("/:id", function (req, res) {//app.get("/customer/get/:id", function (req, res) {

	//console.log(req.headers.origin+"!!!");
	//console.log(req+"!"); 
	let user_id = req.params.id;
	if (!user_id) {
		return res
		  .status(400)
		  .send({ error: true, message: "Please provide user_id" });
	  }
	if(user_id.length>8){

    return res
		  .status(400)
		  .send({ error: true, message: "too long user id" });
	 
  }

  var ip="121.0.0.1";//req.params.ip;
  
  var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress
 
	kv.get_(ip,function(result) { //const g=db.get(88888888);
 
			console.log(result+"!"); 
			//if (error) throw error;
			if(result==null)
			    return res.send({ error: true});//, message: "users list." });
		
		});

       

	 

	///console.log(user_id+"!!!"); 
	kv.get_(user_id,function(result) { //const g=db.get(88888888);
 
		console.log(result+"!"); 
		//if (error) throw error;
	    return res.send({ error: false, data: result});//, message: "users list." });
	
	});

	
});

 

app.get("/customer989/add/:id/:value", function (req, res) {

	///console.log(req.headers.origin+"!!!");
	//let user = req.body.user;
	console.log(req.headers.origin+"!!!");
	let key = req.params.id;
	let value = req.params.value;
	if (!key) {
		return res
		  .status(400)
		  .send({ error: true, message: "Please provide user_id" });
    }
    //------------------------------------------------------
    if(key.length>8){

      return res
        .status(400)
        .send({ error: true, message: "too long user id" });
     
    }
 
    if(value.length>8){

      return res
        .status(400)
        .send({ error: true, message: "too long value" });
     
    }
    //----------------------------------------------------

	kv.set_(key,value,function() { //const g=db.get(88888888);
  
		return res.send({ error: false, message: "ok"});//, message: "users list." });
	
	});
 
	 
});
app.get("/customer989/put/:id/:value", function (req, res) {

	console.log(req.headers.origin+"!!!");
	//let user = req.body.user;
	let key = req.params.id;
	let value = req.params.value;
	if (!key) {
		return res
		  .status(400)
		  .send({ error: true, message: "Please provide user_id" });
    }
  //------------------------------------------------------
  if(key.length>8){

      return res
        .status(400)
        .send({ error: true, message: "too long user id" });
     
  }
  if(value.length>8){

      return res
        .status(400)
        .send({ error: true, message: "too long value" });
     
  }
  kv.set_(key,value,function() { //const g=db.get(88888888);
      return res.send({ error: false, message: "ok"
    });//, message: "users list." });
  });

});

app.get("/customer989/del/:id", function (req, res) {
  //let user = req.body.user;
  let key = req.params.id;
  let value = req.params.value;
  if (!key) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" });
  }
  if(key.length>8){
    return res
    .status(400)
    .send({ error: true, message: "too long user id" });
  }
  kv.del(key);

});

*/
 


//module.exports = app;
//-------------------------------------------------------------------------------------------

  


  /*

/api/customers – GET all customers
/api/customers/:id – GET a customer by Id
/api/customers/add – POST a customer
/api/customers/update/:id – UPDATE a customer by Id
/api/customers/delete/:id – DELETE a customer by Id

/customer/get/id
/customer/add/id/value
/customer/put/id/value
/customer/del/id

/customer/get/id            //heroku

/customer/add/id/value      //
/customer/put/id/value      //
/customer/del/id            //

*/
  /*
kv.set_("88888899","888");
kv.get_("88888899",function(result) { //const g=db.get(88888888);
 
	console.log(result); 

});
*/

// connection configurations
/*
var dbConn = mysql.createConnection({
  host: "localhost",
  port:"",
  user: "root",
  password: "",
  database: "node_js_api",
});
// connect to database
dbConn.connect();
// Retrieve all users
app.get("/users", function (req, res) {
  dbConn.query("SELECT * FROM users", function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: "users list." });
  });
});
// Retrieve user with id
app.get("/user/:id", function (req, res) {
  let user_id = req.params.id;
  if (!user_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" });
  }
  dbConn.query("SELECT * FROM users where id=?", user_id, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({ error: false, data: results[0], message: "users list." });
  });
});
// Add a new user
app.post("/user", function (req, res) {
  let user = req.body.user;
  if (!user) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user" });
  }
  dbConn.query("INSERT INTO users SET ? ", { user: user }, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "New user has been created successfully.",
    });
  });
});
//  Update user with id
app.put("/user", function (req, res) {
  let user_id = req.body.user_id;
  let user = req.body.user;
  if (!user_id || !user) {
    return res
      .status(400)
      .send({ error: user, message: "Please provide user and user_id" });
  }
  dbConn.query(
    "UPDATE users SET user = ? WHERE id = ?",
    [user, user_id],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "user has been updated successfully.",
      });
    }
  );
});
//  Delete user
app.delete("/user", function (req, res) {
  let user_id = req.body.user_id;
  if (!user_id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide user_id" });
  }
  dbConn.query("DELETE FROM users WHERE id = ?", [user_id], function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "User has been updated successfully.",
    });
  });
});
*/

 
 
 