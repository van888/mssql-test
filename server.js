// load server
const express = require('express')
const server = express()
const cors = require('cors')
const morgan = require('morgan')
const sql = require('mssql')

// morgan is for logging to console
server.use(morgan('combined'))

server.use(cors({
    'allowHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false
}))

const config = {
    user: 'devapp', // oemnycnet\xdevtran
    password: 'T95L3_apr16',  // 
    server: 'cpv-dev-sql01', //  CPV-STG-SQL01 
    database: 'eteamop', // van_test 
 
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}



// get individual record
server.get('/incidents/:idnum', (req, res) => {
    id = req.params.idnum

    sql.close()    
    r = sql.connect(config).then(() => {
        // return sql.query`select * from Person ` //where id = ${3}
        // const qString = `SELECT TOP 1 * FROM V_INCIDENT WHERE idnum = ${id}`
        const qString = `SELECT TOP ${id} * FROM eteamop.dbo.V_INCIDENT ORDER BY DATE_TIME DESC`
        console.log(qString)
        sql.query(qString, (err, rows, fields) => {
            if(err) { 
                console.log('failure: ', err); 
                res.sendStatus(500)
                res.end(); 
                return;
            }
            else {
                res.json(rows.recordset)
            }
        })
    console.log('here is the data...')

    // res.end()
    })
})

// root
server.get("/", (req, res) => {
    console.log("Server responding ...")
    res.send('hello world')
})

server.get('/incidents', (req, res) => {
    res.send('running nodemon for auto updates...')
})

server.listen(3001, () => {
    console.log('Server is listening on 3001...')
})
