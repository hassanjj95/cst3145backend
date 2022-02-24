// load Express.js
const express = require('express')
const app = express()
// parse the request parameters
app.use(express.json())
// connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb+srv://hassan:mdx2022@cluster0.ndmr1.mongodb.net/'
, (err, client) => {
db = client.db('webstore')
})
// get the collection name
app.param('collectionName'
, (req, res, next, collectionName) => {
req.collection = db.collection(collectionName)
// console.log('collection name:'
, req.collection
return next()
})

app.get('/'
, function (req, res) {
res.send('Select a collection, e.g., /collection/messages')
})
// retrieve all the objects from an collection
app.get('/collection/:collectionName'
, (req, res) => {
req.collection.find({}).toArray((e, results) => {
if (e) return next(e)
res.send(results)
})
})
app.get('/'
, function (req, res) {
res.send('Select a collection, e.g., /collection/messages')
})
// retrieve all the objects from an collection
app.get('/collection/:collectionName'
, (req, res) => {
req.collection.find({}).toArray((e, results) => {
if (e) return next(e)
res.send(results)
})
    })
app.put('/collection/:collectionName/:id'
, (req, res, next) => {
req.collection.update(
{ _id: new ObjectID(req.params.id) },
{ $set: req.body },
{ safe: true, multi: false },
(e, result) => {
if (e) return next(e)
res.send((result.result.n === 1) ?
{msg: 'success'} : { msg: 'error'})
})
})
app.delete('/collection/:collectionName/:id'
, (req, res, next) => {
req.collection.deleteOne(
{ _id: ObjectID(req.params.id) },
(e, result) => {
if (e) return next(e)
res.send((result.result.n === 1) ?
{msg: 'success'} : {msg: 'error'})
})
})
app.listen(3000)