class ErrorService {
    constructor() { }
    parseError(err) {
        let name = err.name
        let msg = err.message

        if(name==="SequelizeUniqueConstraintError"){
            msg="User exists, use another one"
        }
        return { error: `${name} : ${msg}` }
    }
}

module.exports = new ErrorService()