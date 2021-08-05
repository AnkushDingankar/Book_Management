const express =require("express");
//Database
const database=require("./database");

//initialize
const booky=express();

/*
Route       /
Description  GET All the books
Access   PUBLIC
Parameter  NONE 
Methods    GET
*/

booky.get("/",(req,res)=>{

    return res.json({books:database.books});
});

/*
Route        /IS
Description  GET Specific the books
Access       PUBLIC
Parameter    ISBN 
Methods      GET
*/
booky.get("/is/:ISBN",(req,res)=>{

    const getSpecificBook=database.books.filter(
        (book)=> book.ISBN===req.params.ISBN
        )

        if(getSpecificBook.length===0)
        {
            return res.json({error:`No book found for the ISBN ${req.params.ISBN}`})
        }

        return res.json({book:getSpecificBook});
});

/*
Route        /c
Description  GET Specific the books on category
Access       PUBLIC
Parameter    category
Methods      GET
*/

booky.get("/c/:category",(req,res)=>{

    const getSpecificBook=database.books.filter(
        (book)=>book.category.includes(req.params.category)
        
        )

        if(getSpecificBook.length===0)
        {
            return res.json({error:`No book fond in category of ${req.params.category}`});

        }
        return res.json({book:getSpecificBook});
});

/*
Route        /l/
Description  GET  a list of books based on language
Access       PUBLIC
Parameter    langauage
Methods      GET
*/

booky.get("/l/:language",(req,res)=>{

    const getSpecificBook=database.books.filter(
        (book)=> book.language===req.params.language

        )
        if(getSpecificBook.length===0)
        {
            return res.json({error:`No book found in langauage of ${req.params.language}`})
        }
        return res.json({book:getSpecificBook})
})

//Authors :-
/*
Route        /author
Description  GET  get all the Authors
Access       PUBLIC
Parameter    None
Methods      GET
*/

booky.get("/author",(req,res)=>{

    return res.json({authors:database.author});

})

/*
Route        /author/book/
Description  GET   get a specific authors based on id
Access       PUBLIC
Parameter    id
Methods      GET
*/

booky.get("/author/book/:id",(req,res)=>{

    const getSpecificauthor=database.author.filter(
        (authors)=>authors.id===parseInt(req.params.id)
        )

        if(getSpecificauthor.length===0)
        {
            return res.json({error:`No Author found of book based on id ${req.params.id}`});
        }

        return res.json({Data:getSpecificauthor});

})


/*
Route        /author/book
Description  GET  get all the Authors based on book
Access       PUBLIC
Parameter    ISBN
Methods      GET
*/

booky.get("/author/book/:isbn",(req,res)=>{
    const getSpecificauthor=database.author.filter(
        (author)=>author.books.includes(req.params.isbn)
    );

    if(getSpecificauthor===0){

        return res.json({error:`No author found for book of ${req.params.isbn}`})

    }

    return res.json({data:getSpecificauthor});

});


//publication
/*
Route        /publication
Description  GET  get all the Publication
Access       PUBLIC
Parameter    None
Methods      GET
*/


booky.get("/publication",(req,res)=>{

    return res.json({publication:database.publication});
})

/*
Route        /publication/i/
Description  GET  get a Specific Publication
Access       PUBLIC
Parameter    ID
Methods      GET
*/

booky.get("/publication/i/:id",(req,res)=>{

    const getSpecificPublication=database.publication.filter(
        (publication)=>publication.id===parseInt(req.params.id)
        )

        if(getSpecificPublication.length===0)
        {
            return res.json({error:` No Publication found for the ID ${req.params.id}`});
        }

        return res.json({Data:getSpecificPublication});

})

/*
Route        /publication/b/
Description  GET  a list of publications based on a book
Access       PUBLIC
Parameter    book
Methods      GET
*/

booky.get("/publication/b/:book",(req,res)=>{

    const getSpecificPublication=database.publication.filter(
        (publication)=>publication.books.includes(req.params.book)
        )

        if(getSpecificPublication.length===0)
        {
            return res.json({error:`No publication found base on book ${req.params.book}`});

        }

        return res.json({Data:getSpecificPublication});
})

booky.listen(3001,()=>{

    console.log("Server Is Running on Port 3001");
})

