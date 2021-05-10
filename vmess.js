//const clipboardy = require('clipboardy');

var fs = require('fs');
var exec = require('child_process').exec;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var https = require('https');
var path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');

//------------------------------------------------------
 

/*
function insert(main_string, ins_string, pos) {
	if(typeof(pos) == "undefined") {
	 pos = 0;
   }
	if(typeof(ins_string) == "undefined") {
	 ins_string = '';
   }
	return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
	 }
 

 
var ts="o";
for (var i=0;i<wordStringMax.length;i++){

	 
	var l=ts.length;
	var v=Math.random()*l;
	var s=wordStringMax[i];
	ts.insert ( v, s );
 

}
*/
var vmessListString='';
var bak='';

var isRun=false;
 
//var execProcess = require("./exec_process.js");

var execProcess = function(command, cb){
    var child = exec(command, function(err, stdout, stderr){
        if(err != null){
            return cb(new Error(err), null);
        }else if(typeof(stderr) != "string"){
            return cb(new Error(stderr), null);
        }else{
            return cb(null, stdout);
        }
    });
}

//----------------------------------------------------
var optionsArray = [];
var options0 = {
	index:0,
	host :  'github.com',
	port : 443,
	path : '/Alvin9999/new-pac/wiki/v2ray%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7',
	method : 'GET',
	timeout: 8000
}
var options1 = {
	index :1,
	host :  'awesomeopensource.com',
	port : 443,
	path : '/project/iwxf/free-v2ray?categoryPage=11',///project/iwxf/free-v2ray?categoryPage=11',
	method : 'GET',
	timeout: 8000
}
var options2 = {
	index :2,
	host :  'github.com',
	port : 443,
	path : '/iwxf/free-v2ray',///project/iwxf/free-v2ray?categoryPage=11',
	method : 'GET',
	timeout: 8000
}
var options3 = {
	index :3,
	host :  'github.com',
	port : 443,
	path : '/selierlin/Share-SSR-V2ray/blob/master/1-share-ssr-v2ray.md',///project/iwxf/free-v2ray?categoryPage=11',
	method : 'GET',
	timeout: 8000
}

 
  
var originalAmountArray=[];
var actualAmountArray=[];
var vmessStringArray=[];
//----------------------------------------------------
optionsArray.push(options0);
optionsArray.push(options1);
optionsArray.push(options2);
optionsArray.push(options3);

var valueArray=[9,5,3,8,0,2,7,4,1,6];
var wordStringMax="*SvW)$KPaQ8u:X;'z9>?ZbM1dh3jlR6E(nIpBrVt|w0A25<eC7~!y@of%D#gsJ4qTU={L}[iG]xkmYHc&^_FO+`-N,./";
var globalStep=0;
var d=0;
 
var aaa="888\r\n9999";
console.log(aaa);
console.log(aaa.length);
console.log(aaa[4]=='\r');
 
function encodeString(s){
 
	var returnString="";
 
 
	 
	var t="";
	var t1="";
	var step=0;

	var ttt="";
	 
	for(var i=0;i<s.length;i++){

		var c=s[i];
		if(c=='\r'){
		    i=i+1;
			c=s[i];
			if(c=='\n'){

				returnString=returnString+t+"\r\n";
				if(step==7){
				//	console.log(ttt);
				}
				if(step==8){
				//	console.log(ttt);
				}
				step=step+1;
				console.log("~~~"+step);
				if(step==7){
					//console.log(t1);
					//console.log(t);
				}
				if(step==8){
					//console.log(t1);
				//	console.log(t);
				}
				ttt="";
				t="";
				t1="";
			}

		}else if(c=='\n'){

			returnString=returnString+t+"\n";
			step=step+1;
			console.log("!!!"+step);
			if(step==7){
			//	console.log(t);
			}
			if(step==8){
			//	console.log(t);
			}
			t="";
			
		}else{

			var n = wordStringMax.indexOf(c);
			var k=step % 10;
			var m=valueArray[k] ;
			var p=n+m +i ;
			 
			//if(p>wordStringMax.length-1){ 
			//	p=p % wordStringMax.length;//+1-1;
			//}

			 
			p=p % wordStringMax.length;
			 
			//console.log(p);
			t=t+wordStringMax[p]; 
			t1=t1+c;

		}
 

	}
    
	return returnString;// t;
 
}


