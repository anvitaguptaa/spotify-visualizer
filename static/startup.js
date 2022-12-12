$('#button').click(function() {
    if ((($('#label').css('-webkit-animation-play-state')) == 'running') ||  (($('#label').css('animation-play-state')) == 'running')) {
        $(this).css({
            'top':'45.5%',
            'box-shadow':'0px 0px 0px #1a1a1a'
        });
        $('#label').css({
            '-webkit-animation-play-state': 'paused',
            'animation-play-state': 'paused'
        });
        }
    else {
        $(this).css({
            'top':'45.4%',
            'box-shadow':'2px 2px 0px #1a1a1a'
        });
        $('#label').css({
            '-webkit-animation-play-state': 'running',
            'animation-play-state': 'running'
        });
    }
});