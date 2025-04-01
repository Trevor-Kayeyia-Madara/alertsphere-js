const express = require('express');
const { reportCrime, getAllCrimeReports, getUserCrimeReports, updateCrimeStatus } = require('../controllers/crimeController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/report', authenticateToken, reportCrime);
router.get('/user-reports', authenticateToken, getUserCrimeReports);
router.get('/all-reports', authenticateToken, getAllCrimeReports);
router.put('/update-status', authenticateToken, updateCrimeStatus);

module.exports = router;
