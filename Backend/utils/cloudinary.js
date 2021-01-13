require('dotenv').config()
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name : "supersheep",
    api_key : "493192273215927",
    api_secret : "lnk8n_7Bpiin_KU50_oGxRmoOBg"
})


module.exports = {cloudinary}