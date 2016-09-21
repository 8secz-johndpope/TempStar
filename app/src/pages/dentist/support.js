
TempStars.Pages.Dentist.Support = (function() {

    'use strict';

    return {
        getData: function() {
            return Promise.resolve( {
                version: TempStars.version,
                platform: device.platform,
                platformVersion: device.version,
                manufacturer: device.manufacturer,
                model: device.model
            });
        }
    };

})();
