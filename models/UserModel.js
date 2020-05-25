const Model = require('../model.js')

class UserModel extends Model{

    constructor(){
        super()
        this.table = 'user'
    }


}

module.exports = new UserModel