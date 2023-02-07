const Router = require('express').Router
const router = new Router()
const { body } = require('express-validator')
const path = require('path')

// controllers
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')
const testController = require('../controllers/testController')
const authController = require('../controllers/authController')
const courseController = require('../controllers/courseController')
const lessonController = require('../controllers/lessonController')
const homeworkController = require('../controllers/homeworkController')

// path
router.post(
    '/register',
    body('name').isLength({ min: 3 }),
    body('email').isLength({ min: 3 }),
    body('password').isLength({ min: 3, max: 32 }),
    authController.registration
)
router.post(
    '/login',
    body('email').isLength({ min: 3 }),
    body('password').isLength({ min: 3, max: 32 }),
    authController.login
)
router.get('/refresh', authController.refresh)

router.post('/test', testController.runTest)
router.post('/get/test', testController.getTest)

// course
router.get('/courses', courseController.getAll)
router.get('/courses/:id', courseController.getCourseById)
router.post('/courses', courseController.create)
router.put('/courses/:id', courseController.update)
router.delete('/courses', courseController.remove)

// lessons
router.get('/lessons', lessonController.getAll)
router.get('/lessons/:id', lessonController.getById)
router.post('/lessons', lessonController.create)
router.put('/lessons/:id', lessonController.update)
router.delete('/lessons', lessonController.remove)

// home-work
router.get('/homework', homeworkController.getAll)
router.get('/homework/:id', homeworkController.getById)
router.post('/homework', homeworkController.create)
router.put('/homework/:id', homeworkController.update)
router.delete('/homework', homeworkController.remove)

router.get('/check/:id', homeworkController.checkLesson)

// send file
router.get('/attachment/:name', (req, res) => {
    const fileName = req.params.name
    res.sendFile(path.join(__dirname, `/../attachment/${fileName}`))
})

module.exports = router
