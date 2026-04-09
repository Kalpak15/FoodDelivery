

function func() {
       
    try{
         arr.forEach(async(item)=>{
            let obj = {
                name:item.name,
                recipe:item.recipe,
                image:item.image,
                category:item.category,
                price:item.price
            }
            const responce = await Menu.insertOne(obj)
            console.log(responce)
         })
    }
    catch(e){
        console.log(e)
    }
 }


 func()