const express = require('express')
const app = express()
const port = 3000

const {knex} = require('./knex.js')

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(require('cors')());

var formValidationMiddleware = function(req, res, next) {
    // name validation
    if(!req.body.name){
        res.status(400).json({message:"Name required"})
    }

    if(req.body.name.length > 10){
        res.status(400).json({message:"Name should be less than or 10 characters in length"})
    }

    if(!req.body.dob){
        res.status(400).json({message:"Dob required"})
    }
    next()
}
app.post('/employee', formValidationMiddleware, (req, res) => {
    console.log(req.body)
    req.body.skills=req.body.skills.join(',')
    knex('employee').insert(req.body).then( _ => res.send());
});

app.get('/employee', (req, res) => {
    console.log(req.query)
    knex('employee').paginate(Number(req.query.perpage),Number(req.query.current_page),true)
    .then(paginator => {
        paginator.data=paginator.data.map( record => {
            record.skills=record.skills.split(',');
            return record
        })
        console.log(paginator)
        res.json(paginator)
        console.log(paginator)
        console.log(paginator.current_page);
        console.log(paginator.data);
    })
});

app.put('/employee', formValidationMiddleware, (req, res) => {
    console.log(req.body)
    var id= req.body.id;
    delete req.body.id;
    req.body.skills=req.body.skills.join(',')
    knex('employee').where("id",id).update(req.body).then( _ => res.send());
});

app.get('/employee/:id', (req, res)=> {
    knex('employee').where('id',req.params.id).then( records => {
        if(records.length){
            records[0].skills=records[0].skills.split(',');
        res.json(records[0])
        }
        res.status(404).json({message:"Records not found."})
        
    }, fail => res.status(500).send(fail))
});

app.delete('/employee/:id', (req, res)=> {
    knex('employee').where('id',req.params.id).delete().then(_ => res.status(200).json({message:"Record deleted"}), fail => res.status(500).send(fail))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))