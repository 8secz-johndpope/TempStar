
TempStars.Pages.Hygienist.JobCompleted = (function() {
    'use strict';

    var job;

    function init() {
        app.onPageBeforeInit( 'job-completed', function( page ) {
            // $$('#hygienist-job-completed-paid-checkbox').on( 'change', paidToggleHandler );
            // $$('#hygienist-job-completed-survey-checkbox').on( 'change', surveyToggleHandler );
            $$('#hygienist-job-completed-notes-save-button').on( 'click', saveNotesHandler );
            $$('#hygienist-job-completed-view-invoice-button').on( 'click', viewInvoiceHandler );
            $$('#hygienist-job-completed-view-survey-button').on( 'click', viewSurveyHandler );
        });

        app.onPageBeforeRemove( 'job-completed', function( page ) {
            // $$('#hygienist-job-completed-paid-checkbox').off( 'change', paidToggleHandler );
            // $$('#hygienist-job-completed-survey-checkbox').off( 'change', surveyToggleHandler );
            $$('#hygienist-job-completed-notes-save-button').off( 'click', saveNotesHandler );
            $$('#hygienist-job-completed-view-invoice-button').off( 'click', viewInvoiceHandler );
            $$('#hygienist-job-completed-view-survey-button').off( 'click', viewSurveyHandler );
        });
    }

    function saveNotesHandler( e ) {
        e.preventDefault();

        var jobId = $$(this).attr('data-id');
        var notes = $$('#hygienist-job-completed-notes').val();

        app.showPreloader('Saving Notes');
        TempStars.Api.updateJob( jobId, { hygienistPrivateNotes: notes} )
        .then( function() {
            app.hidePreloader();
            TempStars.Hygienist.Router.goBackPage('home');
        })
        .catch( function( err ) {
            app.hidePreloader();
            app.alert( 'Error saving notes. Please try again.' );
        });
    }

    // function paidToggleHandler( e ) {
    //     var isChecked = $$(this).prop('checked');
    //     var invoiceId = $$(this).attr('data-id');
    //
    //     if ( isChecked ) {
    //         TempStars.Api.updateInvoice( invoiceId, {dentistMarkedPaid: 1} )
    //         .then( function() {
    //             $$('#hygienist-job-completed-paid-label').html( 'paid!');
    //         });
    //     }
    //     else {
    //         TempStars.Api.updateInvoice( invoiceId, {dentistMarkedPaid: 0} )
    //         .then( function() {
    //             $$('#hygienist-job-completed-paid-label').html( 'NOT paid');
    //         });
    //     }
    // }

    // function surveyToggleHandler( e ) {
    //     var isChecked = $$(this).prop('checked');
    //     var jobId = $$(this).attr('data-id');
    //
    //     if ( isChecked ) {
    //         TempStars.Api.updateJob( jobId, {dentistEvalComplete: 1} )
    //         .then( function() {
    //             $$('#hygienist-job-completed-survey-label').html( 'done!');
    //         });
    //     }
    //     else {
    //         TempStars.Api.updateJob( jobId, {dentistEvalComplete: 0} )
    //         .then( function() {
    //             $$('#hygienist-job-completed-survey-label').html( 'NOT done');
    //         });
    //     }
    // }

    function viewInvoiceHandler( e ) {
        var id = parseInt( $$(this).attr('data-id') );
        TempStars.Hygienist.Router.goForwardPage( 'invoice', {}, job );
    }

    function viewSurveyHandler( e ) {
        app.modal({
          title:  'Rate Dental Office',
          text: 'How happy would you be to work at this office again?',
          verticalButtons: true,
          buttons: [
            {
                text: 'Very Happy',
                onClick: function() {
                    app.alert('Great, they will be added to your favourites.', function() {
                        saveSurvey( TempStars.Survey.VERY_HAPPY );
                    });
                }
            },
            {
                text: 'Pleased',
                onClick: function() {
                    app.alert('Thanks, all set.', function() {
                        saveSurvey( TempStars.Survey.PLEASED );
                    });
                }
            },
            {
                text: 'No Thank You!',
                onClick: function() {
                    app.alert('Sorry, they will be added to your blocked list.', function() {
                        saveSurvey( TempStars.Survey.NO_THANK_YOU );
                    });
                }
            }
          ]
        });
    }

    function saveSurvey( result ) {

        app.showPreloader('Saving Survey');
        TempStars.Api.updateJob( job.id, {hygienistSurvey: result} )
        .then( function() {
            var data = { dentistId: job.dentistId };

            if ( result == TempStars.Survey.VERY_HAPPY ) {
                return TempStars.Api.addFavouriteDentist( job.hygienistId, data );
            }
            else if ( result == TempStars.Survey.NO_THANK_YOU ) {
                return TempStars.Api.addBlockedDentist( job.hygienistId, data );
            }
            else {
                return Promise.resolve();
            }
        })
        .then( function() {
            app.hidePreloader();
            TempStars.Hygienist.Router.reloadPage('job-completed', { id: job.id } );
        })
        .catch( function() {
            app.hidePreloader();
            app.alert( 'Error saving survey. Please try again.' );
        });
    }

    return {
        init: init,
        getData: function( params ) {
            return new Promise( function( resolve, reject ) {
                if ( params.id ) {
                    TempStars.Api.getHygienistJob( TempStars.User.getCurrentUser().hygienistId, params.id )
                        .then( function( job ) {
                        resolve( job );
                    })
                    .catch( function( err ) {
                        reject( err );
                    });
                }
                else {
                    TempStars.Hygienist.getJobsByDate( params.date )
                    .then( function( jobs ) {
                        job = jobs[0];
                        resolve( job );
                    })
                    .catch( function( err ) {
                        reject( err );
                    });
                }

            });
        }
    };

})();

TempStars.Pages.Hygienist.JobCompleted.init();