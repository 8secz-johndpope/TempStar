TempStars.Pages.Dentist.Home = (function() {
    'use strict';

    function init() {
        app.onPageBeforeInit( 'home', function( page ) {
            mainView.showNavbar();
            displayCalendar( page.context );
        });

        app.onPageBeforeRemove( 'home', function( page ) {

        });
    }

    function displayCalendar( data ) {

        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];

        var calendarInline = app.calendar({
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
                    calendarInline.prevMonth();
                });
                $$('.calendar-custom-toolbar .right .link').on('click', function () {
                    calendarInline.nextMonth();
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
            }
        });
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

    return {
        init: init,
        getData: function( params ) {
            return new Promise( function( resolve, reject ) {
                Promise.props({
                    user: TempStars.User.getCurrentUser(),
                    jobs: TempStars.Dentist.getAllJobs()
                })
                .then( function( data ) {
                    data.posted = _(data.jobs)
                        .filter(['status', TempStars.Job.status.POSTED])
                        .map( getJobDate )
                        .value();

                    data.partial = _(data.jobs)
                        .filter(['status', TempStars.Job.status.PARTIAL])
                        .map( getJobDate )
                        .value();

                    data.confirmed = _(data.jobs)
                        .filter(['status', TempStars.Job.status.CONFIRMED])
                        .map( getJobDate )
                        .value();

                    data.completed = _(data.jobs)
                        .filter(['status', TempStars.Job.status.COMPLETED])
                        .map( getJobDate )
                        .value();

                    data.actionRequired = _(data.jobs)
                        .map( getActionRequiredJobs )
                        .filter( 'actionRequired' )
                        .map( getJobDate )
                        .value();

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
