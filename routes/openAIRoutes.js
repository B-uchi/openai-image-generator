const express = require('express');
const { generateimage } = require('../components/openaicontroller');
const router = express.Router();

router.post('/generateimage', generateimage);

module.exports = router;