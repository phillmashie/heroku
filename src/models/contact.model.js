const sql = require("../../config/db.config");

// constructor
const Contact = function(contact) {
  this.MSISDN = contact.MSISDN;
  
};

Contact.findById = (SimNumber, result) => {
  sql.query(`SELECT * FROM tblcustomerloyalty WHERE SimNumber = ${SimNumber}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("phone number exist you can continue: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "phone number not found" }, null);
  });
};

Contact.getAll = (MSISDN, result) => {
  let query = "SELECT * FROM tblcustomerloyalty";

  if (MSISDN) {
    query += ` WHERE MSISDN LIKE '%${MSISDN}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Phone Numbers: ", res);
    result(null, res);
  });
};






module.exports = Contact;