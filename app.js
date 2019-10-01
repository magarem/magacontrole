var express = require('express');
const session = require('express-session');
var cors = require('cors')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs');

// AEN code external site search requires
const rp = require('request-promise');
const $ = require('cheerio');

var bodyParser = require('body-parser');

// Load sqlite
const sqlite3 = require('sqlite3').verbose();


// Load Databank
async function db_open(name){
  return await new sqlite3.Database(name, sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to the in-memory SQlite database.');
    // db.run('CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, ean CHAR(20), descricao CHAR(230), pco_venda CHAR(10), unidade CHAR(10), estoque CHAR(5))');
    // //Create vendas table
    // db.run('CREATE TABLE IF NOT EXISTS vendas (id INTEGER PRIMARY KEY AUTOINCREMENT, vendaID CHAR(20), cliente int, subtotal int, desconto int, acrescimo int, total int, dinheiro int, debito int, credito int, totalpago int, troco int)');
    // //Create vendas_itens table
    // db.run('CREATE TABLE IF NOT EXISTS vendas_itens (id INTEGER PRIMARY KEY AUTOINCREMENT, vendaID CHAR(20), vendaItem INTEGER, ean CHAR(10), descricao CHAR(200), unidade CHAR(10), pco_venda CHAR(10), qnt INTEGER, subtotal INTEGER)');
    // //Create fornecedor
    // db.run('CREATE TABLE  IF NOT EXISTS "fornecedores" ("id"	INTEGER PRIMARY KEY AUTOINCREMENT, "nome"	char(50), "tipo"	char(15), "doc"	char(25), "contato"	char(30),"fone"	char(100),"fone2"	TEXT,"email"	char(100),"endereco"	TEXT,"obs"	text)');
    //Create compras
    //db.run('CREATE TABLE IF NOT EXISTS compras (id INTEGER PRIMARY KEY AUTOINCREMENT, fornecedor int, data char(100), tipo char(15), cnpjcpf char(25), contato char(30), fone char(100), email char(100), obs text)');
  });
}

function db_close(){
  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}
function db_populate(){
  for (var i = 0; i < produtos.data.items.length; i++) {
    db.run('INSERT INTO produtos (ean, descricao, pco_venda, unidade, estoque) VALUES (?,?,?,?,?)', [produtos.data.items[i].ean, produtos.data.items[i].descricao, produtos.data.items[i].pco_venda, produtos.data.items[i].unidade, produtos.data.items[i].estoque], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
   }
 }
function eansearch(ean){
   console.log(ean)
   var options = {
       method: 'GET',
       uri: 'https://cosmos.bluesoft.com.br/pesquisar',
       form: {
           q: ean
       }
       // ,
       // json: true // Automatically stringifies the body to JSON
   };
   rp(options)
     .then(function (body) {
         var ret = body.split("<h1 class='page-header'>")[1].split('<img alt="Produto Registrado em Brasil"')[0].trim()
         console.log('ret:', ret);
         return ret
     })
     .catch(function(err){
       console.log(err);
     });
}

const environment = '/prod-api' // '/dev-api' || '/prod-api'
var sess;
// Init app
const app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(cors({
    origin:['http://localhost:3000','http://localhost:9527'],
    methods:['OPTIONS', 'GET','POST', 'PATCH', 'DELETE'],
    credentials: true // enable set cookie
}));


 function authChecker(req, res, next) {
    console.log("-[req.session.owner]--->", req.session.owner);
    console.log("-[req.path.length]--->", req.path.length);

    if (req.session.owner && req.path!='/dev-api/user/login') {
        console.log('>>>>./' + req.session.owner + '.db');
        // var db = db_open('./' + req.session.owner + '.db')
        // var db = await db_open('./' + req.session.owner + '.db');
        // db_open('./' + req.session.owner + '.db').then(function(x){
        //   console.log('>>>>', x);
        //   var db = x
        //
        // })
        var db = new sqlite3.Database('./' + req.session.owner + '.db', sqlite3.OPEN_READWRITE, (err) => {
          if (err) return console.error(err.message);
          console.log('Connected to the in-memory SQlite database.');
          // db.run('CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, ean CHAR(20), descricao CHAR(230), pco_venda CHAR(10), unidade CHAR(10), estoque CHAR(5))');
          // //Create vendas table
          // db.run('CREATE TABLE IF NOT EXISTS vendas (id INTEGER PRIMARY KEY AUTOINCREMENT, vendaID CHAR(20), cliente int, subtotal int, desconto int, acrescimo int, total int, dinheiro int, debito int, credito int, totalpago int, troco int)');
          // //Create vendas_itens table
          // db.run('CREATE TABLE IF NOT EXISTS vendas_itens (id INTEGER PRIMARY KEY AUTOINCREMENT, vendaID CHAR(20), vendaItem INTEGER, ean CHAR(10), descricao CHAR(200), unidade CHAR(10), pco_venda CHAR(10), qnt INTEGER, subtotal INTEGER)');
          // //Create fornecedor
          // db.run('CREATE TABLE  IF NOT EXISTS "fornecedores" ("id"	INTEGER PRIMARY KEY AUTOINCREMENT, "nome"	char(50), "tipo"	char(15), "doc"	char(25), "contato"	char(30),"fone"	char(100),"fone2"	TEXT,"email"	char(100),"endereco"	TEXT,"obs"	text)');
          //Create compras
          //db.run('CREATE TABLE IF NOT EXISTS compras (id INTEGER PRIMARY KEY AUTOINCREMENT, fornecedor int, data char(100), tipo char(15), cnpjcpf char(25), contato char(30), fone char(100), email char(100), obs text)');
          //
          next()
        });

    } else {
      next()
       // res.redirect("http://localhost:9527/#/login")
    }

}

// app.use(authChecker);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get(environment + '/setowner', function (req, res, next) {
   req.session.owner = req.query.owner
   res.send(req.session.owner)
})

