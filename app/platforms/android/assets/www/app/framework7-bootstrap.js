
(function () {
if (Framework7.prototype.device.android) {
      Dom7('head').append(
          '<link rel="stylesheet" href="f7/css/framework7.material.min.css">' +
          '<link rel="stylesheet" href="f7/css/framework7.material.colors.min.css">' +
          '<link rel="stylesheet" href="app/app.css">'
      );
  }
  else {
      Dom7('head').append(
          '<link rel="stylesheet" href="f7/css/framework7.ios.min.css">' +
          '<link rel="stylesheet" href="f7/css/framework7.ios.colors.min.css">' +
          '<link rel="stylesheet" href="app/app.css">'
      );
  }
})();
