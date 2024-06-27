const express = require('express');
const UsersController=require('../controllers/UsersController');
const TaskController=require('../controllers/TasksController');

const AuthVerification=require('../middlewares/AuthVerifyMiddleware');

const router = express.Router();

router.post('/registration',UsersController.registration);
router.post('/login',UsersController.login);
router.post('/profileUpdate',AuthVerification,UsersController.profileUpdate);
router.get('/getProfileDetails',AuthVerification,UsersController.getProfileDetails);
router.get('/verifyEmail/:email',UsersController.verifyEmail);
router.get('/verifyOTP/:email/:otp',UsersController.verifyOTP);
router.post('/passwordReset',UsersController.passwordReset);


//Task
router.post('/createTask',AuthVerification,TaskController.createTask);
router.get('/AllTasks',AuthVerification,TaskController.AllTasks);
router.get('/readTasks/:id',AuthVerification,TaskController.readTasks);
router.get('/updateTask/:id/:status',AuthVerification,TaskController.updateTask);
router.get('/deleteTask/:id',AuthVerification,TaskController.deleteTask);
router.get('/getTasksByStatus/:status',AuthVerification,TaskController.getTasksByStatus);
router.get('/countTasksByStatus',AuthVerification,TaskController.countTasksByStatus);








module.exports = router;