const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { isAuthenticated } = require('../middlewares/auth.middleware');

// GET /dashboard
router.get('/', isAuthenticated, dashboardController.showDashboard);

// GET /dashboard/user/edit
router.get('/user/edit', isAuthenticated, dashboardController.showEditUserForm);

// POST /dashboard/user/edit
router.post('/user/edit', isAuthenticated, dashboardController.updateUserProfile);

module.exports = router;
