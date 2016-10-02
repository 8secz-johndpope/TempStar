
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
                data.jobs = _.sortBy( data.jobs, 'dentist.practiceName' );
            }

            $('#hygienist-available-jobs-newest-sorting-button').on( 'click', sortByNewestHandler );
            $('#hygienist-available-jobs-soonest-sorting-button').on( 'click', sortBySoonestHandler );
            $('#hygienist-available-jobs-closest-sorting-button').on( 'click', sortByClosestHandler );
            $(document).on( 'click', '.job', jobPageHandler );
        });

        app.onPageBeforeRemove( 'hygienist-available-jobs', function( page ) {
            $('#hygienist-available-jobs-newest-sorting-button').off( 'click', sortByNewestHandler );
            $('#hygienist-available-jobs-soonest-sorting-button').off( 'click', sortBySoonestHandler );
            $('#hygienist-available-jobs-closest-sorting-button').off( 'click', sortByClosestHandler );
            $(document).off( 'click', '.job', jobPageHandler );
        });
    }

    function getData() {

        return new Promise( function( resolve, reject ) {
            TempStars.Api.getAvailableJobs( TempStars.User.getCurrentUser().hygienistId )
            .then( function( jobs ) {

                data = { jobs: jobs.result };

                if ( sortBy == 'newest' ) {
                    data.jobs = _.orderBy( data.jobs, ['postedOn'], ['desc'] );
                }
                if ( sortBy == 'soonest' ) {
                    data.jobs = _.orderBy( data.jobs, ['startDate'], ['asc'] );
                }
                else if ( sortBy == 'closest' ) {
                    data.jobs = _.sortBy( data.jobs, 'dentist.practiceName' );
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
            data.jobs = _.sortBy( data.jobs, 'dentist.practiceName' );
            TempStars.Hygienist.Router.reloadPage( 'available-jobs', {}, data );
        }
    }

    function jobPageHandler( e ) {
        var id = parseInt( $$(this).attr('data-id') );
        var jobData = _.find( data.jobs, { 'id': id });
        TempStars.Hygienist.Router.goForwardPage('available-job', {}, {job: jobData, workHistory: {}} );
    }

    return {
        init: init,
        getData: getData
    };

})();

TempStars.Pages.Hygienist.AvailableJobs.init();