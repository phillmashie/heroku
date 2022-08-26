const { DATE } = require("mysql/lib/protocol/constants/types");
const Contact = require("../models/contact.model");
const sql = require("../../config/db.config");

exports.findByMobile = (req, res) => {

  sql.query("SELECT COUNT(*) AS cnt FROM tblcustomerloyalty WHERE MSISDN = ? " , 
 req.body.MSISDN , function(err , data){
   if(err){
       console.log(err);
   }   
   else{
       if(data[0].cnt > 0){  
             // if phone numberAlready exist 
             res.status(200).send({
              message: `Found ${req.params.SimNumber}.`
            });
       }else{
        res.status(400).send({
          message: `Phone Number is not in the Database ${req.params.SimNumber}.`
        });              
       }
   }
})

}

