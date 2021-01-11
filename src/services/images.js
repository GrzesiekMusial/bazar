var cloudinary = require("cloudinary-core");
var cl = new cloudinary.Cloudinary({
    cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
});

const get = (image) => {
    return cl.url(image);
};

export { get };
