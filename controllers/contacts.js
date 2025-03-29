const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb(); // Get the database instance
    const result = await db.collection('contacts').find().toArray();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const db = mongodb.getDb(); // Get the database instance
    const contactId = new ObjectId(req.params.id);
    const result = await db.collection('contacts').findOne({ _id: contactId });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createContact = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await db.collection('contacts').insertOne(contact);
    if (response.acknowledged) {
      res.status(201).json({ message: 'Contact created successfully' });
    } else {
      res.status(500).json({ error: 'Failed to create contact' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    const response = await db.collection('contacts').replaceOne({ _id: contactId }, contact);
    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'Contact updated successfully' });
    } else {
      res.status(404).json({ error: 'No changes made or contact not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const contactId = new ObjectId(req.params.id);
    const response = await db.collection('contacts').deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
