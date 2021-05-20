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

async function writeLinkInfo(){
 
    var errorNumber=0;
    var aString1="[core]\r\nrepositoryformatversion = 0\r\nfilemode = false\r\nbare = false\r\nlogallrefupdates = true\r\nsymlinks = false\r\nignorecase = true\r\n[remote \"origin\"]\r\nurl = https://alohabooster:Wangzheng2020__@github.com/alohabooster/alohabooster.git\r\nfetch = +refs/heads/*:refs/remotes/origin/*\r\n[branch \"master\"]\r\nremote = origin\r\nmerge = refs/heads/master";
    var aString2="[core]\r\nrepositoryformatversion = 0\r\nfilemode = false\r\nbare = false\r\nlogallrefupdates = true\r\nsymlinks = false\r\nignorecase = true\r\n[remote \"origin\"]\r\nurl = https://alohabooster:Wangzheng2020__@gitea.com/alohabooster/alohabooster.git\r\nfetch = +refs/heads/*:refs/remotes/origin/*\r\n[branch \"master\"]\r\nremote = origin\r\nmerge = refs/heads/master";
    var aString3="[core]\r\nrepositoryformatversion = 0\r\nfilemode = false\r\nbare = false\r\nlogallrefupdates = true\r\nsymlinks = false\r\nignorecase = true\r\n[remote \"origin\"]\r\nurl = https://alohabooster:Wangzheng2020__@gitlab.com/alohabooster/alohabooster.git\r\nfetch = +refs/heads/*:refs/remotes/origin/*\r\n[branch \"master\"]\r\nremote = origin\r\nmerge = refs/heads/master";
    var aString4="[core]\r\nrepositoryformatversion = 0\r\nfilemode = false\r\nbare = false\r\nlogallrefupdates = true\r\nsymlinks = false\r\nignorecase = true\r\n[remote \"origin\"]\r\nurl = https://alohabooster:Wangzheng2020__@bitbucket.org/alohabooster/alohabooster.git\r\nfetch = +refs/heads/*:refs/remotes/origin/*\r\n[branch \"master\"]\r\nremote = origin\r\nmerge = refs/heads/master";
    
    await fs.writeFile(".git/config", aString1, function (err) { });
    await execProcess("sh command1.sh", function(err, response){// 
            if(!err) {
                console.log('execute ok');errorNumber=0;
                await fs.writeFile(".git/config", aString2, function (err) { });
                await execProcess("sh command1.sh", function(err, response){// 
                if(!err) {console.log('execute ok');errorNumber=0}   
                else {console.log('execute error'+response);errorNumber=1};
                });
            }   
            else {console.log('execute error'+response);errorNumber=1};
        });

    }
    /*
     if(errorNumber==0){

        await fs.writeFile(".git/config", aString2, function (err) { });
        await execProcess("sh command1.sh", function(err, response){// 
            if(!err) {console.log('execute ok');errorNumber=0}   
            else {console.log('execute error'+response);errorNumber=1};
        });

    }
    var aString3="[core]\r\nrepositoryformatversion = 0\r\nfilemode = false\r\nbare = false\r\nlogallrefupdates = true\r\nsymlinks = false\r\nignorecase = true\r\n[remote \"origin\"]\r\nurl = https://alohabooster:Wangzheng2020__@gitlab.com/alohabooster/alohabooster.git\r\nfetch = +refs/heads/*:refs/remotes/origin/*\r\n[branch \"master\"]\r\nremote = origin\r\nmerge = refs/heads/master";
    if(errorNumber==0){

        await fs.writeFile(".git/config", aString3, function (err) { });
        await execProcess("sh command1.sh", function(err, response){// 
            if(!err) {console.log('execute ok');errorNumber=0}   
            else {console.log('execute error'+response);errorNumber=1};
        });

    }
    var aString4="[core]\r\nrepositoryformatversion = 0\r\nfilemode = false\r\nbare = false\r\nlogallrefupdates = true\r\nsymlinks = false\r\nignorecase = true\r\n[remote \"origin\"]\r\nurl = https://alohabooster:Wangzheng2020__@bitbucket.org/alohabooster/alohabooster.git\r\nfetch = +refs/heads/*:refs/remotes/origin/*\r\n[branch \"master\"]\r\nremote = origin\r\nmerge = refs/heads/master";
    if(errorNumber==0){

        await fs.writeFile(".git/config", aString4, function (err) { });
        await execProcess("sh command1.sh", function(err, response){// 
            if(!err) {console.log('execute ok');errorNumber=0}   
            else {console.log('execute error'+response);errorNumber=1};
        });

    }

    */

    
    /*execProcess("sh command1.sh", function(err, response){// 
    if(!err){
	
		console.log('execute ok');
		 
	}else {
			
		console.log('execute error');
			 
	 
});}*/

	 

		 
 
}

 
 
 async function getCall(callbackFunction) {
  
				writeLinkInfo();
		 
				callbackFunction();

 
  
 
}
//----------------------------------------------------------------------
var today = new Date();
var time = today.getFullYear()+'/'+today.getMonth()+'/'+today.getDay()+' '+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();		 
console.log('change on time:'+time.toString());
 
async function startToRun(){
  

	await getCall(function(){});
 

  
 
}
 
startToRun();
 
  