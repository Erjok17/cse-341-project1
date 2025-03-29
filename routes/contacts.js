const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// Use full paths including /contacts prefix
router.get('/contacts', contactsController.getAll);
router.post('/contacts', contactsController.createContact);
router.get('/contacts/:id', contactsController.getSingle);
router.put('/contacts/:id', contactsController.updateContact);
router.delete('/contacts/:id', contactsController.deleteContact);

module.exports = router;