function decodeS(s){
 
	var returnString="";
 
	console.log("=======================");
	var t="";
	var t1="";
	var step=0;

	var ttt="";
 
	for(var i=0;i<s.length;i++){

		var c=s[i];

		if(c=='\r'){

			//console.log("=1");

		    i=i+1;
			c=s[i];
			if(c=='\n'){

				returnString=returnString+t+"\r\n";
				step=step+1;
				t="";
				//console.log(ttt);
				ttt="";
			
			}

		}else if(c=='\n'){

			returnString=returnString+t+"\n";
			step=step+1;
			t="";
			//console.log(ttt);
			ttt="";
			
		}else{

			var p = wordStringMax.indexOf(c);
                    var k = step % 10;
                    var m = valueArray[k];
                    var v = 0;
                    while ((v+p) < (m + i  ))
                    {
                        v=v+ wordStringMax.length;
                    }
                    var n =p+v - m - i;
                    if (n == wordStringMax.length) n = 0;
                    t = t + wordStringMax[n];
                    
		 
			//ttt=ttt + " " + n  + " " + k  + " " + m ;
 
		 

		}
 

	}
    
	return returnString;// t;
 
}
 
/*
 
var s4="";
var s3="";
s3="vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogImh0dHBzOi8vZ2l0LmlvL3Y5OTk5IOe+juWbvSIsDQogICJhZGQiOiAidXNhLXByLnR5MTAyNS5tbCIsDQogICJwb3J0IjogIjQ0MyIsDQogICJpZCI6ICJjZGI5YjlmMy0yMTQzLTQ0ZjAtODJjYy0yZGY1MDIyMjBkMzAiLA0KICAiYWlkIjogIjMiLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAibm9uZSIsDQogICJob3N0IjogInVzYS1wci50eTEwMjUubWwiLA0KICAicGF0aCI6ICIvMTM2YzJiMmY0NTNiMy8iLA0KICAidGxzIjogInRscyINCn0=\r\nvmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogImh0dHBzOi8vZ2l0LmlvL3Y5OTk5IOe+juWbvSIsDQogICJhZGQiOiAiMTAzLjEyOS4xOTYuMTU2IiwNCiAgInBvcnQiOiAiODA4MCIsDQogICJpZCI6ICJjNjM1MTA5MC02NmVmLTM5NmQtODhkZS0xMWUyMzQ0NzdiMTQiLA0KICAiYWlkIjogIjIiLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAibm9uZSIsDQogICJob3N0IjogIiIsDQogICJwYXRoIjogIi9jbjJoZyIsDQogICJ0bHMiOiAiIg0KfQ==\r\nvmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogImh0dHBzOi8vZ2l0LmlvL3Y5OTk5IOe+juWbvSIsDQogICJhZGQiOiAiY2RuLWJhaWR1MDAxLnhpYW9ob3V6aS5jbHViIiwNCiAgInBvcnQiOiAiODAiLA0KICAiaWQiOiAiZmFkYmUyZGYtMGFlZC0zMjk5LWJmNWQtYzdmNjlhZDI3ODI0IiwNCiAgImFpZCI6ICIxIiwNCiAgIm5ldCI6ICJ3cyIsDQogICJ0eXBlIjogIm5vbmUiLA0KICAiaG9zdCI6ICIzNjA2MjItd3U3LmJhYnlwYWluYS5jb20iLA0KICAicGF0aCI6ICIvdjJyYXkiLA0KICAidGxzIjogIiINCn0=\r\n";


s4=encodeString(s3 );
  	
console.log(s4); 
console.log("+++++++++++++++++++++++++++++++++++++++");
var s5=decodeS(s4 );
console.log(s5); 
//console.log(s3.length); 
////console.log(s5.length); 
console.log(s5==s3); 

return;
  
*/
 
