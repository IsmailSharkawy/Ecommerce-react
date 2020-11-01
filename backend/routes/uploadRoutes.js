import multer from 'multer'
import path from 'path'
import express from 'express'
const router = express.Router()

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/')
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}` //last part to get extention of uploaded folder preceded by the dot
		)
	},
})

function checkFileType(file, cb) {
	//will only return true for img files else will ask for images
	const filetypes = /jpg|jpeg|png/
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	const mimetype = filetypes.test(file.mimetype)

	if (mimetype && extname) {
		return cb(null, true)
	} else {
		cb('Images only')
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb)
	},
})

router.post('/', upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`)
})
export default router
