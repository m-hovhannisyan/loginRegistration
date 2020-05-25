const Model = require('../model.js')

class PhotoModel extends Model{

    constructor(){
        super()
        this.table = 'userimg'
    }


}

module.exports = new PhotoModel