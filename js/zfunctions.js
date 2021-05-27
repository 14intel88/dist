var youtube_api = false;

$(document).ready(function() {
    if (youtube_api === false) {
        setTimeout(function() { onYouTubeIframeAPIReady(); }, 1000);
    }

    function onYouTubeIframeAPIReady() {
        youtube_api = true;
        if ($('#main-video').length) {
            var vid1 = new YT.Player($('#main-video')[0]);
            console.log($('#main-video').parent().find('.yt_over').length);
            $('#main-video').parent().find('.yt_over').click(function() {
                $('.yt_over').css('background-image', 'url()');
                if (vid1.getPlayerState() === YT.PlayerState.PLAYING) {
                    vid1.pauseVideo();
                } else {
                    if ($('#main-video2').length) {
                        jQuery('#main-video2')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                    }
                    vid1.playVideo();
                }
            });
            $('#unmuteBtn,#unmuteTxt').click(function(e) {
                vid1.unMute();
                $(this).parent().hide(1000);
                e.preventDefault();
            });
        }

        if ($('#main-video2').length) {
            var vid2 = new YT.Player($('#main-video2')[0]);
            console.log($('#main-video2').parent().find('.yt_over').length);
            $('#main-video2').parent().find('.yt_over').click(function() {
                $('.yt_over').css('background-image', 'url()');
                if (vid2.getPlayerState() === YT.PlayerState.PLAYING) {
                    vid2.pauseVideo();
                } else {
                    vid2.playVideo();
                    jQuery('#main-video')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                }
            });
        }

        if ($('#reg-video1').length) {
            var vid3 = new YT.Player($('#reg-video1')[0]);
            console.log($('#reg-video1').parent().find('.yt_over').length);
            $('#reg-video1').parent().find('.yt_over').click(function() {
                $('.yt_over').css('background-image', 'url()');
                if (vid3.getPlayerState() === YT.PlayerState.PLAYING) {
                    vid3.pauseVideo();
                } else {
                    vid3.playVideo();
                }
            });
        }

        if ($('#reg-video2').length) {
            var vid4 = new YT.Player($('#reg-video2')[0]);
            console.log($('#reg-video2').parent().find('.yt_over').length);
            $('#reg-video2').parent().find('.yt_over').click(function() {
                $('.yt_over').css('background-image', 'url()');
                if (vid4.getPlayerState() === YT.PlayerState.PLAYING) {
                    vid4.pauseVideo();
                } else {
                    vid4.playVideo();
                }
            });
        }
    }
});


var homeCountdown = 1500000; // 25 минут 
var regCountdown = 360000; // 6 минут

$(document).ready(function() {

    var homeSlots = getRandom(8, 12);
    var regSlots = 3;
    var homeTimer = homeCountdown / (homeSlots - 3);
    var regTimer = regCountdown / (regSlots - 1);

    setTimeout(function() {
        countDownSlots(homeSlots, homeTimer);
    }, 1000);

    setTimeout(function() {
        countDownRegSlots(regSlots, regTimer);
    }, 1000);

    // getLocation();


    setTimeout(function() {
        $('#depo span').text('$250.00');
        $('#success span').text('100%');
    }, 500);

    // GetStats();

    var Counter = new(function() {
        var $secondcounter = $('#timer1');

        var $timer, // Stopwatch element on the page
            incrementTime = 70, // Timer speed in milliseconds
            currentTime = 42000, // Current time in hundredths of a second
            updateTimer = function() {

                if (currentTime >= 0) {
                    $timer.html(formatTime(currentTime));

                    if ($secondcounter) $secondcounter.html(formatTime(currentTime));

                    currentTime -= incrementTime / 10;

                }
            },
            init = function() {
                $timer = $('#timer');
                Counter.Timer = $.timer(updateTimer, incrementTime, true);
            };
        this.resetStopwatch = function() {
            currentTime = 0;
            this.Timer.stop().once();
        };
        $(init);
    });

    $('.button.subscribe').click(function(event) {
        event.preventDefault();
    })

    $(".round-dot").click(function() {
        $('html, body').animate({
            scrollTop: $('#depo').offset().top
        }, 1000);
    });

    $(".circle").click(function() {
        $('html, body').animate({
            scrollTop: $('#timer1').offset().top
        }, 1000);
    });

    $('.question').click(function() {
        if ($(this).hasClass('collapsed')) {
            $('.collapse').removeClass('in');
        }

        $(".question").not(this).removeClass('selected');
        $(this).toggleClass('selected');
    });

    if ($('#clicksrefill')) {
        // CurrWithdrawals(true);
    }

    // if ($('#largWithdrawals')) {
    //     $.post('/home/GetWithdrawals', { part: 1 }).done(function (data) {
    //         $.each(data, function (key, value) {
    //             $("#largWithdrawals .mCSB_container").append('<div class="item"><div class="heading"><div class="player">Пользователь #' + value.playerNumber + '</div></div><div class="body">ВЫВЕЛ<span>$' + value.withdrew + '</span></div></div>');
    //
    //         });
    //     });
    // }

    $(".mCustomScrollbar").mCustomScrollbar({
        axis: "x",
        alwaysShowScrollbar: 2,
        theme: "dark-3",
        advanced: { autoExpandHorizontalScroll: true }
    });
});

