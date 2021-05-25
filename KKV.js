 
const ConstDefine= require("./ConstDefine.js");

//const Const_Customer="c";//table name
//const Const_IP="t";//table name
//const Const_SecretRoute="Grapetreetown306__";
//const Const_TimeOut=60;//second default 600
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
  if (err) throw err;  
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
KKV.prototype.del_ = function(key){

  dbRedis.del(key);
  var sqlString="DELETE from "+ConstDefine.Const_Customer+" where keyString='"+key+"'";
  console.log(sqlString);
  dbMysql.query(sqlString, function (err, result) {
  
    if (err) throw err;
    
  });

}
KKV.prototype.set_=function(key,value,callbackFunction){
  
  dbRedis.get(ConstDefine.Const_Customer+"_"+key, function(err, reply) {
    // reply is null when the key is missing
    dbRedis.set(Const_Customer+"_"+key,value);
    var sqlString="";
    console.log("!"+reply+"!");
    if((reply==null)||(reply=="")){
        sqlString="INSERT INTO "+ConstDefine.Const_Customer+" (keyString, valueString) VALUES ('"+key+"', '"+ value+"')";
    }else{
        sqlString="UPDATE "+ConstDefine.Const_Customer+" SET  valueString = '"+value+"' WHERE keyString = '"+key+"'";
    }
    dbMysql.query(sqlString, function (err, result) {
       if (err) throw err;
    
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
KKV.prototype.get_=async function(key,callbackFunction){
   
  return await dbRedis.get(ConstDefine.Const_Customer+"_"+key, function(err, reply) {
    // reply is null when the key is missing
    if(reply==null){
      sqlString="select * from customer where keyString='"+key+"'"; 
      dbMysql.query(sqlString, function (err,  result) {
        if (err) throw err;
        if((result==null)||(result="")){
          return callbackFunction(null);
        }else{
          dbRedis.set(ConstDefine.Const_Customer+" "+key,result);
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
		sqlString="select * from customer where keyString='"+key+"'"; 
		dbMysql.query(sqlString, function (err,  result) {
		  if (err) throw err;
		  if((result==null)||(result="")){
			return callbackFunction(null);
		  }else{
			dbRedis.set(ConstDefine.Const_Customer+" "+key,"1");
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
	  dbRedis.set(Const_Customer+"_"+key,"1");
	  var sqlString="";
	  console.log("!"+reply+"!");
	  if((reply==null)||(reply=="")){
		  sqlString="INSERT INTO "+ConstDefine.Const_Customer+" (keyString, valueString) VALUES ('"+key+"', '"+ value+"')";
	  }else{
		  sqlString="UPDATE "+ConstDefine.Const_Customer+" SET  valueString = '"+value+"' WHERE keyString = '"+key+"'";
	  }
	  dbMysql.query(sqlString, function (err, result) {
		 if (err) throw err;
	  
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


module.exports = KKV;






/*
var mysql = require('mysql');
var redis = require("redis");
//---------------------------------------------------
var dbMysql = mysql.createConnection( SQLOptions);
dbMysql.connect(function(err) {  
  if (err) throw err;  
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
KKV.prototype.del_ = function(key){

  dbRedis.del(key);
  var sqlString="DELETE from "+Const_Customer+" where keyString='"+key+"'";
  console.log(sqlString);
  dbMysql.query(sqlString, function (err, result) {
  
    if (err) throw err;
    
  });

}
KKV.prototype.set_=function(key,value,callbackFunction){
  
  dbRedis.get(Const_Customer+"_"+key, function(err, reply) {
    // reply is null when the key is missing
    dbRedis.set(Const_Customer+"_"+key,value);
    var sqlString="";
    console.log("!"+reply+"!");
    if((reply==null)||(reply=="")){
        sqlString="INSERT INTO "+Const_Customer+" (keyString, valueString) VALUES ('"+key+"', '"+ value+"')";
    }else{
        sqlString="UPDATE "+Const_Customer+" SET  valueString = '"+value+"' WHERE keyString = '"+key+"'";
    }
    dbMysql.query(sqlString, function (err, result) {
       if (err) throw err;
    
     });
     //---------------------------------------------------
     return callbackFunction();
  });
}
KKV.prototype.get_=async function(key,callbackFunction){
   
  return await dbRedis.get(Const_Customer+"_"+key, function(err, reply) {
    // reply is null when the key is missing
    if(reply==null){
      sqlString="select * from customer where keyString='"+key+"'"; 
      dbMysql.query(sqlString, function (err,  result) {
        if (err) throw err;
        if((result==null)||(result="")){
          return callbackFunction(null);
        }else{
          dbRedis.set(Const_Customer+" "+key,result);
          return callbackFunction(result);
        }
      });
    }else{
      return callbackFunction(reply);
    }
  });
 
}

KKV.prototype.set=function(key,value,callbackFunction){
 
  var v=false;
  dbRedis.set(ConstDefine.Const_IP+"_"+key,value);
  return callbackFunction();
  
 
}
 
KKV.prototype.get=async function(key,callbackFunction){
   
  return await dbRedis.get("ip_"+key, function(err, reply) {
    // reply is null when the key is missing
    if(reply==null){

       dbRedis.set(ConstDefine.Const_IP+"_"+key,"reply");
       return callbackFunction(null);
         
    }else{
      return callbackFunction("reply");
    }
  });
}



*/


//---------------------------------------------------------------------------------------------
 
exports.KKV = KKV;









 
//------------------------------------------------------------------------
/*
var mysql = require('mysql');
const redis = require("redis");
//---------------------------------------------------
 var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Grapetreetown306"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
const client = redis.createClient();
client.on("error", function(error) {
  console.error(error);
});
client.set("key123", "value", redis.print);
console.log(client.get("key123", redis.print));



create table customerList( key VARCHAR(8) NOT NULL, value VARCHAR(8) NOT NULL, PRIMARY KEY ( key ));

CREATE TABLE customerList (key VARCHAR(8) NOT NULL PRIMARY KEY, value VARCHAR(8) NOT NULL)
UPDATE customerList SET  Value = '' WHERE key = ''
INSERT INTO customerList (keyString, valueString) VALUES (value1, value2);
select * from customerList where keyString='key' count 1; 
*/