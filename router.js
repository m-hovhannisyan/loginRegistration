const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt') ;   
const saltRounds = 10 ;   
const myPlaintextPassword = ' s0 / \ / \ P 4 $$ w0rD ' ;   
const someOtherPlaintextPassword = ' not_bacon ' ; 
const Model = require('./models/UserModel');
const RegControler = require('./controllers/RegControllers.js');
const PhotoModel = require('./models/PhotoModel') ;
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


router.get('/' , RegControler.saignup )


router.post('/signupForm' ,[
 check('name').notEmpty().withMessage('lracreq name dashty').isAlpha().withMessage('name dashty petq e lini text'),
 check('surname').notEmpty().withMessage('lracreq surname dashty').isAlpha().withMessage('surname dashty petq e lini text'),
 check('age').notEmpty().withMessage('lracreq age dashty').isNumeric().withMessage('age dashty petq e lini tiv(tariq)'),
 check('email').notEmpty().withMessage('lracreq email dashty').isEmail().withMessage('email dashty petq e lini email tipi'),
 check('password').notEmpty().withMessage('lracreq password dashty').isLength({min:6}).withMessage('password dashty petq e lini amenaqichy 6 nish'),
 check('confirm_password').notEmpty().withMessage('lracreq confirm password dashty').custom((value,{req})=>(value===req.body.password)).withMessage('confirm_passwordy chi hamapatasxanum'),
 check('email').custom(async(value , {req}) => {
    let q=await Model.finde({email:req.body.email})
     if(q[0] != undefined){
         if(q[0].email === value){
            throw new Error('tvyal email-y zbaxvac e')
         }
     }         
}) ,
] , RegControler.saignupform)

router.get('/login' , RegControler.login)

router.post('/loginpage' , (req , res)=>{
    res.redirect('/login')
})

router.post('/signuppage' , (req , res)=>{
    res.redirect('/')
})

router.post('/loginForm' , [
    check('email').notEmpty().withMessage('lracreq email dashty').isEmail().withMessage('petq e lini Email tipi') ,
    check('password').notEmpty().withMessage('lracreq password dashty').isLength({min:6}) ,
    check('email').custom(async (value , {req}) => {
        let q = await Model.finde({email:req.body.email})
        if(q[0] === undefined){
            throw new Error('tvyal email - ov ogtater chka')
        }
        else{
            if(!bcrypt.compareSync(req.body.password , q[0].password)){
                return Promise.reject();
            }
        }
    }) ,
] , RegControler.loginform)

router.get('/profil' , RegControler.profil)

router.post("/settingsform" , [
check('name').notEmpty().withMessage('lracreq name dashty').isAlpha().withMessage('name dashty petq e lini text'),
check('surname').notEmpty().withMessage('lracreq surname dashty').isAlpha().withMessage('surname dashty petq e lini text'),
check('age').notEmpty().withMessage('lracreq age dashty').isNumeric().withMessage('age dashty petq e lini tiv(tariq)'),
check('old_password').notEmpty().withMessage('lracreq old-password dashty').isLength({min:6}).withMessage('old-password dashty petq e lini amenaqichy 6 nish').custom(async(value , {req} )=>{
    let id = req.session.userId
    let q = await Model.finde({id:id})
    if(!bcrypt.compareSync(value , q[0].password)){
        return Promise.reject();
    }      
}),
check('new_password').notEmpty().withMessage('lracreq new-password dashty').isLength({min:6}).withMessage('old-password dashty petq e lini amenaqichy 6 nish'),
check('confirm_password').notEmpty().withMessage('lracreq confirm-password dashty').custom((value,{req})=>(value===req.body.new_password)).withMessage('confirm-passwordy chi hamapatasxanum'),
] , (req , res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const inpValue = req.body
        req.session.Error=errors.errors
        req.session.inpValue=inpValue
        res.redirect('/profil/settings')
    }
    else{
        bcrypt.hash(req.body.new_password, saltRounds, async function(err, hash) {
            await Model.Update({
                name:req.body.name ,
                surname:req.body.surname,
                age:req.body.age,
                password:hash

            },req.session.userId)            
         res.redirect('/profil')
        })
    }
})

