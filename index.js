require("dotenv").config();


const express =require("express");
//initailaze
const mongoose=require("mongoose")


var bodyParser=require("body-parser");
//Database
const database=require("./database/database");

//Models
const BookModel=require("./database/book");
const AuthorModel=require("./database/author")
const PublicationModel=require("./database/publication");
const { findOne } = require("./database/book");

//initialize
const booky=express();

booky.use(bodyParser.urlencoded({extended:true}));
booky.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }

).then(()=>console.log("connection is esatiblished"))

/*
Route       /
Description  GET All the books
Access   PUBLIC
Parameter  NONE 
Methods    GET
*/

booky.get("/",async(req,res)=>{

    const getBooks= await BookModel.find();
    return res.json(getBooks);

});

/*
Route        /IS
Description  GET Specific the books
Access       PUBLIC
Parameter    ISBN 
Methods      GET
*/
booky.get("/is/:ISBN",async(req,res)=>{

    const getSpecificBook= await BookModel.findOne({ISBN:req.params.ISBN})
   

    if(!getSpecificBook)
    {
        return res.json({error:`No book found for the ISBN ${req.params.ISBN}`})
    }

    return res.json(getSpecificBook);
   
    /*const getSpecificBook= database.books.filter(
        (book)=> book.ISBN===req.params.ISBN
        )

        if(getSpecificBook.length===0)
        {
            return res.json({error:`No book found for the ISBN ${req.params.ISBN}`})
        }

        return res.json({book:getSpecificBook});*/
});

/*
Route        /c
Description  GET Specific the books on category
Access       PUBLIC
Parameter    category
Methods      GET
*/

booky.get("/c/:category",async(req,res)=>{

    const getSpecificBook= await BookModel.findOne({category:req.params.category})
       

        if(!getSpecificBook)
        {
            return res.json({error:`No book fond in category of ${req.params.category}`});

        }
        return res.json(getSpecificBook);
});

/*
Route        /l/
Description  GET  a list of books based on language
Access       PUBLIC
Parameter    langauage
Methods      GET
*/

booky.get("/l/:language",async(req,res)=>{

    const  getSpecificBook = await BookModel.findOne({language:req.params.language})
   

    if(!getSpecificBook)
    {
        return res.json({error:`No book found for the language ${req.params.language}`})
    }

    return res.json(getSpecificBook);
    

    /*const getSpecificBook=database.books.filter(
        (book)=> book.language===req.params.language

        )
        if(getSpecificBook.length===0)
        {
            return res.json({error:`No book found in langauage of ${req.params.language}`})
        }
        return res.json({book:getSpecificBook})*/
})

//Authors :-
/*
Route        /author
Description  GET  get all the Authors
Access       PUBLIC
Parameter    None
Methods      GET
*/

booky.get("/author",async(req,res)=>{
    const getauthor= await AuthorModel.find();
    return res.json(getauthor);
})

/*
Route        /author/book/
Description  GET   get a specific authors based on id
Access       PUBLIC
Parameter    id
Methods      GET
*/

booky.get("/author/book/:id",async(req,res)=>{

    const  getSpecificauthor = await AuthorModel.findOne({id:req.params.id})
   

    if(!getSpecificauthor)
    {
        return res.json({error:`No book found for the ID ${req.params.id}`})
    }

    return res.json(getSpecificauthor);
    
    
    
    /*const getSpecificauthor=database.author.filter(
        (authors)=>authors.id===parseInt(req.params.id)
        )

        if(getSpecificauthor.length===0)
        {
            return res.json({error:`No Author found of book based on id ${req.params.id}`});
        }

        return res.json({Data:getSpecificauthor});*/

})


/*
Route        /author/book
Description  GET  get all the Authors based on book
Access       PUBLIC
Parameter    ISBN
Methods      GET
*/

booky.get("/author/book/:isbn",async(req,res)=>{   //not Done

    const getSpecificauthor=await AuthorModel.findOne(
        {
            books:req.params.isbn
        }
        );

    if(!getSpecificauthor)
    {
        return res.json({error:`No author found for book of  ${req.params.isbn}`})
    }


    return res.json(getSpecificauthor);

    /*const getSpecificauthor=database.author.filter(
        (author)=>author.books.includes(req.params.isbn)
    );

    if(getSpecificauthor===0){

        return res.json({error:`No author found for book of ${req.params.isbn}`})

    }

    return res.json({data:getSpecificauthor});*/

});


