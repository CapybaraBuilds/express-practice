const PORT = process.env.PORT

const express = require('express')
const app = express()
const usersRouter = require('./routes/users')
app.use(express.json())

app.use((req, res, next)=>{
    console.log(new Date().toLocaleString() + ' ' + req.method + ' ' + req.url)
    next()
})

app.get('/', (req,res)=>{
    res.send('Hello Express')
})

app.get('/about', (req, res)=>{
    res.send('About Page')
})

app.use('/users', usersRouter)

app.use((err, req, res, next)=>{
    console.log(err.stack)
    res.status(500).json({error:'Something went wrong!'})
})

app.listen(PORT, ()=>{
    console.log(`Example app is listening on port ${PORT}`)
})