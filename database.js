const books =[
{
    ISBN:"1234Book",
    title:"Tesla!!",
    language: "en",
    pubDate:"2021-08-05",
    numPage:250,
    author:[1,2],
    publication:[1],
    category:["tech","space","education"]

}
]

const author =[
    {
        id:1,
        name:"Ankush",
        books:["12345872","secreateBook"]

    },

    {
        id:2,
        name:"Elon Musk",
        books:["12345873","secreateBook"]

    }
]

const publication =[

    {
        id:1,
        name:"writex",
        books:["1234Books"]
    }

]

module.exports={books,author,publication};