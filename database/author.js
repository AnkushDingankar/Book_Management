const mongoose=require("mongoose");

//crete a book Schema:-
const AuthorSchema = mongoose.Schema(
{
    id:Number,
    name:String,
    books:[String]
}

);

const  AuthorModel = mongoose.model("Author", AuthorSchema);

module.exports =  AuthorModel;