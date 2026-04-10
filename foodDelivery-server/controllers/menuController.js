
const Menu = require('../models/Menus')
const getMenuController = async(req,res)=>{
        try{
                const responce = await Menu.find()
                console.log(responce)
                return res.status(200).json(responce)
        }
        catch(error){
            return res.status(500).json({
                message:`Not able to fetch.${error.message}`
            })
        }
}

module.exports = {getMenuController}