function decodeHTML(index, htmlString){
	console.log("! "+index);
	switch(index){
		case 0:{//host : 'github.com',
                //port : 443,
                //path : '/Alvin9999/new-pac/wiki/v2ray%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7',
			var tems='';
			var s=htmlString;
			var exitNumber=false;
			var errorNumber=false;
			console.log("0:"+index);
			var tStringArray=[];
			do{
				var x=s.indexOf('vmess://');
				if (x==-1){
					exitNumber=true;
					break;
				}
				var l=s.length; 
				var sub=s.substring(x,l);
			 
				var l1=sub.length;
				var x1=sub.indexOf('</p');
				 
				if(x1==-1){
					//errorNumber=true;
				 
					break;
				}
				var ts=sub.substring(0,x1) ;
				tems=tems+ts +'\r\n'; 
				tStringArray.push(ts +'\r\n');
				s=sub.substring( x1, l1-x1 );
		
			}while (exitNumber==false);

			if(errorNumber==false){
 
				vmessListString=vmessListString + tems; 
				vmessStringArray.push(tStringArray);
				globalStep=globalStep+1;
				//console.log("---------------"+vmessStringArray[vmessStringArray.length-1].length);
			 
			} 
			break;
		}
		case 1:{

			var tems='';
			var s=htmlString;
			var exitNumber=false;
			var errorNumber=false;
		 
			var tStringArray=[];
			var n=0;
			do{
				var x=s.indexOf('vmess://');
				if (x==-1){
					exitNumber=true;
					break;
				}
				var l=s.length; 
				var sub=s.substring(x,l );
				//console.log(sub);
				var x1=sub.indexOf('</code>');
				if(x1==-1){
					errorNumber=true;
					break;
				}
				var tems=sub.substring(0,x1) ;
				break;

			}while (exitNumber==false);
			var h='';
			var ts="";
			for(var i=0;i<tems.length;i++){

				h=tems[i];
				if(h=='\n'){

					tems=tems+ts +'\r\n'; 
					tStringArray.push(ts +'\r\n');
					ts="";

				}else{

					ts =ts+h; 
			 
				}

			}
		 
			//console.log(tems); 
			if(errorNumber==false){
 
				vmessListString=vmessListString+tems; 
				vmessStringArray.push(tStringArray);
				//console.log("---------------"+vmessStringArray[vmessStringArray.length-1].length);
			 
				globalStep=globalStep+1;
			} 
		
			break;
		}

		case 2:{

			var tems='';
			var s=htmlString;
			var exitNumber=false;
			var errorNumber=false;
		 
			var tStringArray=[];
			var n=0;
			do{
				var x=s.indexOf('vmess://');
				if (x==-1){
					exitNumber=true;
					break;
				}
				var l=s.length; 
				var sub=s.substring(x,l );
				//console.log(sub);
				var x1=sub.indexOf('</code>');
				if(x1==-1){
					errorNumber=true;
					break;
				}
				var tems=sub.substring(0,x1) ;
			 
				break;

			}while (exitNumber==false);
		 
			//console.log(tems); 
			if(errorNumber==false){
			 
				vmessListString=vmessListString+tems; 
				globalStep=globalStep+1;
			 
				vmessStringArray.push(tStringArray);
				//console.log("---------------"+vmessStringArray[vmessStringArray.length-1].length);
			 

			} 
		
			break;
		}
		
		case 3:{

			var tems='';
			var s=htmlString;
			var exitNumber=false;
			var errorNumber=false;
 
			var tStringArray=[];
			do{
				var x=s.indexOf('vmess://');
				if (x==-1){
		
					exitNumber=true;
			 
					break;
				}
				var l=s.length; 
				var sub=s.substring(x,l);
			 
				var l1=sub.length;
				var x1=sub.indexOf('</p>');
				 
				if(x1==-1){
					errorNumber=true;
				 
					break;
				}
 
				var ts=sub.substring(0,x1) ;
	 
				tems=tems+ts +'\r\n'; 
				tStringArray.push(ts +'\r\n');
				s=sub.substring( x1, l1-x1 );
		
			}while (exitNumber==false);

			if(errorNumber==false){
			 
				vmessListString=vmessListString+tems; 
				globalStep=globalStep+1;
			 
				vmessStringArray.push(tStringArray);
				//console.log("---------------"+vmessStringArray[vmessStringArray.length-1].length);
			 

			} 
			break;
		}

 


	}


 }
 var fileString0="";
 var aFileArray=[];
 var bFileArray=[];
 var aStringArray=[];
 var bStringArray=[];

 //a.txt b.txt
 var aFileString="";
 var aAmount=0;
 var aString="";
 var bAmount=0;
 var bFileString="";
 var bString="";
  
 //------------------------------------------------------------------------------------------
 //vmessStringArray tStringArray