app.get(environment + '/getowner', function (req, res, next) {
   res.send(req.session.owner)
})

app.get(environment + '/eansearch', function (req, res, next) {
  var ean = req.query.ean
  var options = {
      method: 'GET',
      uri: 'https://cosmos.bluesoft.com.br/pesquisar',
      form: {
          q: ean
      }
      // ,
      // json: true // Automatically stringifies the body to JSON
  };
  rp(options)
    .then(function (body) {
        var ret = body.split("<h1 class='page-header'>")[1].split('<img alt="Produto Registrado')[0].trim()
        console.log('ret:', ret);
        //ret = {ret: ret}
        if (ret.indexOf('Resultados da Busca')>-1) { ret = ''}
        console.log('eansearch(req.query.ean):', ret);
        res.send(ret)
    })
    .catch(function(err){
      console.log(err);
    });


})

// Begin
app.get('/init', function (req, res, next) {
 res.render('index', {user: 0});
})

////////////////////////////////
// Auth
////////////////////////////////
  app.post(environment + '/setCaixaPosicao', function (req, res, next) {
    let data = req.body.data
    let operacao = req.body.operacao
    let usuario = req.body.usuario
    let valor = req.body.valor
    console.log(data, operacao, usuario, valor);
    db_open('./' + req.session.owner + '.db').then(db => {
      db.run('INSERT INTO caixa_status (data, operacao, usuario, valor) VALUES (?,?,?,?)',
              [data,
               operacao,
               usuario,
               valor],
               function(err) {
                  if (err) return console.log(err.message);
                  // get the last insert id
                  console.log(`A row has been inserted with rowid ${this.lastID}`);
                  res.send(true);
               }
      );
    })
  })

  app.get(environment + '/getCaixaPosicao', function (req, res, next) {
    let usuario = req.query.usuario
    let sqlStr = 'SELECT * FROM caixa_status where usuario like "' + usuario + '" ORDER BY id DESC LIMIT 1'
    console.log('sqlStr:', sqlStr);

    console.log('./' + req.session.owner + '.db');

    db_open('./' + req.session.owner + '.db').then(db => {
      // Get  user auth data
      db.all(sqlStr, (err, row)=>{
        let pass = false
        console.log('row:', row);

          pass = true
          jsonStr = { row: row}
          console.log('jsonStr:', jsonStr);
          res.send(jsonStr);

      })


      })
  })

  app.get(environment + '/user/info', function (req, res, next) {
    var ret = {"code":20000,"data":{"roles":["editor"],"introduction":"I am an editor","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":req.session.username}}
    res.send(ret)
  })

  app.post(environment + '/user/login', function (req, res, next) {
    let empresa = req.body.empresa
    let username = req.body.username
    let password = req.body.password

    console.log('req.body:', req.body);

    // store system owner
    req.session.owner = empresa
    req.session.username = username

    console.log('req.session.owner:', req.session.owner);

    db_open('./' + empresa + '.db').then(db => {

    let sqlStr = 'select * from usuarios where nome like "'+username+'" and senha like "'+password+'"'
    console.log('sqlStr:', sqlStr);

    // Get  user auth data
    db.get(sqlStr, (err, row)=>{
      let pass = false
      console.log('row:', row);
      if (row) {
        pass = true
        jsonStr = {
         "code": 20000,
         "data": {
           "token": row['token'],
           "total": 1}
         }
      }else{
        jsonStr = {
         "code": 20000,
         "data": {
           "token": '',
           "total": 1}
         }
      }

      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });
      res.send(jsonStr);
      // console.log('-------->', v);  // exibe 60 depois de 4 segundos.
    });
    });

    // db.all(sqlStr, function(err, rows, fields) {
    //   let pass = false
    //   if ((rows||[]).length>0) pass = true
    //   jsonStr = {
    //    "code": 20000,
    //    "data": {
    //      // "token": "admin-token",
    //      "token": "admin-token",
    //      "total": (rows||[]).length}
    //    }
    //   console.log('jsonStr:', jsonStr);
    //   res.send(jsonStr);
    // });
  })

