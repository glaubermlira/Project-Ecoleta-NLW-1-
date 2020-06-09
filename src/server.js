const express = require("express")
const server = express()

// IMPORTAR O BANCO DE DADOS;
const db = require("./database/db")

// CONFIGURAR PASTA PÚBLICA;
server.use(express.static("public"))

// HABILITAR O USO DO "req.body" DA NOSSA APLICAÇÃO;
server.use(express.urlencoded({ extended: true }))

// UTILIZANDO TEMPLATE ENGINE;
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

// CONFIGURANDO AS ROTAS;
// >>Requisição / >>Resposta;
server.get("/", (req, res) => {
  return res.render("index.html")
})

server.get("/create-point", (req, res) => {
  // "req.query": QUERY STRINGS DA NOSSA URL;
  // console.log(req.query)
  return res.render("create-point.html")
})
server.post("/savepoint", (req, res) => {
  // "req.body": O CORPO DO FORMULÁRIO;
  // console.log(req.body)

  // INSERIR DADOS NO BANCO DE DADOS;
  const query = `
       INSERT INTO places (
         image,
         name,
         address,
         address2,
         state,
         city,
         items
       ) VALUES (?,?,?,?,?,?,?);
     `
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {
      console.log(err)
      return res.send("Erro no Cadastro!")
    }
    console.log("Cadastro realizado com sucesso!")
    console.log(this)

    return res.render("create-point.html", {saved: true})
  }
  db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {
  // PESQUISAR NO BANCO DE DADOS;
  const search = req.query.search

  if (search === " ") {
    // PESQUISA VAZIA;
    return res.render("search-results.html", {total: 0})
  }

  // PEGAR OS DADOS DO BANCO DE DADOS;
  // SE USARMOS O SINAL "=" A BUSCA SERÁ CONFORME CIDADE PESQUISADA EX: RIO DE JANEIRO RETORNARÁ RIO DE JANEIRO,
  // SE COLOCARMOS APENAS RIO NÃO IRÁ ENCONTRAR A CIDADE;
  // SE USARMOS O "LIKE" A BUSCA SERÁ MAIS ABRANGENTE. EX: SE NO CAMPO DE PESQUISA COLOCARMOS APENAS RIO
  // A BUSCA IRÁ RETORNAR VARIAS CIDADES QUE INICIEM COM A PALAVRA RIO (RIO DE JANEIRO.. RIO DO SUL..);
  // OS "%" SIGNIFICA DIZER QUE PODE SER "QUALQUER PALAVRA ANTES.." OU "QUALQUER PALABRA DEPOIS.." 
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err)
    }
    // CONTADOR PARA DEIXAR "PONTOS ENCONTRADOS" DINÂMICO;
    const total = rows.length

    // MOSTRAR A PÁGINA HTML COM OS DADOS DO BANCO DE DADOS;
    return res.render("search-results.html", { places: rows, total: total })
  })
})


// LIGAR O SERVIDOR;
server.listen(3000)
