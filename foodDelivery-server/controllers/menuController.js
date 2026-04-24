const Menu = require('../models/Menus')
const getMenuController = async(req,res)=>{
        try{
                const responce = await Menu.find({}).sort({createdAt:-1})
                console.log(responce)
                return res.status(200).json(responce)
        }
        catch(error){
            return res.status(500).json({
                message:`Not able to fetch.${error.message}`
            })
        }
}

const postMenuItems = async(req,res)=>{
    try{
         const newItem = req.body
         const result = await Menu.create(newItem)
         return res.status(200).json(result)
    }
    catch(error){
         return res.status(500).json({
            message:error.message
         })
    }
}


const deleteMenuItems = async(req,res)=>{
      try{
           const menuId = req.params.id
           const deleteItem = await Menu.findByIdAndDelete(menuId)

           if(!deleteItem){
            return res.status(404).json({
                message:"Menu Item Not Found"
            })
           }
           return res.status(200).json({message:"Menu Deleted Successfully"})
      }
      catch(error){
          return res.status(500).json({
            message:error.message
          })
      }
}


const singleMenuItem = async(req,res)=>{
     try{
         const menuId = req.params.id
         const menu = await Menu.findById(menuId)
        }
        catch(error){
            return res.status(500).json({
                message:error.message
            })
        }

}


const updateMenuItem = async(req,res)=>{
      try{
           const menuId = req.params.id
           const {name,recipe,image,category,price} = req.body

           const updateMenu = await Menu.findByIdAndUpdate(menuId,{name,recipe,image,category,price},{new:true , runValidator:true})
           if(!updateMenu){
               return res.status(404).json({
                   message:"Menu Item Not Found"
                })
            }
            
            return res.status(200).json(updateMenu)

        }catch(error){
         return res.status(500).json({
            message:error.message
         })
      }


}


module.exports = {getMenuController, postMenuItems,deleteMenuItems,singleMenuItem,updateMenuItem}

