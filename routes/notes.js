const router = require("express").Router()
const fs = require("fs")
const path = require("path")
const {v4: uuidv4} = require("uuid")

router.get("/notes", (req, res)=>{
 fs.readFile("./db/db.json", (err, noteData)=>{
if (err){
    console.error(err)
}  
let dbnotes = JSON.parse(noteData)
res.json(dbnotes)
 })
})

router.post("/notes",(req, res)=>{
const dbnotes = JSON.parse(fs.readFileSync("./db/db.json","utf8"))
const addnote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
}
dbnotes.push(addnote)
fs.writeFileSync("./db/db.json", JSON.stringify(dbnotes))
res.json(dbnotes)
})



module.exports = router