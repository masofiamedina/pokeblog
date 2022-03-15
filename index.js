const express = require("express");
const mysql = require ("mysql");
const cors = require("cors");

const bcrypt = require('bcrypt')
const saltRounds = 10

const app = express();

app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
  user:"root",
  host:"localhost",
  password:"1234",
  database:"blog_pokemon",
});


//REGISTRO
app.post('/register', (req, res) => {

  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  bcrypt.hash(password, saltRounds, (err, hash) => {
    
    if (err) {
      console.log(err)
    }
   
    db.query(
      "INSERT INTO usuarios (username, correo, password, fecha_registro) VALUES (?, ?, ?, NOW())", 
      [username,email,hash], 
      (err,result) => {
        console.log(err);
      }
      );
  })

  
});



//LOGIN
app.post('/login', (req,res) => {
  const username = req.body.username
  const password = req.body.password

  db.query(
    "SELECT * FROM usuarios WHERE username = ?;", 
    username, 
    (err,result) => {
      if(err) {
        res.send({err: err})
      }
      if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              res.send(result);
            } else {
              res.send({ message: "Usuario o contraseña incorrectos!"});
            }
          });
      } else {
          res.send({ message: "El usuario no existe"});
        }
    }
  );
});


//NUEVO POST
app.post('/insert', (req, res) => {

  const titulo = req.body.titulo
  const content = req.body.content
  const cover = req.body.cover

  const sqlInsert = "INSERT INTO posts (titulo_post, cuerpo_post, cover_post, fecha_post) VALUES (?, ?, ?, NOW())"
  db.query(sqlInsert, [titulo,content,cover], (err, result)=> {
    console.log(result);
  });
});

//MOSTRAR LOS POSTS
app.get('/get', (req, res) => {
  const sqlSelect = 
  "SELECT * FROM posts";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//ELIMINAR POST
app.delete('/delete/:titulo', (req, res) => {
  const titulo = req.params.titulo
  const sqlDelete =
    "DELETE FROM posts WHERE titulo_post = ?";
  db.query(sqlDelete, titulo, (err, result) => {
    if (err) console.log(err)
  })
})

app.listen(3001, () => {
  console.log("running server");
});

