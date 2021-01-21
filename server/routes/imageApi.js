const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
  cloud_name: 'idoerez', 
  api_key: '616214418515878', 
  api_secret: 'xJC_OdgSX2OhxghjyyqgHx0uvdQ' 
});

router.post('/uploadImage', function(req, res) {
    let image = req.body.get('file')
    cloudinary.uploader.upload(image, 'idoerez', function(err, result) {
        res.send({imgUrl: result.secure_url, imgId: result.public_id})
    });
})

router.post('/destroyImage', function(req, res) {
    let imageId = req.body.id
    cloudinary.uploader.destroy(imageId, function(err, result) {
        console.log(result)
        res.send(result)
    });
})

module.exports = router
