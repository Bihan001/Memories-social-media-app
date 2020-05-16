const multer = require('multer');

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file) {
      cb(null, true);
    } else if (!file.mimetype.match(/jpg|jpeg|png|gif$i/)) {
      cb(new Error('File is not supported'), false);
    } else {
      cb(null, true);
    }
  },
});