function formatLinkInfo(){

  

	aFileArray=[];
	bFileArray=[];
	aStringArray=[];
	bStringArray=[];

 

	var tArray=[];
	var tAmount=0;

	for(var j=0;j<vmessStringArray.length;j++){
		tAmount=tAmount+vmessStringArray[j].length;
		//tArray.push()
		for(var i=0;i<vmessStringArray[j].length;i++){
 
			tArray.push(vmessStringArray[j][i]);//tArray[i]+'\r\n';

		}
	}

	var maxA=5;
	var maxB=10;

	var tDivA=Math.floor( tAmount/maxA);
	var tModA=tAmount % maxA;
	if (tModA!=0) tDivA=tDivA+1;

	//-----------------------------------------------------

	var tDivB=Math.floor(tAmount/maxB);
	var tModB=tAmount % maxB;
	if (tModB!=0) tDivB=tDivB+1;
	console.log(tDivA+"|"+tModA+"|"+tDivB+"|"+tModB+"|");


	var amountAFileArray=tDivA;
	var amountBFileArray=tDivB;
 
	//aStringArray.push(vmessListString);
	//bStringArray.push(vmessListString);
 
	for(var j=0;j<tDivA;j++){
		if(tModA!=0){
			var h='';
			if(j==tDivA-1){
				for(var i=0;i<5;i++)
				h=h+tArray[tArray.length-1-i]+'\r\n';
			}else{
				for(var i=0;i<5;i++)
				h=h+tArray[j*5+i]+'\r\n';
			
			}
			aStringArray.push(h);
		}else{

			var h='';
			for(var i=0;i<5;i++)
			h=h+tArray[j*5+i]+'\r\n';
			aStringArray.push(h);
		}	 
	}
 
	for(var j=0;j<tDivA;j++){
		if(tModB!=0){
			var h='';
			if(j==tDivB-1){
				for(var i=0;i<5;i++)
				h=h+tArray[tArray.length-1-i]+'\r\n';
			}else{
				for(var i=0;i<5;i++)
				h=h+tArray[j*5+i]+'\r\n';
			
			}
			bStringArray.push(h);
		}else{

			var h='';
			for(var i=0;i<5;i++)
			h=h+tArray[j*5+i]+'\r\n';
			bStringArray.push(h);
		}	 
	}
	for(var j=0;j<tDivB;j++){
		bStringArray.push("b"+ j.toString()+".txt");
	}

	//-------------------------------------------------------------

	for(var j=0;j<amountAFileArray;j++){
		aFileArray.push("a"+ j.toString()+".txt");
	}
 
	for(var j=0;j<amountBFileArray;j++){
		bFileArray.push("b"+ j.toString()+".txt");
	}
 
 


	aFileString="a.txt";
	aString="{v:\"2021020101\",u:\"https://alohaboost.github.com/a\",a:"+aFileArray.length.toString()+"}";//10
	bFileString="b.txt";
	bString="{v:\"2021020101\",m:{\"https://alohaboost.herokuapp.com/\",\"https://aloha1boost.herokuapp.com/\"},u:\"https://alohaboost.github.com/b\",a:"+bFileArray.length.toString()+"}";//5
	 

 
 }

