const mongoose=require("mongoose");

//crete a book Schema:-
const BookSchema = mongoose.Schema(
{
    ISBN:String,
    title:String,
    language: String,
    pubDate:String,
    numPage:Number,
    author:[Number],
    publication:[Number],
    category:[String]

}

);

const BookModel = mongoose.model("books",BookSchema);

module.exports = BookModel;