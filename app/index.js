const express = require("express");
const app = express()
const mysql = require('mysql2');
const port =3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
    charset: 'utf8'
}

const connection = mysql.createConnection(config)

let randomName = 'Jorge Henrique'

async function saveName() {
    try {
        //await fetchName()
        console.log('=> Nome para adicionar: ' + randomName)
        const sqlInsertPeople = `INSERT INTO people (nome) VALUES ('${randomName}')`
        connection.query(sqlInsertPeople, (err, results, fields) => {
            console.log('Nome inserido na base de dados')
        })
    } catch (error) {
        console.error('Erro:', error)
    }
}

async function listNames() {
    return new Promise((resolve, reject) => {
        const sqlSelectPeople = `SELECT * FROM people`
        connection.query(sqlSelectPeople, function (err, results, fields) {
            if (err) {
                reject(err)
            } else {
                const names = results.map(row => row.nome)
                console.log('Lista de nomes:', names)
                resolve(names)
            }
        })
    })
}

async function updateList() {
    await saveName()
    names = await listNames()
}


function buildHtml() {
    let html = '<!DOCTYPE html>'
    html += '<html>'
    html += '<head>'
    html += '<title>Desafio Full Cycle</title><style> * { font-family: \'Arial\' }</style>'
    html += '</head>'
    html += '<body>'
    html += '<h1>Full Cycle Rocks!</h1>'
    html += '<ol>'

    for (let i = 0; i < names.length; i++) {
        html += '<li>' + names[i] + '</li>'
    }

    html += '</ol>'
    html += '</body>'
    html += '</html>'

    return html

}

app.get('/', async (_, res) => {
    await updateList()

    html = buildHtml()
    res.send(html)
})

app.listen(port, () => {
    console.log('rodando na porta:  ' + port)
})