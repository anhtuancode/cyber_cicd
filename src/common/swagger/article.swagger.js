const articleSwagger ={
    "/article/": {
        get:{
            tags: ["Article"],
            security:[{bearerAuth:[]}],
            parameters:[
                {name:"page", in:"query", description:"Nếu không truyền mặc định là 1"},
                {name:"pageSize", in:"query", description:"Nếu không truyền mặc định là 3"},
                {name:"x-api-key", in:"header", description:"api key"}
            ],
            responses: {
                200: {description: "Check ok"}
            }
        },
    },
    "/article/{id}":{
        get:{
            tags: ["Article"],
            security:[{bearerAuth:[]}],
            parameters:[
                {name:"id", in:"path", description:"id article"}
            ],
            responses: {
                200: {description: "Check ok"}
            }
        }
    }
}

export default articleSwagger;