// const express = require('express')
// const cors = require('cors')
// const multer = require('multer')
// const bodyParser = require('body-parser')

// const app = express()

// app.use(cors())

// app.use(bodyParser.urlencoded({ extended: true }))



// // upload.array('img', 5),
// app.post('/upload-img', (req, res) => {

//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             // console.log(file)
//             cb(null, 'images')
//         },
//         filename: (req, file, cb) => {
//             cb(null, file.originalname)
//         }
//     })

//     const upload = multer({ storage: storage }).single('img')
//     upload(req, res, (err) => {
//         console.log(req.file)
//     })
// })

let express = require('express')
let cors = require('cors')
let app = express()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ dest: "uploads/" })

app.use(cors())

app.get('/', function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.post('/upload-image', upload.single('image'), (req, res) => {
res.json({status: true, msg: "Image Uploaded"})
})

app.listen(5000, function () {
    console.log('Server listening on port 5000')
})
