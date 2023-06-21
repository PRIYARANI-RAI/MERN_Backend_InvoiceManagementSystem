const config = {
    local:{
    DB:{
        HOST:"localhost",
        PORT_NO:27017,
        DBNAME:"",
        USERNAME:"",
        PASSWORD:""
    },
    email:{
        host:'smtp.gmail.com',
        port:465,
        username: 'xxxxxxx@gmail.com',
        password: 'xxxxxxxxxxxxxxxxx'  
    },
    API_PORT:8200,
}
}
export const get = (env) => {
    return config [env]
}