async function writeLinkInfo(){

	console.log('------>>'+aFileArray.length);
	for(var i=0;i<aFileArray.length;i++){
		//console.log(aStringArray[i]);
	}
	console.log('------>>'+bFileArray.length);
	for(var i=0;i<bFileArray.length;i++){
		//console.log(bStringArray[i]);
	}
	console.log('------');

 

	await fs.writeFile(aFileString, aString, function (err) {console.log("a0");});
	await fs.writeFile(bFileString, bString, function (err) {console.log("b0");});

	for(var i=0;i<aFileArray.length;i++){
		if(i<=10){

			await fs.writeFile(aFileArray[i], encodeString( aStringArray[i]), function (err) {
				//console.log("a"+i.toString());
			});

		}
		 
	}
 
	for(var i=0;i<bFileArray.length;i++){

		if(i<=10){
			await fs.writeFile(bFileArray[i], encodeString( bStringArray[i]), function (err) {
				//console.log("b"+i.toString());
			});
			
		}
 
	}
	/*
  
	execProcess("sh command1.sh", function(err, response){// 
	//execProcess("command1.bat", function(err, response){//sh command1.sh
			if(!err){
				console.log(response);
				//return callbackFunction();
			}else {
				console.log(err);
				//return callbackFunction();
			}
		});

	 

		*/
 
}

 /*
	//await fs.writeFile('url.txt', encodeString( vmessListString), function (err) {console.log("uuuu000");}); 
	//await fs.writeFile(aFileArray[0], encodeString( vmessListString), function (err) {console.log("uuuua");});
	//await fs.writeFile(bFileArray[0], encodeString( vmessListString), function (err) {console.log("uuuub");});
	//await fs.writeFile(aFileArray[0], encodeString( aStringArray[0]), function (err) {console.log("a");});
	//await fs.writeFile(aFileArray[1], encodeString( aStringArray[1]), function (err) {console.log("a");});
	 
	//await fs.writeFile(bFileArray[0], encodeString( bStringArray[0]), function (err) {console.log("a");});
	//await fs.writeFile(bFileArray[1], encodeString( bStringArray[1]), function (err) {console.log("a");});

 */
 
 async function getCall(index, isWriteToFile, callbackFunction) {

	var options=optionsArray[index];
	console.log("get call "+index);
	console.log("--- "+options.host);
    //initialize options values, the value of the method can be changed to POST to make https post calls
    //var userAccessToken = 'CAAKoIMGu5SAyfOyVhugi7cZAaZA1kHzjrdLvtPlndoKzMJ8xZBtR3YV2iX39FSnhxK1lvtfYXO5FvcbK4MVGJphxeYDZC7HJ5FCmhOr2Ys8ZBG9qYNRSfFGuzoeRgwZBdliKvoW6YPl41b8i3dfrTpR98gFAm6qag9vYM2yD0aEv47fnWQWF1SoXRs6PFFrFu5XOe';
    //var appAccessToken = '24562343562751562|hPEXIpDl0CXt0tNJ';
 
	var str = '';
	var decodeString='';
	//making the https get call
	 
    var getReq = https.request(options, function(res) {
        res.on('data', function(data) {
			str += data;
		});
		res.on("end", function() {
			//decodeHTML_Alvin9999(str);
			console.log("---html");
			decodeHTML(index, str);
			console.clear;

			if(isWriteToFile){

				console.log("------formatLinkInfo");
				formatLinkInfo();
				console.log("------writeLinkInfo");
				writeLinkInfo();
				console.log("------callbackFunction");
				callbackFunction();

 

			}else{
			 	return callbackFunction();
			}
 
        });
	 
    });
 

	 
	//end the request
 
 
	getReq.end();

	getReq.on('timeout', () => {
		getReq.abort();
	});
	 
    getReq.on('error', function(err){


		//decodeHTML(index, str);
		console.log("Error: ", err);

		var t=[];
		vmessStringArray.push(t);

		if(isWriteToFile){

			console.log("------formatLinkInfo");
			formatLinkInfo();
			console.log("------writeLinkInfo");
			writeLinkInfo();
			//console.log("------callbackFunction");
		}
		callbackFunction();
         
	}); 

 
}
//----------------------------------------------------------------------
var today = new Date();
var time = today.getFullYear()+'/'+today.getMonth()+'/'+today.getDay()+' '+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();		 
console.log('change on time:'+time.toString());
 
