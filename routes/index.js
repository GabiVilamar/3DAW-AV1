var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {
  try {
    const results = await global.db.selectDisciplina();
    console.log(results);
    res.render('index', {results});
  }
  catch(error){
    res.redirect('/?erro=' + error);
  }
});

/*GET new page.*/
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Cadastro de Disciplinas', result: {}, action:"/new" });
});  

/*POST new page.*/
router.post('/new', async function(req, res) {
  const id = !req.body.id ? null:parseInt(req.body.id);
  const periodo = !req.body.periodo ? null:parseInt(req.body.periodo);
  const nome = req.body.nome
  const idPreRequisito = !req.body.idPreRequisito ? null:parseInt(req.body.idPreRequisito);
  const creditos = !req.body.creditos ? null:parseInt(req.body.creditos);

  try {
    await global.db.insertDisciplina({id, periodo, nome, idPreRequisito, creditos});
    res.redirect('/?new=true');
  }
  catch(error){
    res.redirect('/?erro=' + error);
  }
});
/*GET edit page. */
router.get('/edit/:id', async function(req, res) {
  const id = parseInt(req.params.id);
  try {
    const result = await global.db.selectOneDisciplina(id);
    res.render('new', {title: 'Edição de Disciplinas', result, action:'/edit/' +id});
  }
  catch(error) {
    res.redirect('/?erro=' + error);
  }
});
/*POST edit page. */
router.post('/edit/:id', async function(req, res) {
  const id = parseInt(req.params.id);
  const periodo = !req.body.periodo ? null:parseInt(req.body.periodo);
  const nome = req.body.nome
  const idPreRequisito = !req.body.idPreRequisito ? null:parseInt(req.body.idPreRequisito);
  const creditos = !req.body.creditos ? null:parseInt(req.body.creditos);

  try {
    await global.db.updateDisciplina(id, {id, periodo, nome, idPreRequisito, creditos});
    res.redirect('/?edit=true');
  }
  catch(error){
    res.redirect('/?erro=' + error);
  }
});  
/*GET delete page.*/
router.get('/delete/:id', async function(req, res) {
  const id = parseInt(req.params.id);

  try {
    await global.db.deleteDisciplina(id);
    res.redirect('/?delete=true');
  }
  catch(error) {
    res.redirect('/?erro=' + error);
  }
})

module.exports = router;