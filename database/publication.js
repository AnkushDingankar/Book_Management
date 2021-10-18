const mongoose=require("mongoose");

//crete a book Schema:-
const PublicationSchema = mongoose.Schema(
{
    id:Number,
    name:String,
    books:[String]

}

);

const PublicationModel = mongoose.model("publication",PublicationSchema);

module.exports = PublicationModel;