////////////////////////////////
// Cadastros
////////////////////////////////

  // Clientes
  app.get(environment + '/clientes', function (req, res, next) {
  console.log('req.session.owner:', req.session.owner);
   db_open('./' + req.session.owner + '.db').then(db => {
    console.log('req.query:', req.query);
    let strSort = ""
    let strLimit = ""
    let strWhere = " where 1=1 "
    if (req.query.sort) strLimit = " limit " + ((parseInt(req.query.page) - 1) * req.query.limit) + ',' + req.query.limit
    if (req.query.sort) strSort = " order by " + req.query.sort.replace('+', '').replace('-', '')

    if (req.query.nome){ strWhere += " and nome like '%"+req.query.nome+"%' or doc like '%"+req.query.nome+"%'"}
    if (req.query.doc){ strWhere += " and doc like '%"+req.query.doc+"%'"}

    sqlStr = "SELECT count(*) as total FROM clientes " + strWhere
    db.all(sqlStr, function(err, rows, fields) {
       let totGeral = rows[0].total
       console.log('totGeral:', totGeral);
       sqlStr = "SELECT * FROM clientes " + strWhere + strSort + strLimit;
       console.log('sqlStr', sqlStr);
       db.all(sqlStr, function(err, rows, fields) {
       // console.log('rows.length:', rows.length);
         jsonStr = {
           "code": 20000,
           "data": {
               // "total": (rows||[]).length}
               "total": totGeral}
           }
          jsonStr.data.items = rows
          res.send(jsonStr);
       });



    })
    })


  })
  app.post(environment + '/cliente', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      db.run('INSERT INTO clientes (nome, tipo, doc, contato, fone, fone2, email, endereco, cep, obs) VALUES (?,?,?,?,?,?,?,?,?,?)',
              [req.body.nome,
               req.body.tipo,
               req.body.doc,
               req.body.contato,
               req.body.fone,
               req.body.fone2,
               req.body.email,
               req.body.endereco,
               req.body.cep,
               req.body.obs],
               function(err) {
                  if (err) return console.log(err.message);
                  // get the last insert id
                  console.log(`A row has been inserted with rowid ${this.lastID}`);
                  jsonStr = {code: 20000, data: {id: this.lastID}}
                  res.send(jsonStr);
               }
      );
    })
  })
  app.patch(environment + '/cliente', function (req, res, next) {
    var id = req.body.id
    db_open('./' + req.session.owner + '.db').then(db => {
      let data = [req.body.nome, req.body.tipo, req.body.doc, req.body.contato, req.body.fone, req.body.fone2, req.body.email, req.body.endereco, req.body.cep, req.body.obs, id];
      let sql = "UPDATE clientes SET nome = ?, tipo = ?, doc = ?, contato = ?, fone = ?, fone2 = ?, email = ?, endereco = ?, cep = ?, obs = ? WHERE id = ?";

      db.run(sql, data, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
      });

      res.send({
        code: 20000,
        data: 'success'
      })
    })
  })
  app.delete(environment + '/cliente', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      db.run('DELETE FROM clientes WHERE id = ' + req.body.id);

       res.send({code: 20000,
               data: {
                 pvData: [
                   { key: 'PC', pv: 1024 },
                   { key: 'mobile', pv: 1024 },
                   { key: 'ios', pv: 1024 },
                   { key: 'android', pv: 1024 }
                 ]
               }
             });
    })
  })

  // Fornecedores
  app.get(environment + '/fornecedores', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      sqlStr = "SELECT * FROM fornecedores ";
      console.log('sqlStr', sqlStr);
      db.all(sqlStr, function(err, rows, fields) {
      // console.log('rows.length:', rows.length);
      jsonStr = {
        "code": 20000,
        "data": {
            "total": rows.length}
        }
       jsonStr.data.items = rows
     })
     res.send(jsonStr);
    });

  })
  app.post(environment + '/fornecedor', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      db.run('INSERT INTO fornecedores (razao_social, nome_fantasia, tipo, doc, contato, fone, fone2, email, endereco, cep, obs) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
              [req.body.razao_social,
               req.body.nome_fantasia,
               req.body.tipo,
               req.body.doc,
               req.body.contato,
               req.body.fone,
               req.body.fone2,
               req.body.email,
               req.body.endereco,
               req.body.cep,
               req.body.obs],
               function(err) {
                  if (err) return console.log(err.message);
                  // get the last insert id
                  console.log(`A row has been inserted with rowid ${this.lastID}`);
               }
      );
      jsonStr = {code: 20000, data: 'success'}
      res.send(jsonStr);
    })
  })
  app.patch(environment + '/fornecedor', function (req, res, next) {
    var id = req.body.id

    db_open('./' + req.session.owner + '.db').then(db => {
      //
      let data = [req.body.razao_social, req.body.nome_fantasia, req.body.tipo, req.body.doc, req.body.contato, req.body.fone, req.body.fone2, req.body.email, req.body.endereco, req.body.cep, req.body.obs, id];
      let sql = "UPDATE fornecedores SET razao_social = ?, nome_fantasia = ?, tipo = ?, doc = ?, contato = ?, fone = ?, fone2 = ?, email = ?, endereco = ?, cep = ?, obs = ? WHERE id = ?";

      db.run(sql, data, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
      });


      res.send({
        code: 20000,
        data: 'success'
      })
    })
  })
  app.delete(environment + '/fornecedor', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      db.run('DELETE FROM fornecedores WHERE id = ' + req.body.id);
      res.send(
        {code: 20000,
           data: {
             pvData: [
               { key: 'PC', pv: 1024 },
               { key: 'mobile', pv: 1024 },
               { key: 'ios', pv: 1024 },
               { key: 'android', pv: 1024 }
             ]
           }
         });
    });
  })

  // Funcionarios
  app.get(environment + '/funcionarios', function (req, res, next) {

    db_open('./' + req.session.owner + '.db').then(db => {
      let strWhere = " where 1=1 "
      let strLimit = " limit " + ((parseInt(req.query.page) - 1) * req.query.limit) + ',' + req.query.limit
      let strSort = " order by " + req.query.sort.replace('+','').replace('-','')

      if (req.query.nome){ strWhere += " and nome like '%"+req.query.nome+"%'"}
      if (req.query.doc){ strWhere += " and doc like '%"+req.query.doc+"%'"}

      sqlStr = "SELECT count(*) as total FROM funcionarios " + strWhere
      db.all(sqlStr, function(err, rows, fields) {
        if (rows){
         let totGeral = rows[0].total
         console.log('totGeral:', totGeral);
         sqlStr = "SELECT * FROM funcionarios " + strWhere + strSort + strLimit;
         console.log('sqlStr', sqlStr);
         db.all(sqlStr, function(err, rows, fields) {
           jsonStr = {
             "code": 20000,
             "data": {
                 // "total": (rows||[]).length}
                 "total": totGeral}
             }
            jsonStr.data.items = rows
            res.send(jsonStr);
         });
        }
      })
    })
  })
  app.post(environment + '/funcionario', function (req, res, next) {

    db_open('./' + req.session.owner + '.db').then(db => {
      db.run('INSERT INTO funcionarios (nome, funcao, doc, contato, fone, fone2, email, endereco, cep, obs) VALUES (?,?,?,?,?,?,?,?,?,?)',
              [req.body.nome,
               req.body.funcao,
               req.body.doc,
               req.body.contato,
               req.body.fone,
               req.body.fone2,
               req.body.email,
               req.body.endereco,
               req.body.cep,
               req.body.obs],
               function(err) {
                  if (err) return console.log(err.message);
                  // get the last insert id
                  console.log(`A row has been inserted with rowid ${this.lastID}`);
                  jsonStr = {code: 20000, data: {id: this.lastID}}
                  res.send(jsonStr);
               }
      );
    })
  })
  app.patch(environment + '/funcionario', function (req, res, next) {
    var id = req.body.id

    db_open('./' + req.session.owner + '.db').then(db => {
      let data = [req.body.nome, req.body.funcao, req.body.doc, req.body.contato, req.body.fone, req.body.fone2, req.body.email, req.body.endereco, req.body.cep, req.body.obs, id];
      let sql = "UPDATE funcionarios SET nome = ?, funcao = ?, doc = ?, contato = ?, fone = ?, fone2 = ?, email = ?, endereco = ?, cep = ?, obs = ? WHERE id = ?";

      db.run(sql, data, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
      });

      res.send({
        code: 20000,
        data: 'success'
      })
    })
  })
  app.delete(environment + '/funcionario', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      db.run('DELETE FROM funcionarios WHERE id = ' + req.body.id);
      res.send({code: 20000,
               data: {
                 pvData: [
                   { key: 'PC', pv: 1024 },
                   { key: 'mobile', pv: 1024 },
                   { key: 'ios', pv: 1024 },
                   { key: 'android', pv: 1024 }
                 ]
               }
             });
    })
  })

  // Produtos
  app.get(environment + '/produtos', function (req, res, next) {

    db_open('./' + req.session.owner + '.db').then(db => {
      var sqlWhere = "where 1=1 "
      var sqlLimit = ""
      if (req.query.page){
        sqlLimit = " LIMIT " + (parseInt(req.query.page)-1) * 20 + ", " + req.query.limit
      }
      if (req.query.ean){
        sqlWhere += "and ean like '%"+req.query.ean+"%'"
      }
      if (req.query.descricao){
        sqlWhere += "and descricao like '%"+req.query.descricao+"%'"
      }
      sqlStr = "SELECT * FROM produtos "+ sqlWhere + " order by id desc " + sqlLimit ;
      console.log('sqlStr', sqlStr);
      db.all(sqlStr, function(err, rows, fields) {
        // console.log('rows.length:', rows.length);
        jsonStr = {
          "code": 20000,
          "data": {
              "total": rows.length}
          }
         jsonStr.data.items = rows

        console.log(jsonStr);
        res.send(jsonStr);
      });

      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });

      // console.log('-------->', v);  // exibe 60 depois de 4 segundos.
    });

  })

  app.post(environment + '/produto', function (req, res, next) {

    db_open('./' + req.session.owner + '.db').then(db => {

      db.run('INSERT INTO produtos (ean, descricao, pco_custo, pco_venda, unidade, estoque) VALUES (?,?,?,?,?,?)',
              [req.body.ean,
               req.body.descricao,
               req.body.pco_custo,
               req.body.pco_venda,
               req.body.unidade,
               req.body.estoque],
               function(err) {
                  if (err) return console.log(err.message);
                  // get the last insert id
                  console.log(`A row has been inserted with rowid ${this.lastID}`);
               }
      );
      jsonStr = {code: 20000, data: 'success'}
      res.send(jsonStr);
    })
  })
  app.post(environment + '/productsList', function (req, res, next) {

    db_open('./' + req.session.owner + '.db').then(db => {

    // db.run('INSERT INTO produtos (ean, descricao, pco_custo, pco_venda, unidade, estoque) VALUES (?,?,?,?,?,?)',
    //         [req.body.ean,
    //          req.body.descricao,
    //          req.body.pco_custo,
    //          req.body.pco_venda,
    //          req.body.unidade,
    //          req.body.estoque],
    //          function(err) {
    //             if (err) return console.log(err.message);
    //             // get the last insert id
    //             console.log(`A row has been inserted with rowid ${this.lastID}`);
    //          }
    // );
    jsonStr = {code: 20000, data: 'success'}
    res.send(jsonStr);
    })
  })
  app.patch(environment + '/produto', function (req, res, next) {

    var id = req.body.id
    db_open('./' + req.session.owner + '.db').then(db => {

      // Sql
      let data = [req.body.ean, req.body.descricao, req.body.pco_custo, req.body.pco_venda, req.body.unidade, req.body.estoque, id];
      let sql = "UPDATE produtos SET ean = ?, descricao = ?, pco_custo = ?, pco_venda = ?, unidade = ?, estoque = ? WHERE id = ?";

      db.run(sql, data, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
      });


      res.send({
        code: 20000,
        data: 'success'
      })
    })
  })
  app.delete(environment + '/produto', function (req, res, next) {
    var id = req.query.pv
    console.log('id:', id);
    db_open('./' + req.session.owner + '.db').then(db => {
      db.run(
            'DELETE FROM produtos WHERE id = ?',
            id,
            function (err, result) {
                if (err){
                    res.status(400).json({"error": res.message})
                    return;
                }
                res.json({"message":"deleted", changes: this.changes})
            }
      );

    })
  })

