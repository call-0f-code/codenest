const Module = require("../models/module");

exports.createModule = async(req , res) =>{
    try{

        const {title , description , questions , createdBy} = req.body;

        const newModule = new Module({
            title , description , questions , createdBy
        });

        const savedModule = await newModule.save();

        return res.status(200).json({
            success : true,
            message : "Moudle Created Succesfully",
            data: savedModule
        });

        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "Unable to create new module"
        });
    }
}

exports.getAllModules = async(req , res)=>{
    
    try{
        const module = await Module.find().sort({createdAt : -1});

        return res.status(200).json({
            success : true,
            message : "All modules have been fetched",
            data : module
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            error : err.message,
            message : "Faild to fetch module"
        })
    }
}

exports.deleteModule = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedModule = await Module.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      data: deletedModule,
      message: "Module was deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      succces: false,
      error: err.message,
      message: "Unable to delete the Module",
    });
  }
};