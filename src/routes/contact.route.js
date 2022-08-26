module.exports = app => {
    const contacts = require("../controllers/contact.controller");
  
    var router = require("express").Router();

    router.post('/mobile', contacts.findByMobile)
  
    // Retrieve all phone numbers
    router.get("/", contacts.findAll);
  
  
    // Retrieve a single phone number with id
    router.get("/:id", contacts.findOne);
  
    app.use('/api/contacts', router);
  };