const authSwagger ={
    "/auth/login": {
        post:{
            tags: ["Auth"],
            security:[{bearerAuth:[]}],
            requestBody:{
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                email:{type:"string", example:"example@email.com"},
                                password:{type:"string", example:"1234"}
                            }
                        }
                    }
                }
            },
            responses: {
                200: {description: "Check ok"}
            }
        }
    },
}

export default authSwagger;