async function startToRun(){
 
	vmessListString='';
	isRun=true;
	globalStep=0;
	vmessStringArray.clear;
	//vmessStringArray[0]=[];//.clear;
	//vmessStringArray[1]=[];
	//vmessStringArray[2]=[];
	//vmessStringArray[3]=[];
 

	await getCall(0, false,function(){});
	await getCall(1, false,function(){});
    await getCall(2, false,function(){});
	await getCall(3, true,function(){


	});

	//setTimeout(function(){ if(isRun) startToRun(); }, 3000);


	 
	const timeoutObj = setTimeout(() => {

		 
    if(isRun) startToRun();
  

	}, 7200);

 
 
	 
	/*
	 

 
	*/

 
}
 
startToRun();
 
 
//-----------------------------------------
// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

//---------------------------------------------------------------
 
app.get('/stop/', async (req, res) => {

	isRun=false;
	res.send({
		status: false,
		message: 'stop'
	});

});
app.get('/github/', async (req, res) => {
	
	        //execProcess.result
			execProcess("command1.bat", function(err, response ){//sh command1.sh
				if(!err){
					console.log(response );
				//	return callbackFunction();
				}else {
					console.log(err);
				//	return callbackFunction();
				}
	 
			});

			res.send({
				status: false,
				message: 'git'
			});

		});

