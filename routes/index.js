const router = require('koa-router')({
  prefix: '/api'
})

const testController = require('../controllers/test');
const userController = require('../controllers/user');
const todoController = require('../controllers/todo');
const okrController = require('../controllers/okr');
const todoKeyresultController = require('../controllers/todo_keyresult');

router.get('/test', testController.test);
router.post('/login', userController.login);

router.get('/todo', todoController.all);
router.put('/todo', todoController.update);
router.post('/todo', todoController.insert);
router.delete('/todo', todoController.delete);

router.get('/okr', okrController.all);
router.post('/okr', okrController.create);
router.delete('/okr/:id', okrController.delete);
router.get('/okr/editShow/:id', okrController.editShow);
router.put('/okr/edit/:id', okrController.edit);
router.get('/okr/detailShow/:id', okrController.detailShow);
router.put('/okr/completed/:id', okrController.update);
router.put('/okr/detailUpdate/:id', okrController.detailUpdate);
router.delete('/okr/detailDelete/:id', okrController.detailDelete);

router.get('/todo/todoKeyresult', todoKeyresultController.keyresult);
router.post('/todo/todoKeyresult', todoKeyresultController.insert);
router.put('/todo/todoKeyresult', todoKeyresultController.delete);


module.exports = router