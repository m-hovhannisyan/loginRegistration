const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt') ;   
const Model = require('../models/UserModel')
const PhotoModel = require('../models/PhotoModel')
const saltRounds = 10 ;   
const multer = require('multer')
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname )
    }
})
  
let upload = multer({ storage: storage })

class RegControllers {

    login(req , res){
            let error = {}
            let value = {}
            if(req.session.Error && req.session.inpValue ){
                req.session.Error.forEach((i)=>{
                    if(error[i.param]==undefined){
                        error[i.param]=i.msg
                    }
                })
                value = req.session.inpValue
            }
        req.session.destroy()
        res.render('login' , {errors:error , value:value})
    }

    saignup(req , res){
        let error ={}
        let value = {}
        if(req.session.validationError && req.session.inputValue ){
            req.session.validationError.forEach((i)=>{
                if(error[i.param]==undefined){
                    error[i.param] = i.msg
                }
            })
            value = req.session.inputValue
        }
        req.session.destroy()
        res.render('index', {errors:error , value:value})
    }

    async saignupform(req ,res){
            const errors = validationResult(req) 
            if(!errors.isEmpty()){
                const inputValue = req.body
                req.session.inputValue = inputValue
                req.session.validationError = errors.errors
                res.redirect('/')
            }
            else{
                bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
                    req.session.userId = await Model.Insert({
                        name:req.body.name ,
                        surname:req.body.surname,
                        age:req.body.age,
                        email:req.body.email,
                        password:hash
        
                    })            
                res.redirect('/profil')
                })
            }
    }

    async loginform(req , res){
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                const inpValue = req.body
                req.session.Error=errors.errors
                req.session.inpValue=inpValue
                res.redirect('/login')
            }
            else {
                let x = await Model.finde({email:req.body.email})
                req.session.userId = x[0].id
                res.redirect('/profil')
            }
    }

    async profil(req , res){
            let error = {}
            let value = {}
            if(req.session.Error && req.session.inpValue ){
                req.session.Error.forEach((i)=>{
                    if(error[i.param]==undefined){
                        error[i.param]=i.msg
                    }
                })
                value = req.session.inpValue
            }
        
            if(req.session.userId){
            var user = await Model.finde({id:req.session.userId})
                res.render('profil' ,{user:user[0] ,errors:error , value:value})
            }
            
            else { res.redirect('login') }
    }

    async profilsettings(req , res){
        let error = {}
        let value = {}
        if(req.session.Error && req.session.inpValue ){
            req.session.Error.forEach((i)=>{
                if(error[i.param]==undefined){
                    error[i.param]=i.msg
                }
            })
            value = req.session.inpValue
        }
        if(req.session.userId){
            var user = await Model.finde({id:req.session.userId})
            res.render('profilsettings' ,{ user:user[0] , errors:error , value:value})
        }
        else{res.redirect('/profil')}
    }

    async profiluserphoto(req , res){
        let id = req.session.userId
        let data = await PhotoModel.finde({userid:id})
        res.render('userimg' ,{data})
    }


}



module.exports = new RegControllers 