//////////////////////////////


//////////////////////////////
// Vendas
//////////////////////////////

  // Vendas
  app.get(environment + '/vendas', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {

      var sqlWhere = "where 1=1 "
      var sqlLimit = ""
      if (req.query.page){
        sqlLimit = " LIMIT " + (parseInt(req.query.page)-1) * 20 + ", " + req.query.limit
      }
      if (req.query.ean){
        sqlWhere += "and venda like '"+req.query.ean+"'"
      }
      if (req.query.descricao){
        sqlWhere += "and descricao like '%"+req.query.descricao+"%'"
      }
      sqlStr = "SELECT * FROM vendas "+ sqlWhere + " order by id desc " + sqlLimit ;
      console.log('sqlStr', sqlStr);
      db.all(sqlStr, function(err, rows, fields) {
        // console.log('rows.length:', rows.length);
        jsonStr = {
          "code": 20000,
          "data": {
              "total": rows.length}
          }
         jsonStr.data.items = rows
         res.send(jsonStr);
      });
    })
  })
  app.get(environment + '/vendaItens', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      sqlStr = "SELECT * FROM vendas_itens where vendaId = '" + req.query.vendaID + "'" ;
      console.log('sqlStr', sqlStr);
      db.all(sqlStr, function(err, rows, fields) {
      // console.log('rows.length:', rows.length);
      jsonStr = {
        "code": 20000,
        "data": {
            "total": rows.length}
        }
       jsonStr.data.items = rows
       res.send(jsonStr);

      });
    })
  })

  //Balcao
  app.post(environment + '/vendaClose', function (req, res) {

    json_data = JSON.parse(req.body.json_data)

    let data = new Date()
    console.log('--->>>./' + req.session.owner + '.db');
    db_open('./' + req.session.owner + '.db').then(db => {
      db.run('INSERT INTO vendas (vendaID, cliente, subtotal, desconto, acrescimo, total, dinheiro, debito, credito, totalpago, troco, created) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [json_data.vendaID, json_data.cliente, json_data.subtotal, json_data.desconto, json_data.acrescimo, json_data.total, json_data.dinheiro, json_data.debito, json_data.credito, json_data.totalpago, json_data.troco, data], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`${this.lastID}`);
      });

      // Lança no caixa
      db.run('INSERT INTO caixa (data, descricao, tipo, valor) VALUES (?,?,?,?)', [data, 'Venda: ' + json_data.vendaID, '1', json_data.subtotal - json_data.desconto], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`${this.lastID}`);
      });
      let total = 0
      //Insert itens
      for (var i = 0; i < json_data.itens.length; i++) {
        db.run('INSERT INTO vendas_itens (vendaID, vendaItem, ean, descricao, pco_venda, unidade, qnt, subtotal) VALUES (?,?,?,?,?,?,?,?)', [json_data.itens[i].vendaID, json_data.itens[i].vendaItem, json_data.itens[i].ean, json_data.itens[i].descricao, json_data.itens[i].pco_venda, json_data.itens[i].unidade, json_data.itens[i].qnt, json_data.itens[i].subtotal], function(err) {
            if (err) {
              return console.log(err.message);
            }
            // get the last insert id
            console.log(`insert venda table success`);
        });
        total += json_data.itens[i].subtotal
        // Dá baixa dos itens no estoque
        let sql = "UPDATE produtos SET estoque = estoque - " + parseInt(json_data.itens[i].qnt) + " WHERE ean like '%" + json_data.itens[i].ean + "%'";
        console.log(sql);
        db.run(sql);
       }

       // Lança no caixa
       console.log("--data--", data);

       db.run('INSERT INTO caixa (data, historico, entrada, saida) VALUES (?,?,?,?)', [data, 'Venda: ' + json_data.fornecedor + ' - ' + json_data.compraID, total, 0], function(err) {
         if (err) {
           return console.log(err.message);
         }
         // get the last insert id
         console.log(`${this.lastID}`);
       });

      res.send(req.body.json_data);
    })
  });