//publication
/*
Route        /publication
Description  GET  get all the Publication
Access       PUBLIC
Parameter    None
Methods      GET
*/


booky.get("/publication",async(req,res)=>{
    const getPublication= await PublicationModel.find();
    return res.json(getPublication);
})

/*
Route        /publication/i/
Description  GET  get a Specific Publication
Access       PUBLIC
Parameter    ID
Methods      GET
*/

booky.get("/publication/i/:id",async(req,res)=>{


    const getSpecificPublication = await PublicationModel.findOne({id:req.params.id})

    if(!getSpecificPublication)
    {
        return res.json({error:` No Publication found for the ID ${req.params.id}`});
    }

    return res.json(getSpecificPublication);

    /*const getSpecificPublication=database.publication.filter(
        (publication)=>publication.id===parseInt(req.params.id)
        )

        if(getSpecificPublication.length===0)
        {
            return res.json({error:` No Publication found for the ID ${req.params.id}`});
        }

        return res.json({Data:getSpecificPublication});*/

})

/*
Route        /publication/b/
Description  GET a list of publications based on a book
Access       PUBLIC
Parameter    book
Methods      GET
*/

booky.get("/publication/b/:book",async(req,res)=>{

   
   const getSpecificPublication = await PublicationModel.findOne({books:req.params.book})
   
   if(!getSpecificPublication)
   {
    return res.json({error:`No publication found base on book ${req.params.book}`});
   }

   return res.json(getSpecificPublication);



    /*const getSpecificPublication=database.publication.filter(
        (publication)=>publication.books.includes(req.params.book)
        )

        if(getSpecificPublication.length===0)
        {
            return res.json({error:`No publication found base on book ${req.params.book}`});

        }

        return res.json({Data:getSpecificPublication});*/
})

/*
Route        /book/new
Description  Add New Book
Access       PUBLIC
Parameter    None
Methods      POST
*/

booky.post("/book/new",async(req,res)=>{
    const {newBook }=req.body;
    const addNewBook=BookModel.create(newBook);
    return res.json({books:addNewBook,message:"Books was uploaded "}) 


    //database.books.push(newBook);

    //return res.json({updatedBook:database.books})

});

/*
Route        /author/new
Description  Add New author
Access       PUBLIC
Parameter    None
Methods      POST
*/

booky.post("/author/new",(req,res)=>{
    const {newAuthor}=req.body;
    const addNewAuthor=AuthorModel.create(newAuthor);
    return res.json({books:addNewAuthor,message:"Authors was uploaded "}) 


    //database.author.push(newAuthor);
    //return res.json(database.author);

})

/*
Route        /book/author/update/
Description  update author
Access       PUBLIC
Parameter    ISBN
Methods      PUT
*/

booky.put("/book/author/update/:isbn",async(req,res)=>{

    //update book database

    const updatedBook= await BookModel.findOneAndUpdate(
        {
            ISBN : req.params.isbn
        },
        {
            $addToSet: {
                author:req.body.newAuthor
            }
        },
        {
            new:true
        }
    );

    //update the author

    const updatedAuthor=await AuthorModel.findOneAndUpdate(
        {
          id : req.body.newAuthor  
        },
        {
            $addToSet : {
               books: req.params.isbn 
            }
        }
    )

    return res.json({books:updatedBook,author:updatedAuthor,message:"aut"})


});

/*
Route        /publication/new
Description  Add New Publication
Access       PUBLIC
Parameter    None
Methods      POST
*/

booky.post("/publication/new",(req,res)=>{

    const {newPublication} = req.body;
    const addNewPublication = PublicationModel.create(newPublication);
    return res.json({publication:addNewPublication,message:"New Publication is uploaded"});


    //database.publication.push(newPublication);
})

/*
Route        /books/update
Description  Book Update
Access       PUBLIC
Parameter    None
Methods      POST
*/

