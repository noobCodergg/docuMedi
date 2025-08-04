const express = require("express");
const upload = require("../middlewares/multer");
const { uploadFile, getFiles, getSingleFile } = require("../controllers/fileController");



const router = express.Router();

router.post('/upload-file',upload.single("file"),uploadFile)
router.get('/get-files/:userId',getFiles)
router.get('/get-single-file/:id',getSingleFile)



module.exports = router;