const express = require('express');
const router = express.Router();
const mongodb = require('../data/database');
const contactsController = require('../controllers/contacts');


// Contact routes
router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;