booky.post("/books/update",async(req,res)=>{

   // const postSpecificBook = await PublicationModel.findOne({books})
    
    
    const postSpecificBook=req.body

    if(database.publication===0)
    {
        database.books.push(postSpecificBook);
        return res.json(postSpecificBook)
    }
    else{

       // const update1=database.books.filter(
        //    (update1)=>database.books.update(req.body)
            
           // )
        return res.json({Data:update1});    

        //return res.json("Database is already occupied");
    }

})

/*
Route        /publication/update/book/
Description  update  book on isbn
Access       PUBLIC
Parameter    ISBN
Methods      PUT
*/

booky.put("/book/update/:isbn",async(req,res)=>{

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn

        },
        {

            title: req.body.booktitle
        },
        {
            new:true
        }
    );

    return res.json({book:updatedBook});

});






/*
Route        /publication/update/book/
Description  update or Add new publication
Access       PUBLIC
Parameter    ISBN
Methods      PUT
*/

booky.put("/publication/update/book/:isbn",async(req,res)=>{

//update the publication database
const updatedPubDatabase = await PublicationModel.findOneAndUpdate(
    {
        
        id : req.body.pubID
    },
    {
        $addToSet :{
            books:req.params.isbn
        }
    },
    {
        new:true
    }
);


///database.publication.forEach((pub)=>{
    //if(pub.id===req.body.pubID) {

    //    return pub.books.push(req.params.isbn);
  //  }

//})


 //update the  book Database :-

 const updatedBook = await BookModel.findOneAndUpdate(
    {
        ISBN: req.params.isbn

    },
    {

        $push :{

            publication :req.body.pubID
        }
    },
    {
        new:true
    }
);

/* database.books.forEach((books)=>
 {

    if(books.ISBN === req.param.isbn)
    {
        books.publication=req.body.pubID;
        return;
    }

})*/

  return res.json({book:updatedBook,publication:updatedPubDatabase,message:"Scussefully Updated publications"})

})

/*  DELETE ====
Route        //book/delete/
Description  Delete a Boook
Access       PUBLIC
Parameter    ISBN
Methods      DELETE
*/



booky.delete("/book/delete/:isbn",async(req,res)=>{
//whichever book is not match


const updateBookDatabase =await BookModel.findOneAndDelete(
    {
        ISBN:req.params.isbn
    } 
);

return res.json({books:updateBookDatabase})


/*const updateBookDatabase= database.books.filter(
        (book)=>book.ISBN !==req.params.isbn
    )
    database.books=updateBookDatabase;
    
    return res.json({books:database.books});*/
})

/*  DELETE ====
Route       /author/delete/
Description  Delete author from Book:-
Access       PUBLIC
Parameter    ID
Methods      DELETE
*/

booky.delete("/author/delete/:id",async(req,res)=>{

    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
        {
            id : req.params.id
        } 
    );
    return res.json({Authors:updatedAuthorDatabase,message:"Author is Updated"})



    /*const updateAuthorDatabase=database.author.filter(
        (authors)=>authors.id===parseInt(req.params.id)

        )
        database.author=updateAuthorDatabase;
      
        return res.json({Authors:database.author,message:"Authors Updated"})*/
})





/*  DELETE ====
Route        /book/delete/author/
Description  Delete author from related book from author
Access       PUBLIC
Parameter    ISBN,authorId
Methods      DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId",async(req,res)=>{


    const isbn = req.params.isbn;
    const author_ = parseInt(req.params.authorId);

    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: isbn },
        { $pull: { authors: author_ } },
        { new: true }
    );

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        { id: author_ },
        { $pull: { books: isbn } },
        { new: true }
    );

    /*database.author.forEach((eachAuthor) => {
        if(eachAuthor.id === parseInt(req.params.authorId)) {
          const newBookList = eachAuthor.books.filter(
            (book) => book !== req.params.isbn
          );
          eachAuthor.books = newBookList;
          return;
        }
      });*/

      return res.json({
        book: updatedBook,
        author: updatedAuthor,
        message: "Author was deleted!!!!"
      });
    
    });


booky.listen(3001,()=>{

    console.log("Server Is Running on Port 3001");
})

