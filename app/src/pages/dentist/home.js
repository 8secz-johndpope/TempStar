
TempStars.Pages.Dentist.Home = (function() {
    'use strict';

    var interval,
        calendar,
        data,
        pageInit,
        surveyJobs;

    function init() {
        pageInit = app.onPageBeforeInit( 'dentist-home', function( page ) {
            data = page.context;
            mainView.showNavbar();
            displayCalendar( page.context );
            $$('#dentist-home-post-job-button').on( 'click', postJobHandler );
            TempStars.Analytics.track( 'Viewed Home Page' );

            console.log(data);
            surveyJobs = [];
            if (data.jobs) {
                data.jobs = _.orderBy( data.jobs, ['shifts[0].shiftDate'], ['desc'] );
                for (var i = 0; i < data.jobs.length; i++) {
                    var job = data.jobs[i];
                    if (job.hygienist && !job.hygienistRating) {
                        if (job.status === TempStars.Job.status.COMPLETED)
                            surveyJobs.push(i);
                        else if (job.shifts && job.shifts.length > 0) {
                            var curDate = new Date();
                            var postedEnd = job.shifts[0].postedEnd;
                            if (moment.utc(postedEnd).valueOf() <= moment.utc(curDate).valueOf())
                                surveyJobs.push(i);
                        }
                    }
                }
                console.log(surveyJobs);
                popupSurvey(0);
            }
            else
                initTimer();
        });

        app.onPageBeforeRemove( 'dentist-home', function( page ) {
            $$('#dentist-home-post-job-button').off( 'click', postJobHandler );
            clearInterval( interval );
            delete window.dentistInterval;
        });
    }

    function initTimer() {
        interval = setInterval( refreshPage, 5000 );
        window.dentistInterval = interval;
    }

    function popupSurvey( idx ) {
        if (idx >= surveyJobs.length) {
            initTimer();
            return;
        }

        var text =
            (data.jobs[surveyJobs[idx]].hygienist ? data.jobs[surveyJobs[idx]].hygienist.firstName + ' ' + data.jobs[surveyJobs[idx]].hygienist.lastName + '<br>' : '') +
            (data.jobs[surveyJobs[idx]].hygienist.photoUrl ? '<img src="' + data.jobs[surveyJobs[idx]].hygienist.photoUrl + '" width="60px" style="margin-top: 5px;" /><br>' : '') +
            moment( data.jobs[surveyJobs[idx]].shifts[0].shiftDate ).local().format('ddd, MMM D, YYYY') + '<br>' +
            moment.utc( data.jobs[surveyJobs[idx]].shifts[0].postedStart ).local().format('h:mm a') + ' - ' +
            moment.utc( data.jobs[surveyJobs[idx]].shifts[0].postedEnd ).local().format('h:mm a') + '<br>' +
            'How happy would you be to have this hygienist work at your office again?';

        app.modal({
            title:  'Rate your Hygienist',
            text: text,
            verticalButtons: true,
            buttons: [
                {
                    text: 'Very Happy',
                    onClick: function() {
                        app.alert('Great! They are now one of your Favourites and will have exclusive first access to your future job postings.', function() {
                            saveSurvey( idx, TempStars.Rating.VERY_HAPPY );
                        });
                    }
                },
                {
                    text: 'Pleased',
                    onClick: function() {
                        app.alert('Thanks, all set.', function() {
                            saveSurvey( idx, TempStars.Rating.PLEASED );
                        });
                    }
                },
                {
                    text: 'No Thank You!',
                    onClick: function() {
                        app.alert('Sorry, they will be added to your blocked list.', function() {
                            saveSurvey( idx, TempStars.Rating.NO_THANK_YOU );
                        });
                    }
                }
            ]
        });
    }

    function saveSurvey( idx, result ) {
        TempStars.Api.saveHygienistRating( TempStars.User.getCurrentUser().dentistId, data.jobs[surveyJobs[idx]].id, {hygienistRating: result} )
        .then( function() {
            popupSurvey(idx + 1);
        });
    }

    function refreshPage() {
        TempStars.Pages.Dentist.Home.getData()
        .then( function( data ) {
            calendar.updateEvents( data.actionRequired );
            calendar.updateMarkers( [data.posted, data.partial, data.confirmed, data.completed] );
        });
    }

    function displayCalendar( data ) {

        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];

        calendar = app.calendar({
            container: '#dentist-calendar-inline-container',
            value: [new Date()],
            weekHeader: true,
            firstDay: 0,
            toolbarTemplate:
                '<div class="toolbar calendar-custom-toolbar">' +
                    '<div class="toolbar-inner">' +
                        '<div class="left">' +
                            '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                        '</div>' +
                        '<div class="center"></div>' +
                        '<div class="right">' +
                            '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                        '</div>' +
                    '</div>' +
                '</div>',
            onOpen: function (p) {
                $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ' ' + p.currentYear);
                $$('.calendar-custom-toolbar .left .link').on('click', function () {
                    calendar.prevMonth();
                });
                $$('.calendar-custom-toolbar .right .link').on('click', function () {
                    calendar.nextMonth();
                });
            },
            onMonthYearChangeStart: function (p) {
                $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] + ' ' + p.currentYear);
            },
            events: data.actionRequired,

            rangesClasses: [
                {
                    cssClass: 'calendar-posted',
                    range: data.posted
                },
                {
                    cssClass: 'calendar-partial',
                    range: data.partial
                },
                {
                    cssClass: 'calendar-confirmed',
                    range: data.confirmed
                },
                {
                    cssClass: 'calendar-completed',
                    range: data.completed
                }
            ],

            onDayClick: function(picker, dayContainer, dateYear, dateMonth, dateDay) {
                console.log('on day click');
                if ( $(dayContainer).hasClass('calendar-completed') ) {
                    completedDayHandler(picker, dayContainer, dateYear, dateMonth, dateDay);
                }
                else if ( $(dayContainer).hasClass('calendar-confirmed') ) {
                    confirmedDayHandler(picker, dayContainer, dateYear, dateMonth, dateDay);
                }
                else if ( $(dayContainer).hasClass('calendar-partial') ) {
                    partialDayHandler(picker, dayContainer, dateYear, dateMonth, dateDay);
                }
                else if ( $(dayContainer).hasClass('calendar-posted') ) {
                    postedDayHandler(picker, dayContainer, dateYear, dateMonth, dateDay);
                }
                else {
                    openDayHandler(picker, dayContainer, dateYear, dateMonth, dateDay);
                }
            }
        });
        calendar.updateEvents( data.actionRequired );
    }

    function completedDayHandler(picker, dayContainer, dateYear, dateMonth, dateDay) {
        console.log( 'completed ' + dateYear + ' ' + dateMonth + ' ' + dateDay );
        var dateStr = moment({ year: dateYear, month: parseInt(dateMonth), day: dateDay}).format('YYYY-MM-DD');
        var params = { date: dateStr };
        TempStars.Dentist.Router.goForwardPage( 'job-completed', params );
    }

    function confirmedDayHandler(picker, dayContainer, dateYear, dateMonth, dateDay) {
        console.log( 'confirmed ' + dateYear + ' ' + dateMonth + ' ' + dateDay );
        var dateStr = moment({ year: dateYear, month: parseInt(dateMonth), day: dateDay}).format('YYYY-MM-DD');
        var params = { date: dateStr };
        TempStars.Dentist.Router.goForwardPage( 'job-confirmed', params );
    }

    function partialDayHandler(picker, dayContainer, dateYear, dateMonth, dateDay) {
        console.log( 'partial ' + dateYear + ' ' + dateMonth + ' ' + dateDay );
        var dateStr = moment({ year: dateYear, month: parseInt(dateMonth), day: dateDay}).format('YYYY-MM-DD');
        var params = { date: dateStr };
        TempStars.Dentist.Router.goForwardPage( 'job-partial', params );
    }

    function postedDayHandler(picker, dayContainer, dateYear, dateMonth, dateDay) {
        console.log( 'posted ' + dateYear + ' ' + dateMonth + ' ' + dateDay );
        var dateStr = moment({ year: dateYear, month: parseInt(dateMonth), day: dateDay}).format('YYYY-MM-DD');
        var params = { date: dateStr };
        TempStars.Dentist.Router.goForwardPage( 'job-posted', params );
    }

    function openDayHandler(picker, dayContainer, dateYear, dateMonth, dateDay) {
        console.log( 'open ' + dateYear + ' ' + dateMonth + ' ' + dateDay );
        var jsDate = moment({ year: dateYear, month: parseInt(dateMonth), day: dateDay}).toDate();
        var dateStr = moment({ year: dateYear, month: parseInt(dateMonth), day: dateDay}).format('MMM D, YYYY');
        var params = { date: jsDate };
        
        app.confirm( 'Would you like to get a temp hygienist for ' + dateStr + '?', function() {
            if ( TempStars.User.getCurrentUser().dentist.stripeCustomerId ) {
                TempStars.Dentist.Router.goForwardPage( 'post-job', params );
            }
            else {
                postJobHandler();
            }
        });
    }

    function getJobDate( job ) {
        return moment(job.startDate).startOf('day').toDate();
    }

    function getActionRequiredJobs( job ) {

        if ( job.status == TempStars.Job.status.COMPLETED ) {

            if ( ! job.hygienistRating || job.invoice && (! job.invoice.dentistMarkedPaid ) ) {
                job.actionRequired = true;
            }
        }
        return job;
    }

    function postJobHandler( e ) {
        if ( e ) {
            e.preventDefault();
        }

        if ( TempStars.User.getCurrentUser().dentist.stripeCustomerId ) {
            TempStars.Dentist.Router.goForwardPage( 'post-job' );
        }
        else {
            app.modal({
            //    title:  'Please Enter Payment Info',
            title:  '"Get a Temp Hygienist" Requires Entering Payment Info',
            text: '<div style="margin:10px 0;background:lightyellow">We have <b>' + data.numHygienists + '</b> hygienists available in the <b>' + data.user.dentist.city + '</b> area.</div>The $25+hst placement fee is billed only after a successful placement.',
              buttons: [
                {
                    text: 'I\'m ready',
                  onClick: function() {
                      TempStars.Dentist.Router.goForwardPage( 'payment-info' );
                  }
                },
                {
                  text: 'I\'ll do it later',
                  onClick: function() {
                      app.modal({
                        title: 'Don’t Wait Until It’s Urgent',
                        text: 'Tap "Get a Temp Hygienist" to enter payment info.  Try to do it soon, so you\'re not stranded when you need a good hygienist fast!',
                        buttons: [
                            {    
                                text: 'Got it!',
                                bold: true
                            }
                        ]
                      });
                  }
                }
              ]
            });
        }
    }

    return {
        init: init,

        triggerPageInit: function triggerPageInit() {
            pageInit.trigger();
        },

        getData: function( params ) {
            TempStars.Logging.log( 'getting data for dentist home page' );
            return new Promise( function( resolve, reject ) {
                Promise.props({
                    user: TempStars.User.getCurrentUser(),
                    jobs: TempStars.Dentist.getAllJobs()
                })
                .then( function( data ) {
                    TempStars.Logging.log( 'got data for dentist home page' );

                    TempStars.Logging.log( 'getting posted jobs for dentist home page' );

                    data.posted = _(data.jobs)
                        .filter(['status', TempStars.Job.status.POSTED])
                        .map( getJobDate )
                        .value();

                    TempStars.Logging.log( 'getting partial jobs for dentist home page' );
                    data.partial = _(data.jobs)
                        .filter(['status', TempStars.Job.status.PARTIAL])
                        .map( getJobDate )
                        .value();

                    TempStars.Logging.log( 'getting confirmed jobs for dentist home page' );
                    data.confirmed = _(data.jobs)
                        .filter(['status', TempStars.Job.status.CONFIRMED])
                        .map( getJobDate )
                        .value();

                    TempStars.Logging.log( 'getting completed jobs for dentist home page' );
                    data.completed = _(data.jobs)
                        .filter(['status', TempStars.Job.status.COMPLETED])
                        .map( getJobDate )
                        .value();

                    TempStars.Logging.log( 'getting action required for dentist home page' );
                    data.actionRequired = _(data.jobs)
                        .map( getActionRequiredJobs )
                        .filter( 'actionRequired' )
                        .map( getJobDate )
                        .value();

                    var min = 61;
                    var max = 84;
                    data.numHygienists = Math.floor(Math.random() * (max - min)) + min;

                    TempStars.Logging.log( 'finished parsing data for dentist home page' );
                    resolve( data );
                })
                .catch( function( err ) {
                    reject( err );
                });
            });
        }
    };

})();

TempStars.Pages.Dentist.Home.init();
