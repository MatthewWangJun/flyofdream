'use strict';
/*
* 二维码生成
* */
var captchapng = require('captchapng');


module.exports = {
  init: function(app) {
    app.get('/securityCode', function(req, res){
      var code = Math.random(10).toFixed(4).toString().replace(/^\d\./, '');
      var p = new captchapng(130,34, code);
      p.color(0, 0, 0, 0);
      p.color(80, 80, 80, 255);

      var img = p.getBase64();
      var imgbase64 = new Buffer(img,'base64');
      res.writeHead(200, {
        'Content-Type': 'image/png'
      });
      req.session.securityCode = code;
      res.end(imgbase64);
    });
  },
  checkSecurityCode: function(req, code){
    // ABE19ED358CDF118AEEDAD275E71D180 为测试用万能验证码。
    return code == req.session.securityCode || code == 'ABE19ED358CDF118AEEDAD275E71D180';
  }
}
