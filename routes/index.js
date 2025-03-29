const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
/**
 * @swagger
 * /:
 *   get:
 *     tags: [Hello World]
 *     summary: Returns welcome message
 *     responses:
 *       200:
 *         description: A welcome message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Hello World! - The Contacts API is running"
 */
router.get('/', (req, res) => {
  // Swagger-tags['Hello World']
  res.send('Hello World! - The Contacts API is running');
});


module.exports = router;