const express = require("express");
const bodyParser = require('body-parser')
const mysql = require ("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require('bcrypt')
const saltRounds = 10

const app = express();

app.use(express.json());
app.use(cors());
/*app.use(cors({
  origin: ["http:/localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
}));*/
 
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createConnection({
  user:"root",
  host:"localhost",
  password:"1234",
  database:"blog_pokemon",
});

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24
    },
  })
);

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

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({loggedIn: true, user: req.session.user})
  } else {
    res.send({loggedIn: false});
  }
})

//LOGIN
app.post('/login', (req,res) => {
  const username = req.body.username
  const password = req.body.password

  console.log(username)
  console.log(password)

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
              res.send(result)
            } else {
              res.send({ message: "Usuario o contraseña incorrectos!"});
            }
          });
          /*req.session.user = result;
          console.log(req.session.user);
          res.send(result)*/
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

