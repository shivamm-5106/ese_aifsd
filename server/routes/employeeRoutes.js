const express = require('express');
const router = express.Router();
const {
  getEmployees,
  searchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

// Base route: /api/employees

// Search route must be defined before /:id to avoid "search" being treated as an id
router.get('/search', protect, searchEmployees);

router.route('/')
  .get(protect, getEmployees)
  .post(protect, createEmployee);

router.route('/:id')
  .put(protect, updateEmployee)
  .delete(protect, deleteEmployee);

module.exports = router;
