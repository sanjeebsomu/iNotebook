const express = require('express')
const router = express.Router()
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');



//Route 1: Get All Notes: GET "/api/notes/fetchallnotes". login Required.
router.get('/fetchallnotes',fetchuser, async (req, res)=> {
    let note = await Note.find({user: req.user.id})//where user is same as requested user
    res.json(note)
})

//Route 2: Add a new Note: POST "/api/notes/addnote". login Required.
router.post('/addnote',fetchuser, [
    body('title', 'Title must be of atleast 3 charecters').isLength({ min: 3 }),
    body('description', 'description must be of atleast 5 charecters').isLength({ min: 5 })
], async (req, res)=> {

      //If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
//if all the validation gets success then create a new note
      const {title, description, tag} = req.body;//destrauctering
      let note = new Note({//destructerd items
        title, description, tag, user: req.user.id
    })
    const savedNote = await note.save()

    res.json(savedNote)
              
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")//it will display inside response    
}
})




//Route 3: Update an Existing Note: PUT "/api/notes/updatenote". login Required.
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Title must be of atleast 3 charecters').isLength({ min: 3 }),
    body('description', 'description must be of atleast 5 charecters').isLength({ min: 5 })
], async (req, res)=> {
      //If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
    //destraucter to get the element out of the req.body
    const{title, description, tag} = req.body;

    //create newNote object
    const newNote = { };//this is empty because if a specified field is want to be updated we will store that field in this object.
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //find the note(id) to be updated
    let note =await Note.findById(req.params.id);
    //if (note with this)tampered id does not exist/this steps is for keeping this app secure from the attacker. if someone
    if(!note){return res.status(404).send("Not Found")}
    // if this notes user ka id is same with req.user.id(this gives error for some strange reason, so will not adding this functionality for now)
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    // agar sab kuchh shi rha toh
    note = await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
    res.json(note)
            
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")//it will display inside response    
}
})

//Route 3: Delete an Existing Note: DELETE "/api/notes/updatenote". login Required.
router.delete('/deletenote/:id', fetchuser, async (req, res)=> {
    try {
    //find the note(id) to be deleted
    let note =await Note.findById(req.params.id);
    //if note with this(tampered?) id does not exist/this steps is for keeping this app secure from the attacker
    if(!note){return res.status(404).send("Not Found")}
    //allow deletion only if user owns this note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    //deleting
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note with this id has been Deleted", note:note})        
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")  
}
})
module.exports = router