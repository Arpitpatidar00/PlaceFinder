import User from '../models/User.js'



//update user

export const updateUser=async(req,res)=>{
    const id =req.params.id;

    try {
        const updateUser=await User.findByIdAndUpdate(
            id,
            {
                $set:req.body,

            },
            {new:true}
        );
        res.status(200).json({
            success:true,
            message :"successfully updated",
            data:updateUser,
        });

        
    }catch (err){
        res.status(500).json({
            success:false,
            message :"failed to update ",
            

    });

    }
};
//delete User
export const deleteUser=async(req,res)=>{
    const id =req.params.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message :"successfully delete",
        
        });

        
    }catch (err){
        res.status(500).json({
            success:false,
            message :"failed to delete ",
            

    });

    }
};


//getSingle User
export const getSinleUser=async(req,res)=>{
    const id =req.params.id;

    try {
        const User=await User.findById(id);
        res.status(200).json({
            success:true,
            message :"successfully",
            data:User,
        
        });

        
    }catch (err){
        res.status(404).json({
            success:false,
            message :"not found",
            

    });

    }
};


//get all user
export const getAllUsers=async(req,res)=>{

    try {
        const users=await User.find({})

         res.status(200).json({  
            success:true,
            message:"successfully",
            data:users,
        });

        
    }catch (err){
        res.status(404).json({
            success:False,
            message:"not found ",
            
    });

}
};