///////////////////////////////


//////////////////////////////
// Compras
//////////////////////////////

  // Compras
  app.get(environment + '/compras', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      var sqlWhere = "where 1=1 "
      var sqlLimit = ""
      if (req.query.page){
        sqlLimit = " LIMIT " + (parseInt(req.query.page)-1) * 20 + ", " + req.query.limit
      }
      if (req.query.ean){
        sqlWhere += "and ean like '"+req.query.ean+"'"
      }
      if (req.query.descricao){
        sqlWhere += "and descricao like '%"+req.query.descricao+"%'"
      }
      sqlStr = "SELECT * FROM compras "+ sqlWhere + " order by id desc " + sqlLimit ;
      console.log('sqlStr', sqlStr);
      db.all(sqlStr, function(err, rows, fields) {
      // console.log('rows.length:', rows.length);
      jsonStr = {
        "code": 20000,
        "data": {
            "total": rows||[].length}
        }
       jsonStr.data.items = rows
       res.send(jsonStr);

      });
    })
  })
  app.get(environment + '/compraItens', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      sqlStr = "SELECT * FROM compras_itens where compraId = '" + req.query.compraID + "'" ;
      console.log('sqlStr', sqlStr);
      db.all(sqlStr, function(err, rows, fields) {
      // console.log('rows.length:', rows.length);
      jsonStr = {
        "code": 20000,
        "data": {
            "total": rows.length}
        }
       jsonStr.data.items = rows
       res.send(jsonStr);

      });
    })
  })

  // Entrada
  app.post(environment + '/compraClose', function (req, res, next) {

    db_open('./' + req.session.owner + '.db').then(db => {
      json_data = JSON.parse(req.body.json_data)

      console.log('json_data:', json_data);
      console.log('json_data.itens.length:', json_data.itens.length);
      console.log('json_data.itens[0].qnt:', json_data.itens[0].qnt);

      let data = new Date().getTime()
      db.run('INSERT INTO compras (compraID, fornecedor, subtotal, desconto, acrescimo, total, dinheiro, debito, credito, totalpago, troco, created) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [json_data.compraID, json_data.fornecedor, json_data.subtotal, json_data.desconto, json_data.acrescimo, json_data.total, json_data.dinheiro, json_data.debito, json_data.credito, json_data.totalpago, json_data.troco, data], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`${this.lastID}`);
      });


      let total = 0
      //Insert itens
      for (var i = 0; i < json_data.itens.length; i++) {
        total += json_data.itens[i].subtotal
        db.run('INSERT INTO compras_itens (compraID, compraItem, ean, descricao, pco_custo, unidade, qnt, subtotal) VALUES (?,?,?,?,?,?,?,?)', [json_data.itens[i].compraID, json_data.itens[i].compraItem, json_data.itens[i].ean, json_data.itens[i].descricao, json_data.itens[i].pco_custo, json_data.itens[i].unidade, json_data.itens[i].qnt, json_data.itens[i].subtotal], function(err) {
            if (err) {
              return console.log(err.message);
            }

            // get the last insert id
            console.log(`insert compra table success`);
        });
        // Dá baixa dos itens no estoque
        let sql = "UPDATE produtos SET estoque = estoque + " + parseInt(json_data.itens[i].qnt) + " WHERE ean like '%" + json_data.itens[i].ean + "%'";
        console.log(sql);
        db.run(sql);
       }

       // Lança no caixa
       console.log("--data--", data);

       db.run('INSERT INTO caixa (data, historico, entrada, saida) VALUES (?,?,?,?)', [data, 'Compra: ' + json_data.fornecedor + ' - ' + json_data.compraID, 0, total], function(err) {
         if (err) {
           return console.log(err.message);
         }
         // get the last insert id
         console.log(`${this.lastID}`);
       });

      res.send(req.body.json_data);
    })
  });

