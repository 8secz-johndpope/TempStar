
TempStars.Pages.Hygienist.AvailableJobs = (function() {

    'use strict';

    var data;
    var sortBy = 'newest';

    function init() {
        app.onPageBeforeInit( 'hygienist-available-jobs', function( page ) {

            if ( sortBy == 'newest' ) {
                $('#hygienist-available-jobs-newest-sorting-button').addClass('active').siblings().removeClass('active');
                data.jobs = _.orderBy( data.jobs, ['postedOn'], ['desc'] );
            }
            else if ( sortBy == 'soonest' ) {
                $('#hygienist-available-jobs-soonest-sorting-button').addClass('active').siblings().removeClass('active');
                data.jobs = _.orderBy( data.jobs, ['startDate'], ['asc'] );
            }
            else if ( sortBy == 'closest' ) {
                $('#hygienist-available-jobs-closest-sorting-button').addClass('active').siblings().removeClass('active');
                data.jobs = _.sortBy( data.jobs, ['distance'], ['asc'] );
            }

            $('#hygienist-available-jobs-newest-sorting-button').on( 'click', sortByNewestHandler );
            $('#hygienist-available-jobs-soonest-sorting-button').on( 'click', sortBySoonestHandler );
            $('#hygienist-available-jobs-closest-sorting-button').on( 'click', sortByClosestHandler );

            $(document).on( 'click', '.job', jobPageHandler );

            $(document).on( 'opened', '.popover-rate', openRatePopoverHandler );
            $(document).on( 'closed', '.popover-rate', closeRatePopoverHandler );

            TempStars.Analytics.track( 'Viewed Available Jobs' );
        });

        app.onPageBeforeRemove( 'hygienist-available-jobs', function( page ) {
            $('#hygienist-available-jobs-newest-sorting-button').off( 'click', sortByNewestHandler );
            $('#hygienist-available-jobs-soonest-sorting-button').off( 'click', sortBySoonestHandler );
            $('#hygienist-available-jobs-closest-sorting-button').off( 'click', sortByClosestHandler );

            $(document).off( 'click', '.job', jobPageHandler );

            $(document).off( 'opened', '.popover-rate', openRatePopoverHandler );
            $(document).off( 'closed', '.popover-rate', closeRatePopoverHandler );
        });
    }

    function openRatePopoverHandler( e ) {
        // Forces resuming app to stay on page
        window.cameraOpen = true;
    }

    function closeRatePopoverHandler(e) {
        // Forces resuming app to go to main page
        window.cameraOpen = false;
    }

    function getData() {
        return new Promise( function( resolve, reject ) {
            var hygienistId = TempStars.User.getCurrentUser().hygienistId;
            var inviteCode = TempStars.User.getCurrentUser().inviteCode;
            var rate;
            var inviteRate;

            TempStars.Api.getHygienistRate( hygienistId )
            .then( function( r ) {
                rate = r;
                return TempStars.Api.getAvailableJobs( hygienistId );
            })
            .then( function( jobs ) {

                data = {
                    jobs: jobs.result,
                    rate: rate.result.rate.toFixed(2),
                    baseRate: rate.result.baseRate.toFixed(2),
                    inviteAdjustment: rate.result.inviteAdjustment.toFixed(2)
                };

                if ( jobs.result.length == 0 ) {
                    resolve( data );
                    return;
                }
                var maxJob = _.maxBy( data.jobs, 'id' );
                TempStars.User.updateLastJobId( maxJob.id );

                if ( sortBy == 'newest' ) {
                    data.jobs = _.orderBy( data.jobs, ['postedOn'], ['desc'] );
                }
                if ( sortBy == 'soonest' ) {
                    data.jobs = _.orderBy( data.jobs, ['startDate'], ['asc'] );
                }
                else if ( sortBy == 'closest' ) {
                    data.jobs = _.sortBy( data.jobs, ['distance'], ['asc'] );
                }

                resolve( data );
            })
            .catch( function( err ) {
                app.alert('Error retrieving jobs. Please try again' );
                reject( err );
            });
        });
    }

    function sortByNewestHandler( e ) {
        sortBy = 'newest';
        $(this).addClass('active').siblings().removeClass('active');

        if ( data && data.jobs ) {
            data.jobs = _.orderBy( data.jobs, ['postedOn'], ['desc'] );
            TempStars.Hygienist.Router.reloadPage( 'available-jobs', {}, data );
        }
    }

    function sortBySoonestHandler( e ) {
        sortBy = 'soonest';
        $(this).addClass('active').siblings().removeClass('active');

        if ( data && data.jobs ) {
            data.jobs = _.orderBy( data.jobs, ['startDate'], ['asc'] );
            TempStars.Hygienist.Router.reloadPage( 'available-jobs', {}, data );
        }
    }

    function sortByClosestHandler( e ) {
        sortBy = 'closest';
        $(this).addClass('active').siblings().removeClass('active');

        if ( data && data.jobs ) {
            data.jobs = _.sortBy( data.jobs, ['distance'], ['asc'] );
            TempStars.Hygienist.Router.reloadPage( 'available-jobs', {}, data );
        }
    }

    function jobPageHandler( e ) {
        var id = parseInt( $$(this).attr('data-id') );
        var jobData = _.find( data.jobs, { 'id': id });
        TempStars.Hygienist.Router.goForwardPage('available-job', {}, {job: jobData, workHistory: {}, rate: data.rate, baseRate: data.baseRate, inviteAdjustment: data.inviteAdjustment} );
    }

    return {
        init: init,
        getData: getData
    };

})();

TempStars.Pages.Hygienist.AvailableJobs.init();
