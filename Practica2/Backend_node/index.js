import express from 'express';
import cors from "cors"
import bodyParser from "body-parser";
import dotenv from "dotenv"

import conn from "./conexion.js";


const corsOptions = {origin:true,optionSuccessStatus:200}

const app = express()
app.use(cors(corsOptions))
app.use(bodyParser.json())

dotenv.config()

const PORT = 5000
app.listen(PORT)

app.get("/",(req,res)=>{
    res.send(`Servidor de node funcionando en el puerto ${PORT}`)
})


app.get("/procesoscpu",(req,res)=>{
    conn.query("SELECT * FROM proceso",[],(err,results,field)=>{
        if(err){
            console.log(err)
            return res.send
        }else{
            //console.log("Inserted "+results.afffectedRows + "row(s)")
            //console.log(results)
            res.send({data:results})
        }
    })
})

app.get("/procesoschild/:pid",(req,res)=>{
    conn.query("SELECT * FROM child WHERE id_proceso = ?",[req.params.pid],(err,results,field)=>{
        if(err){
            console.log(err)
            return res.send
        }else{
            //console.log("Inserted "+results.afffectedRows + "row(s)")
            //console.log(results)
            res.send({data:results})
        }
    })
})


app.get("/usoram",(req,res)=>{
    conn.query("SELECT * FROM ram ORDER BY id_ram DESC LIMIT 10",[],(err,results,field)=>{
        if(err){
            console.log(err)
            return res.send
        }else{
            //console.log("Inserted "+results.afffectedRows + "row(s)")
            //console.log(results)
            res.send({data:results})
        } 
    })
})

