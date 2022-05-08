const { Level } = require('level')
const db =  new Level('db/peers', { valueEncoding: 'json' })
db.put('peers_list', ["http://localhost:8080", "http://localhost:80"],(err)=>{
    if(err){
        console.log(err)
    }
})