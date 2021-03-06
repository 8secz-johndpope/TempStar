
TempStars.Dentist = (function() {
    'use strict';

    return {
        setupAccount: function setupAccount( data ) {
            var dentistId = data.user.dentistId;
            return TempStars.Api.setupDentistAccount( dentistId, data );
        },

        addPaymentInfo: function addPaymentInfo( token ) {
            var data = { token: token };
            return TempStars.Api.addPaymentInfo( TempStars.User.getCurrentUser().dentistId, data );
        },

        getAllJobs: function getAllJobs() {
            return TempStars.Api.getDentistJobs( TempStars.User.getCurrentUser().dentistId );
        },

        getJob: function getJob( jobId ) {
            return TempStars.Api.getDentistJob( TempStars.User.getCurrentUser().dentistId, jobId );
        },

        getPosted: function getPosted() {
            var filter = '{"where":{"status":' + status.POSTED + '}';
            return TempStars.Api.getDentistJobs( TempStars.User.getCurrentUser().dentistId, filter );
        },

        getWithPartialOffers: function getWithPartialOffers() {
            var filter = '{"where":{"status":' + status.PARTIAL + '}';
            return TempStars.Api.getDentistJobs( TempStars.User.getCurrentUser().dentistId, filter );
        },

        getConfirmed: function getConfirmed() {
            var filter = '{"where":{"status":' + status.CONFIRMED + '}';
            return TempStars.Api.getDentistJobs( TempStars.User.getCurrentUser().dentistId, filter );
        },

        getCompleted: function getCompleted() {
            var filter = '{"where":{"status":' + status.COMPLETED + '}';
            return TempStars.Api.getDentistJobs( TempStars.User.getCurrentUser().dentistId, filter );
        },

        getJobsByDate: function getJobByDate( date ) {
            var filter = {where: {startDate: date }};
            var filterString = JSON.stringify( filter );
            return TempStars.Api.getDentistJobs( TempStars.User.getCurrentUser().dentistId, filterString );
        }
    };
})();