//////////////////////////////


////////////////////////////////
// Financeiro
////////////////////////////////

  // Caixa
  app.get(environment + '/caixa', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      sqlStr = "SELECT * FROM caixa ORDER BY id desc";
      console.log('sqlStr', sqlStr);
      db.all(sqlStr, function(err, rows, fields) {
        jsonStr = {"code": 20000, "data": {"total": (rows||[]).length}}
        jsonStr.data.items = rows
        res.send(jsonStr);
      });
    })
  })
  app.post(environment + '/caixa', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      db.run('INSERT INTO caixa (data, historico, entrada, saida, saldo) VALUES (?,?,?,?,?)',
        [req.body.data,
         req.body.historico,
         req.body.entrada,
         req.body.saida,
         req.body.saldo],
         function(err) {
            if (err) return console.log(err.message);
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
       })
       jsonStr = {code: 20000, data: 'success'}
       res.send(jsonStr);
    })
  })
  app.patch(environment + '/caixa', function (req, res, next) {
    var id = req.body.id

    db_open('./' + req.session.owner + '.db').then(db => {
      //
      let data = [req.body.data, req.body.historico, req.body.entrada, req.body.saida, req.body.saldo, id];
      console.log('data:', data);
      let sql = "UPDATE caixa SET data = ?, historico = ?, entrada = ?, saida = ?, saldo = ? WHERE id = ?";
      console.log('sql:', sql);
      db.run(sql, data, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
      });

      res.send({
        code: 20000,
        data: 'success'
      })
    })
  })
  app.delete(environment + '/caixa', function (req, res, next) {
    db_open('./' + req.session.owner + '.db').then(db => {
      db.run('DELETE FROM caixa WHERE id = ' + req.body.id);
      res.send({code: 20000});
    })
  })


  var port = process.env.PORT || 3000;
  console.log('port: '+ port);
  const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };
  app.listen(port, () => console.log('Server start on port ${port}'));
