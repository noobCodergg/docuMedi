
const documentModel = require("../models/documentModel");

exports.uploadFile = async (req, res) => {
  try {
    const name = req.body?.name;
    const category = req.body?.category;
    const uploaded_by=req.body?.uploaded_by;
    const file = req.file;

    console.log("Received:", { name, category, file,uploaded_by });

    if (!file) {
      return res.status(400).json({ message: "File is required" });
    }

    if (!name || !category || !uploaded_by) {
      return res.status(400).json({ message: "Name and category are required" });
    }

    const newDoc = await documentModel.create({
      name,
      category,
      fileUrl: file.path,
      uploaded_by
    });

    res.status(200).json({
      message: "File uploaded successfully",
      data: newDoc,
    });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getFiles = async(req,res)=>{
    try{
        const {userId} = req.params;


        const files = await documentModel.find({uploaded_by:userId})
        res.status(200).json(files)
    }catch(error){
        res.status(500).json("Internal Server Error")
    }
}



exports.getSingleFile = async(req,res) =>{
    try{
        const {id} = req.params;
        console.log(id)
        const response = await documentModel.findById(id)
        res.status(200).json(response)
    }catch(error){
        res.status(500).json("Internal Server Error")
    }
}
