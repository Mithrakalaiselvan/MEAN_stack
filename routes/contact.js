var express = require('express');
var mongoose = require('mongoose');
var Register = require('../models/register');
var Revenue = require('../models/revenue');
var moment  = require('moment');
var router = express.Router();

/* GET registers listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register/add',function(req,res,next){
	var register = new Register();
		register.fName    =   req.body.firstname;
		register.lName    =   req.body.lastname;
		register.dob      =   req.body.dob;
		register.mobile   =   req.body.mobilenumber;
		register.email    =   req.body.email;
		register.gender   =   req.body.gender;
		register.country  =   req.body.country;
    
		register.save(function(err,contact){
            
            if(err){
            	res.json({'message':'something went wrong with the database'});
            }
            else{

               res.redirect('/view');
            }
		})
});


router.get('/view',function(req,res,next){
	  

      Register.find({},null, {sort: {fName: 1}}, function(err,contacts){

        if(err){
        	res.json({'message':'something went wrong with the database'});
        }
        else{
        	
            res.render('pages/showContacts',{title:'Edit Contacts',message:'success',data:contacts,moment:moment});
            
        }

      })
});


router.get('/getData',function(req,res,next){

       Revenue.find(function(err,revenue){

           
           if(err){
        	res.json({'message':'something went wrong with the database'});
                  }
           else{
            res.json(revenue);
            }

       }) 
})

router.post('/postData',function(req,res,next){
        
        var revenue = new Revenue();
        revenue.year = req.body.year;
        revenue.value = req.body.value;


        revenue.save(function(err,revenue){
            
            if(err){
            	res.json({'message':'something went wrong with the database'});
            }
            else{

               res.send("success");
            }
		})    
})





router.get('/edit/:email_id',function(req,res,next){

	var email = req.params.email_id;
	
	
	Register.findOne({'email':email},function(err,contact){
		if(err){
			return res.json({'message':'something went wrong with the database'});
		}
		if(!contact){
			return res.json({'message':'User is not there !'});
		}
		else{
			var a = contact.dob.toLocaleDateString('en-US');
            return res.json({contact:contact,a:a});
		}
	})
     
})




router.get('/search',function(req,res,next){
 
	var re = new RegExp(req.query.fName,'i');

	Register.find()
	        .or([{'fName': { $regex:re }},{'lName': {$regex:re} },{'email': {$regex:re}}])
	        .exec(function(err,contacts){
                 if(err){
                 	res.send(err);
                 }
                 else {
		            res.render('pages/showContacts',{data:contacts,moment:moment,title:'Edit Contacts',message:'success'});
		        }
	});
});






router.get('/delete',function(req,res,next){
		var email = req.query.email_id;
		console.log(email);
	
	    Register.remove({'email':email},function(err,contact){

		if(err){
			res.send(err);
		}
		else{
			res.redirect('/view');
		}

	})
})






router.post('/update',function(req,res){
    console.log(req.body.Id);
	Register.findOne({'_id':req.body.Id},function(err,contact){
		if(req.body.fName)
			contact.fName = req.body.fName;
		if(req.body.lName)
			contact.lName = req.body.lName;
		if(req.body.dob)
			contact.dob   = req.body.dob;
		if(req.body.mobile)
			contact.mobile = req.body.mobile;
		if(req.body.email)
			contact.email = req.body.email;
		if(req.body.gender1)
			contact.gender = req.body.gender1;
		if(req.body.country)
			contact.country = req.body.country;


		contact.save(function(err,contact){
			if(err){
				res.send(err);
			}
			else{
                res.redirect('/view');
            }
		})

	})
    
});

router.get('/bars',function(req,res){
	res.render('pages/bars');
	console.log("a");
})

module.exports = router;
