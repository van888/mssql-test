const sql = require('mssql');

const config = {
    user: 'xdevtran',
    password: '',
    server: 'CPV-STG-SQL01', // You can use 'localhost\\instance' to connect to named instance
    database: 'van_test',
 
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}


function getQuery() {
    async () => {
        try {
            await sql.connect(config);
            const result = await sql.query`select * from test_table where idnum = 1;`;
            console.dir(result);
            console.log('hello');
        } catch (err) {
            // ... error checks
            console.log(err);
            
        } 
    }; console.dir('running...');
}


getQuery();

console.log("mssql completed...");