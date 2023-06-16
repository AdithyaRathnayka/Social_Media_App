import User from "../models/User.js";

//Read
export const getUser = async (req, res) =>{
    try{
        const{id} = req.params;
        const user = await User.friendById(id);
        res.status(200).json(user);

    }catch(err){
        res.status(404).json({message:err.message});

    }
}

export const getUserFriends = async(req, res)=>{

   try{const{id} = req.params;
   const user = await User.friendById(id);

   const friends = await Promise.all(
       user.friends.map((id)=> user.friendById(id))
   );

   const formattedFriends = friends.map(
       ({_id, firstName, lastName, occupation, location, picturePath})=>{
           return{_id, firstName, lastName, occupation, location, picturePath};  
       }
   );
   res.status(200).json(formattedFriends);
}catch(err){
    res.status(404).json({message:err.message});

} 
    
};

//update
export const addRemoveFriend = async(req,res )=>{
    try{
        const {id, friendId} =req.params;
        const user = await User.findById(id);
        const friend = await User.friendById(friendId);
        
        if (user.friends.includes(friendId)){
            user.friend = user.friends.filter((id)=> id !== friendId);
            friend.friends = friend.friends.filter((id)=> id !== id);
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);   
        }

        //save the updated context
        await user.save();
        await friend.save();

        
        const friends = await Promise.all(
        user.friends.map((id)=> user.friendById(id))
    );

        const formattedFriends = friends.map(
        ({_id, firstName, lastName, occupation, location, picturePath})=>{
        return{_id, firstName, lastName, occupation, location, picturePath};  
        }
    );

    res.status(200).json(formattedFriends);
    
    }catch(err){
        res.status(404).json({message:err.message});
    }
}