app.post('/upload/', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {

            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
			let a = req.files.file;
			console.log(req.files);
			/*
			for(var i=0;i<req.files.length-1;i++){

				console.log(req.files[i]);

			}
			*/
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
			a.mv('./' + a.name);
			console.log("1");
			console.log(a);
			console.log("2");
		 
			/*
			setInterval(function() {
				execProcess.result("command1.bat", function(err, response ){//sh command1.sh
					if(!err){
						console.log(response );
					//	return callbackFunction();
					}else {
						console.log(err);
					//	return callbackFunction();
					}
	  
				});
			  }, 100);

			  */

			res.send({
				status: false,
				message: 'git'
			});

			/*

			res.send({
				status: true,
				message: 'File is uploaded',
				data: {
					name: a.name,
					mimetype: a.mimetype,
					size: a.size
				}
			});
			*/

             
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
 
//---------------------------------------------------------------app
// default route
app.get("/", function (req, res) {
	return res.send({ e: "f", i: "." });
  });

app.get("/Grapetreetown306/", function (req, res) {

	let user_id = req.params.id;
    res.sendFile(path.join(__dirname, '/',  "url.txt"));
	 
});
  
app.listen(process.env.PORT || 3002, function () {
	console.log("Node app is running on port 3002");
  });
  


//---------------------------------------------------------------------------
/*
 
//var interval = setInterval(getCall(0), 60*1000);
 
//  clearInterval(interval);

 
 
  var http=require('http');
  http.get('https://github.com/Alvin9999/new-pac/wiki/v2ray%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7', function(res){
	   var str = '';
	   console.log('Response is '+res.statusCode);

	   res.on('data', function (chunk) {
			  str += chunk;
		});

	   res.on('end', function () {
			console.log(str);
	   });

 })
*/



			/*
			if(isWriteToFile){

				if (bak=='') { 
					fs.writeFile('url.txt', vmessListString, function (err) {
						//console.log(vmessListString);
						if (err){
							
							console.log(err);
							return callbackFunction();
						}  
						console.log('ok');
						bak=vmessListString; 
					 
					//	execProcess.result("command1.bat", function(err, response){//sh command1.sh
						//	if(!err){
						//		console.log(response);
						//		return callbackFunction();
						//	}else {
						//		console.log(err);
						//		return callbackFunction();
						//	}
					//	});
					 
						return callbackFunction();
	
					  });
	
				}
					
				else{
	
					if(vmessListString!=bak){
				 
						var today = new Date();
						var time = today.getFullYear()+'/'+today.getMonth()+'/'+today.getDay()+' '+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
						
						console.log('change on time:'+time.toString());
						fs.writeFile('url.txt', vmessListString, function (err) {
							if (err) {
								console.log(err);
								return callbackFunction();
							}
							 console.log('ok');
							bak=vmessListString; 
							execProcess.result("command1.bat", function(err, response){//sh command1.sh
								if(!err){
									console.log(response);
									return callbackFunction();
								}else {
									console.log(err);
									return callbackFunction();
								}
							});
	
						  });

					}else{
						var today = new Date();
						var time = today.getFullYear()+'/'+today.getMonth()+'/'+today.getDay()+' '+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
						console.log('same:'+time.toString());
						return callbackFunction();
					 
					}
					 
	
				}
				 


			}else{

				return callbackFunction();
			}



			*/
 
			//return callbackFunction;    

			 
			//clipboardy.writeSync(vmessListString);
			 
			//clipboardy.readSync();




						 
		 
				/*
			 
				fs.writeFile('url.txt', encodeString( vmessListString), function (err) {

					if (err) {
						console.log(err);
						return callbackFunction();
					}
 
 
					return callbackFunction();
 

				});
			 
				 
 
					execProcess("sh command1.sh", function(err, response){// 
					//execProcess("command1.bat", function(err, response){//sh command1.sh
						if(!err){
							console.log(response);
							return callbackFunction();
						}else {
							console.log(err);
							return callbackFunction();
						}
					});

					*/
					 
				//});
 
 
	//getCall(0, true,function(){
	 	//getCall(1,false,function(){
	 		//getCall(2,false,function(){
	 			//getCall(3,true,function(){
			
					//console.log("uuuu1");
					//process.exit(1);
					//const timeoutObj = setTimeout(() => {

						//console.log("uuuu");
						//if(isRun) startToRun();

					 // }, 7200);

 		    	//});
	 		//});
	 	//});
	//});



	/*
 
var s4="";
var s3="";
s3="vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogImh0dHBzOi8vZ2l0LmlvL3Y5OTk5IOe+juWbvSIsDQogICJhZGQiOiAidXNhLXByLnR5MTAyNS5tbCIsDQogICJwb3J0IjogIjQ0MyIsDQogICJpZCI6ICJjZGI5YjlmMy0yMTQzLTQ0ZjAtODJjYy0yZGY1MDIyMjBkMzAiLA0KICAiYWlkIjogIjMiLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAibm9uZSIsDQogICJob3N0IjogInVzYS1wci50eTEwMjUubWwiLA0KICAicGF0aCI6ICIvMTM2YzJiMmY0NTNiMy8iLA0KICAidGxzIjogInRscyINCn0=\r\nvmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogImh0dHBzOi8vZ2l0LmlvL3Y5OTk5IOe+juWbvSIsDQogICJhZGQiOiAiMTAzLjEyOS4xOTYuMTU2IiwNCiAgInBvcnQiOiAiODA4MCIsDQogICJpZCI6ICJjNjM1MTA5MC02NmVmLTM5NmQtODhkZS0xMWUyMzQ0NzdiMTQiLA0KICAiYWlkIjogIjIiLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAibm9uZSIsDQogICJob3N0IjogIiIsDQogICJwYXRoIjogIi9jbjJoZyIsDQogICJ0bHMiOiAiIg0KfQ==\r\nvmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogImh0dHBzOi8vZ2l0LmlvL3Y5OTk5IOe+juWbvSIsDQogICJhZGQiOiAiY2RuLWJhaWR1MDAxLnhpYW9ob3V6aS5jbHViIiwNCiAgInBvcnQiOiAiODAiLA0KICAiaWQiOiAiZmFkYmUyZGYtMGFlZC0zMjk5LWJmNWQtYzdmNjlhZDI3ODI0IiwNCiAgImFpZCI6ICIxIiwNCiAgIm5ldCI6ICJ3cyIsDQogICJ0eXBlIjogIm5vbmUiLA0KICAiaG9zdCI6ICIzNjA2MjItd3U3LmJhYnlwYWluYS5jb20iLA0KICAicGF0aCI6ICIvdjJyYXkiLA0KICAidGxzIjogIiINCn0=\r\n";


s4=encodeString(s3 );
  	
console.log(s4); 
console.log("+++++++++++++++++++++++++++++++++++++++");
var s5=decodeS(s4 );
console.log(s5); 
//console.log(s3.length); 
////console.log(s5.length); 
console.log(s5==s3); 

return;
  
*/
 