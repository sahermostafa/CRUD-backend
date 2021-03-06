const express = require('express')
const router = express.Router()
const {Event , eventValidate,eventPutValidate} = require('../models/Event')
const {check,validationResult} = require('express-validator')

router.get('/', async (req,res) => {
    try{
        let events = await  Event.find({});
            res.json(events);
    }catch(err){
        console.log(err)
    }
})

router.get('/pages', async (req,res) => {
    try{
        const {page=1,limit=10}=req.query;
        let events = await  Event.find({})
        .limit(limit*1)
        .skip((page-1)*limit).exec();
            res.json(events);
    }catch(err){
        console.log(err)
    }
})

router.get('/:id', async (req,res) => {
    try{
        let event = await  Event.findOne({_id:req.params.id});
            res.json(event);
    }catch(err){
        console.log(err)
    }
})
router.post('/',[
    check('title').isLength({min:5}).withMessage('fullname error'),
    check('description').isLength({min:5}).withMessage('description error'),
], async (req,res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            
            res.json(errors)
        }else{
           let newEvent = await new Event ({
            title:req.body.title,
            description:req.body.description
            })
            await newEvent.save()
            res.json('Success Edite')
        }
    }catch(err){
        console.log(err)
    }
   
})
router.put('/:id',[
    check('title').isLength({min:5}).withMessage('fullname error'),
    check('description').isLength({min:5}).withMessage('description error'),
], async (req,res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            
            res.json(errors)
        }else{
            let editeEvent = {
                title:req.body.title,
                description:req.body.description
            }
            let query = {_id:req.params.id}
            const edits = await Event.findByIdAndUpdate(query,editeEvent,{new:true})
            if(!edits){
                res.status(404).json('error')
            }else{
                res.json(edits)
            }
        }
    }catch(err){
        console.log(err)
    }
       
})
router.delete('/:id', async (req,res) => {
    try{
        let event = await  Event.findByIdAndRemove(req.params.id)
            res.json(event);
    }catch(err){
        console.log(err)
    }
})

module.exports = router
