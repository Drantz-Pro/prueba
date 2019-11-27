const express = require('express')
var router = express.Router()

const pool = require('../database')

router.get('/add' , (req ,res)=>{
    res.render('./links/add')
})

//recive los datos
router.post('/add' , async (req , res)=>{
    const {title , url , description} = req.body;
    const newlink = {
      title,
      url,
      description,
    };
    await pool.query('insert into links set ?',[newlink]);
    req.flash('success',"Link saved successfully");
    res.redirect('/links')
})

router.get('/' , async (req , res )=>{
  const links = await pool.query('select * from links');
  res.render('links/list',{links})
})

router.get('/delete/:id', async (req ,res )=>{

    const { id } = req.params;

    await pool.query('DELETE FROM links WHERE id = ?',[id]);
    req.flash('success',"Links removed successfully")
    res.redirect('/links')
});

router.get('/edit/:id', async (req ,res ) => {

  const {id} = req.params;

  const links = await pool.query('select * from links where id = ?',[id])

  console.log(links)
  res.render('links/edit', {link :links[0]});

})

router.post('/edit/:id' , async (req , res) => {

  const {id} = req.params;
  const { title , description , url} = req.body;

  const newlink= {
    title,
    description,
    url
  }

  await pool.query('UPDATE `links` SET ? where id = ?',[newlink , id])
  req.flash('success',"Links edit Successfully")
  res.redirect('/links')

})

module.exports = router;