router.post('/settingsname' , [
    check('name').notEmpty().withMessage('lracreq name dashty').isAlpha().withMessage('name dashty petq e lini text'),
] ,  async(req , res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const inpValue = req.body
        req.session.Error=errors.errors
        req.session.inpValue=inpValue
        res.redirect('/profil/settings')
    }
    else{
        await Model.Update({ name:req.body.name} , req.session.userId)            
        res.redirect('/profil')
    }
})

router.post('/settingssurname' , [
    check('surname').notEmpty().withMessage('lracreq surname dashty').isAlpha().withMessage('surname dashty petq e lini text'),
] , async (req , res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const inpValue = req.body
        req.session.Error=errors.errors
        req.session.inpValue=inpValue
        res.redirect('/profil/settings')
    }
    else{
        console.log(req.session.userId)
        await Model.Update({ surname:req.body.surname} , req.session.userId)

        res.redirect('/profil')
    }
})

router.post('/settingsage' ,[
    check('age').notEmpty().withMessage('lracreq age dashty').isNumeric().withMessage('age dashty petq e lini tiv(tariq)'),
] , async (req , res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const inpValue = req.body
        req.session.Error=errors.errors
        req.session.inpValue=inpValue
        res.redirect('/profil/settings')
    }
    else{
        await Model.Update({ age:req.body.age} , req.session.userId)
        res.redirect('/profil')
    }
})

router.post('/settingsemail' , [
    check('email').notEmpty().withMessage('lracreq email dashty').isEmail().withMessage('petq e lini Email tipi') ,
    check('email').custom(async (value , {req}) => {
        let q = await Model.finde({email:req.body.email})
        if(q[0] != undefined && q[0].id != req.session.userId){
            throw new Error('tvyal email-y zbaxvac e')
        }
    })
] , async (req , res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const inpValue = req.body
        req.session.Error=errors.errors
        req.session.inpValue=inpValue
        res.redirect('/profil/settings')
    }
    else{
        await Model.Update({ email:req.body.email} , req.session.userId)
        res.redirect('/profil')
    }
})

router.post('/settingspassword' ,[
check('old_password').notEmpty().withMessage('lracreq old-password dashty').isLength({min:6}).withMessage('old-password dashty petq e lini amenaqichy 6 nish').custom(async(value , {req} )=>{
    let id = req.session.userId
    let q = await Model.finde({id:id})
    if(!bcrypt.compareSync(value , q[0].password)){
        return Promise.reject();
    }      
}),
check('new_password').notEmpty().withMessage('lracreq new-password dashty').isLength({min:6}).withMessage('old-password dashty petq e lini amenaqichy 6 nish'),
check('confirm_password').notEmpty().withMessage('lracreq confirm-password dashty').custom((value,{req})=>(value===req.body.new_password)).withMessage('confirm-passwordy chi hamapatasxanum'),
] , (req , res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const inpValue = req.body
        req.session.Error=errors.errors
        req.session.inpValue=inpValue
        res.redirect('/profil/settings')
    }
    else{
        bcrypt.hash(req.body.new_password, saltRounds, async function(err, hash) {
            await Model.Update({ password:hash } , req.session.userId)            
            res.redirect('/profil')
        })
    }
})

router.post('/profilout' , (req,res)=>{
    req.session.destroy()
    res.redirect('/login')
})

router.post("/uploadimage" , upload.single('image') , (req , res)=>{
    let img = 'img/'+req.file.filename
    let id = req.session.userId
    Model.Update({image:img} ,id)
    res.redirect('/profil')
})

router.post('/profilsettings' , (req , res)=>{
    res.redirect('/profil/settings')
})

router.get('/profil/settings' , RegControler.profilsettings)

router.post('/userphoto' , (req , res)=>{
    res.redirect('/profil/userphoto')
})

router.get('/profil/userphoto' , RegControler.profiluserphoto)

router.post('/addimage' , upload.single('image') , async(req , res)=>{
    let img = 'img/'+req.file.filename
    let id = req.session.userId
    let data = {userid:id , userimg:img}
    await PhotoModel.Insert(data)
    res.redirect('/profil/userphoto')
})

router.post('/deleteimg' , (req , res)=>{
    PhotoModel.Delet(req.body.id)
    res.send('ok')
})

router.post('/makeimg' , (req , res)=>{
    let a  = req.body.img
    Model.Update({image:a} , req.session.userId)
    res.redirect('/profil')
})

router.post('/profilpage' , (req , res )=>{
    res.redirect('/profil')
})


module.exports = router