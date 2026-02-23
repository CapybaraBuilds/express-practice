const express = require('express')
const router = express.Router()

const users = [
    {
        'id': 1,
        'name': 'Alice'
    },
    {
        'id': 2,
        'name': 'Adam'
    }
]

const getUserByIdHandler = (req, res) =>{
    const id = req.url.split('/')[1]
    const user = users.find((user)=>user.id===parseInt(id));
    if(user){
        res.send(user)
    }else{
        res.status(404)
        res.send('User Not Found')
    }
    res.end()
}

const createUserHandler = (req, res) => {
    users.push(req.body)
    res.end()
}

const updateUserHandler = (req, res) => {
    const id = req.url.split('/')[1]
    const idx = users.findIndex((user)=> user.id === parseInt(id))
    if(idx !== -1){
        users[idx] = req.body
    }else{
        res.status(404)
    }
    res.end()
}

const deleteUserHandler = (req, res) =>{
    const id = req.url.split('/')[1]
    const idx = users.findIndex(user=>user.id===parseInt(id))
    if(idx !== -1){
        users.splice(idx, 1)
    }else{
        res.status(404)
    }
    
    res.end()
}

router.get('/', (req, res)=>{
    res.send(users)
})

router.get('/:id', (req, res)=>{
    getUserByIdHandler(req, res)
    
})

router.post('/', (req, res)=>{
    console.log(req.body)
    res.send('User created')
    createUserHandler(req, res)
})

router.put('/:id', (req, res)=>{
    updateUserHandler(req, res)
})

router.delete('/:id', (req, res)=>{
    deleteUserHandler(req, res)
})

module.exports = router