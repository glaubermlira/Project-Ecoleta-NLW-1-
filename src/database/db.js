// IMPORTAR DEPENDÊNCIA DO SQLITE3;
const sqlite3 = require("sqlite3").verbose()

// CRIAR O OBJETO PARA REALIZAR OPERAÇÕES NO BANCO DE DADOS;
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//UTILIZAR O OBJETO DE BANCO DE DADOS PARA NOSSAS OPERAÇÕES;
// db.serialize(() => {
// //   //COMANDOS SQL;
// //   // 1. CRIAR TABELA;
//   db.run(`
//       CREATE TABLE IF NOT EXISTS places (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         image TEXT,
//         name TEXT,
//         address TEXT,
//         address2 TEXT,
//         state TEXT,
//         city TEXT,
//         items TEXT
//       );
//   `)
//   // 2. INSERIR DADOS NA TABELA;
//   const query = `
//       INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//       ) VALUES (?,?,?,?,?,?,?);
//     `
//   const values = [
//     "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//     "Papersider",
//     "Av. General San Martin, Bongi",
//     "Nº 380",
//     "Pernambuco",
//     "Recife",
//     "Papéis e Papelão"
//   ]

//   function afterInsertData(err) {
//     if (err) {
//       return console.log(err)
//     }
//     console.log("Cadastro realizado com sucesso!")
//     console.log(this)
//   }

//   db.run(query, values, afterInsertData)

//   // 3. CONSULTAR DADOS DA TABELA;
//   // db.all(`SELECT * FROM places`, function (err, rows) {
//   //   if (err) {
//   //     return console.log(err)
//   //   }
//   //   console.log("Aqui estão os seu registros")
//   //   console.log(rows)

//   // })

//   // 4. DELETAR DADOS DA TABELA;
//   db.run(`DELETE FROM places WHERE id = ?`, [], function (err) {
//     if (err) {
//       return console.log(err)
//     }
//     console.log("Registro deletado com sucesso!")
//   })
// })