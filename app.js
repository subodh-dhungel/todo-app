const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 2000;
const path = require('path');
const methodOverride = require('method-override')
const ejs = require('ejs');
const app = express();

//database connecting
require("./database/connection")
const {todoContentsTable} = require("./database/models/TodoContent")

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));

//for delete method
app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('public', {
  setHeaders: function (res, path) {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  },
}));

//array for todo list items which going fetch data from database
let todoItems=[]

app.get('/', async(req, res) => {
  const listItem = await todoContentsTable.findAll();
  console.log(listItem)
  res.render('index.ejs', {
    listItems: listItem
  });
});

app.get('/edit/:id',(req,res)=>{
  let {id} = req.params
  res.render('edit',{id:id})
  res.redirect(`/edit?id=${id}`)
})

app.get('/delete/:id', async(req,res)=>{
  let {id} = req.params
  await todoContentsTable.destroy({
    where: {
      id : id
    }
  })
  res.redirect('/');
})

app.post('/', async(req, res) => {
  let content = req.body.addContent;

  //INSERT QUERY OF CRUD OPERATION
  const listItem = await todoContentsTable.create({
    content: content
  });

  todoItems.push(listItem.content);
  console.log(listItem)
  res.redirect('/');
});

// app.post('/edit', async (req,res)=>{
//   let id = req.query.id
//   let newTask = req.body.editTodo
//   await todoContentsTable.update({content: newTask},{
//     where: {
//       id : id
//     }
//   })
//   res.redirect('/')
// })

app.post('edit?id=$:id', async (req, res) => {
  const { id } = req.params;
  const newTask = req.body.editTodo;
  if (id) {
    await todoContentsTable.update(
      { content: newTask },
      {
        where: {
          id: id,
        },
      }
    );
  }
  res.redirect('/');
});


app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Server running at port: ' + PORT);
  }
});

app.get('/done',(req,res)=>{
  res.send('done tasks')
})