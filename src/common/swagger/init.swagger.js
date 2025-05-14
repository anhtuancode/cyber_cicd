import articleSwagger from "./article.swagger";
import authSwagger from "./auth.swagger";
import userSwagger from "./user.swagger";

const swaggerDocument ={
    openapi:"3.1.1",
    info:{
        title:"Nodejs-50",
        version:"1.0.0"
    },
    servers:[
        {
            url:"http://localhost:3000",
            description: "Local server"
        },
        {
            url:"https://cybernodejs50.vercel.app",
            description: "Production Server"
        }
    ],
    components:{
        securitySchemes: {
            bearerAuth:{
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    paths:{
        ...articleSwagger,
        ...authSwagger,
        ...userSwagger,
    },
}

export default swaggerDocument;