var multiparty = require('multiparty');

exports.parse = function() {
  return function (req, res, next) {
    if (req.is('multipart/form-data') === true) {
      var form = new multiparty.Form();
      form.parse(req, function(err, fields, files) {
        if (err) return next(err);
        console.log(err);
        console.log(fields);
        next();
      });
    } else {
      next();
    }
  }
}