const mysql = require('mysql');

class Model{

    constructor(){
        this.connection = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'node2',
        })
        this.table = ''

    }

    findeAll(){
        return new Promise((ok , error)=>{
            this.connection.query(`Select * from ${this.table}` , (error , data)=>{
                if(error) throw error
                ok(data)
            })
        })
    }

    finde(data){
        let query = `Select * from ${this.table} where `
            for(let i in data){
                query += ` ${i} = '${data[i]}' and `
            }
            query = query.substring( 0,query.length-4)
            
        return new Promise((ok , error)=>{
            this.connection.query(query , (error , data)=>{
                if(error) throw error
                ok(data)
            })
        })  
    }

    Delet(data){
        let query = `delete from ${this.table} where id = ${data} `
        return new Promise((ok , error) =>{
            this.connection.query(query , (error , data)=>{
                if(error) throw error
                ok(data)
            })
        })
    }

    Insert(data){
        let keys = Object.keys(data)
        let values = Object.values(data)
        keys=keys.join(',')
        values=values.join("','")
        let query = `Insert into ${this.table}(${keys}) values ('${values}')`

        return new Promise((ok , error)=>{
            this.connection.query(query , (error , data)=>{ 
                if(error) throw error
                ok(data.insertId)
            })
        })  
    }

    Update(data , id){
        let keys = Object.keys(data)
        let values = Object.values(data)
        let query = `update ${this.table} set `

        for(let i=0,j=0 ; i<keys.length , j<values.length ; i++ , j++){
            query += `${keys[i]} = '${values[j]}', `
        }

        query = query.substring( 0,query.length-2)
        query += ` where id = ${id}`
        
        return new Promise((ok , error)=>{
            this.connection.query(query , (error , data)=>{
                if(error) throw error
                ok(data)
            })
        })
    }

    

}

module.exports = Model