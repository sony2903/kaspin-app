const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const { User } = require('./models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios').default;
const authentication = require('./middleware/authenctication')

app.use(express.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//user start
app.post('/user', (req, res) => {
    // console.log({nama: req.body.nama, password: req.body.password})
    User.create({
        nama: req.body.nama,
        password: req.body.password
    })
    .then( data => {
        res.status(201).json({msg: 'account created'})
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({msg: err})
    })
})
app.post('/login', (req, res) => {
    const form = {
        nama: req.body.nama,
        password: req.body.password
    }
    User.findOne({
        where: { nama: form.nama } 
    })
    .then(data => {
        // console.log(data.password)
        if(!data) return res.status(400).json({message: 'Nama atau Password tidak sesuai'})
        if(!bcrypt.compareSync(form.password, data.password)) return res.status(400).json('Nama atau Password tidak sesuai')
        const privateKey = process.env.PRIVATEKEY
        const token = jwt.sign({ 
            id: data.id,
            nama: data.nama
        }, privateKey)
        res.status(200).json({token: token})
    })
    .catch(err => {
        res.status(400).json(err)
    })
})
//user end

//kota start
app.post('/findbyid', authentication, (req, res) => {
    axios.get(`${process.env.API}`)
    .then(data => {
        const collections = JSON.parse(JSON.stringify(data.data.address_kecamatan))
        const filter = collections.filter(collection => collection.id == req.body.id)
        if(filter.length == 0) return res.status(400).json({msg: 'data not existed'})
        res.send({status: 'data', data: filter})
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({msg: err})
    })
})

app.post('/findbykotaid', authentication, (req, res) => {
    axios.get(`${process.env.API}`)
    .then(data => {
        const collections = JSON.parse(JSON.stringify(data.data.address_kecamatan))
        const filter = collections.filter(collection => collection.kota_id == req.body.kota_id)
        if(filter.length == 0) return res.status(400).json({msg: 'data not existed'})
        res.status(200).json({status: 'data', data: filter})
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({msg: err})
    })
})
//kota end

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})