/**
 * Galleria Fullscreen Theme
 *
 *
 * Copyright (c) 2010 - 2019 worse is better UG
 * Licensed under the MIT License.
 */

( function( window, factory ) {
    factory(
        window,
        window.Galleria,
        window.jQuery
    );
}( window, function factory( window, Galleria, $ ) {

    Galleria.addTheme({
        name: 'light',
        version: '1.6',
        author: 'Dasheng Jonathan Zhang',
        css: 'galleria.light.css', // not needed for webpack
        defaults: {
            transition: 'fade',
            thumbCrop: 'height',
            _toggleInfo: false
        },
        init: function (options) {

            Galleria.requires(1.4, 'This theme requires Galleria 1.4 or later');

            var touch = Galleria.TOUCH;

            this.$('counter,info-text').show();

            this.bind('thumbnail', function (e) {

                if (!touch) {

                    $(e.thumbTarget).css('opacity', 0.6).parent().hover(function () {
                        $(this).not('.active').children().stop().fadeTo(100, 1);
                    }, function () {
                        $(this).not('.active').children().stop().fadeTo(400, 0.6);
                    });

                    if (e.index === this.getIndex()) {
                        $(e.thumbTarget).css('opacity', 1);
                    }
                } else {
                    $(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6).bind('click:fast', function () {
                        $(this).css('opacity', 1).parent().siblings().children().css('opacity', 0.6);
                    });
                }
            });

            this.bind('loadstart', function (e) {
                window.setTimeout(function () {
                    $(e.thumbTarget).css('opacity', 1).parent().siblings().children().css('opacity', 0.6);
                }, touch ? 300 : 0);
                this.$('info').toggle(this.hasInfo());
            });
        }
    });

    return Galleria;
}));
