import UserModel from "../Schema/UserModel.js"
export async function signup(req,res){
    try{
        const {id,first_name,last_name,primary_email_address_id,email_addresses}=req.body.data;
        // console.log(id,first_name,last_name,primary_email_address_id,email_addresses);
        // console.log(email_addresses[0])
        
        let name = (first_name)? first_name:"" + (last_name)? last_name:""; 
        const doc = new UserModel({
           name :name,
           Clerk_id: id, 
           email:email_addresses[0].email_address
        })
      const results =  await doc.save();
      console.log(results);
       return res.status(200);
    }
    catch(error)
    {
        console.log(error);
        console.log(error.message);
        return res.status(400);
    }
}