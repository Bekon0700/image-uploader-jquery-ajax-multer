const express = require('express')
const cors = require('cors')
const multer = require('multer')

const app = express()

app.use(cors())


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file)
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

app.post('/upload-img', upload.single('img'), (req, res) => {
    console.log(req.file)
    res.status(200).json({
        status: 'Upload Successfully'
    })
})


app.listen(4500, () => {
    console.log('Server is running on port 4500...')
})