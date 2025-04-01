const express = require('express');
const { reportMissingPerson, getAllMissingPersons, getUserMissingPersons, updateMissingPersonStatus } = require('../controllers/missingPersonController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/report', authenticateToken, reportMissingPerson);
router.get('/user-reports', authenticateToken, getUserMissingPersons);
router.get('/all-reports', authenticateToken, getAllMissingPersons);
router.put('/update-status', authenticateToken, updateMissingPersonStatus);

module.exports = router;