// function CurrWithdrawals(first) {
//     $.post('/home/GetWithdrawals', { part: 2 }).done(function (data) {
//         if (first) {
//             $.each(data, function (key, value) {
//                 $("#currWithdrawals .mCSB_container").append('<div class="item item-animation"><input id="createDate" type="hidden" value="' + value.createDate + '"><div class="heading"><div class="player">Пользователь #' + value.playerNumber + '</div></div><div class="body"><div class="profit">ВЫВЕЛ <span>$' + value.withdrew + '</span></div></div><div class="footer"><div class="timer">Только что</div></div></div>');
//             });
//         }
//         else {
//             $("#currWithdrawals .mCSB_container").prepend('<div class="item item-animation"><input id="createDate" type="hidden" value="' + data[0].createDate + '"><div class="heading"><div class="player">Пользователь #' + data[0].playerNumber + '</div></div><div class="body"><div class="profit">ВЫВЕЛ <span>$' + data[0].withdrew + '</span></div></div><div class="footer"><div class="timer">Только что</div></div></div>');
//         }
//         var loadTime = new Date(data[0].createDate);
//         ChangeTimeOnCurrWithdrawals(loadTime);
//     });
//
//     setTimeout(function () {
//         CurrWithdrawals(false);
//     }, 12000);
// }

function ChangeTimeOnCurrWithdrawals(loadTime) {
    $.each($("#clicksrefill .aPSd_container").children("div"), function(key, value) {
        var curr = new Date($(value).find('#publicdate').val());
        var delta = (loadTime.getTime() - curr) / 1000;
        if (delta <= 10)
            $(value).find('.timer').text("Только что");
        if (delta > 10 && delta <= 60)
            $(value).find('.timer').text("Меньше 1 мин");
        if (delta > 60 && delta <= 300)
            $(value).find('.timer').text("Меньше 5 мин");
        if (delta > 300 && delta <= 3600)
            $(value).find('.timer').text("Меньше 1 часа");
        if (delta > 3600)
            $(value).find('.timer').text("Меньше суток");
    });
}

$('#SubscribeModal').on('hidden.bs.modal', function(e) {
    $('#SubscribeModal').remove();
});

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function countDownSlots(slots, timer) {

    if (slots < 5) {
        $('.acceleration .slots').text('места');
    }

    $('#slots').text(slots);

    if (slots > 3) {
        slots = slots - 1;
        setTimeout(function() {
            $('#slots').text(slots);
            countDownSlots(slots, timer);
        }, timer);
    }
}

function countDownRegSlots(slots, timer) {

    if (slots > 3) {
        $('.location .slots').text(' мест');
    } else if ((slots == 3) || (slots == 2)) {
        $('.location .slots').text(' места');
    } else {
        $('.location .slots').text(' место');
    }

    $('#reg-slots').text(slots);

    if (slots > 1) {
        slots = slots - 1;
        setTimeout(function() {
            countDownRegSlots(slots, timer);
        }, timer);
    }
}

function include(arr, obj) {
    return (arr.indexOf(obj) != -1);
}


function getLocation() {

    $.get("/secure/GetIP", function(json) {
        $.get("https://ip2c.org/?ip=" + json, function(data) {
            var arr_data = data.split(';');
            var country = arr_data[3];
            var code = arr_data[1];
            var label;

            if (country) {
                var flag = 'universe-' + code.toLowerCase();
                $('.location > .universe').addClass(flag);

                switch (country) {
                    case 'Ukraine':
                        label = 'Украине';
                        break;

                    case 'Russia':
                        label = 'России';
                        break;

                    case 'Russian Federation':
                        label = 'России';
                        break;

                    case 'Belarus':
                        label = 'Беларуси';
                        break;

                    case 'Kazakhstan':
                        label = 'Казахстане';
                        break;

                    case 'Uzbekistan':
                        label = 'Узбекистане';
                        break;

                    default:
                        label = country;
                        break;
                }

                $('#location').text(label);
            }
        });
    });
}


function GetStats() {
    $.post("/secure/GetStats", {})
        .done(function(data) {
            $('#profit span').text('$' + data.value1.toFixed(2));
            $('#uptime span').text(data.value2);
        });

    setTimeout(function() {
        GetStats();
    }, regCountdown);
}

// Common functions
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) { str = '0' + str; }
    return str;
}

function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);

    var parsed = "<b>" + (min > 0 ? pad(min, 2) : "00") + "</b>:<b>" + pad(sec, 2) + "</b>:<b>" + hundredths + "</b>";
    return parsed;
}