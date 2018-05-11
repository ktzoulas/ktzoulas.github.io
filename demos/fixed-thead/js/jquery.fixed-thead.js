(function($) {
    var table, thead, fixed;
    
    $.fn.fixedThead = function(options) {
        var settings = $.extend({
            clone_id: 'cloned-thead'
        }, options);
        
        table = this;
        
        return this.each(function() {
            thead = $(this).find('thead');
            fixed = $(this).clone().find('tbody').remove().end()
                .find('tfoot').remove().end()
                .addClass('fixed-thead').attr('id', settings.clone_id).insertBefore($(this));
                
            // ........................initialization
            fixedTheadOnResize();
            fixedTheadOnScroll();
            
            $(window).resize(fixedTheadOnResize);
            $(window).scroll(fixedTheadOnScroll);
        });
    };
    
    function fixedTheadOnResize() {
        if ($(window).width() < $(document).width()) {
            fixed.css('min-width', thead.width() + 'px');
        }
        
        fixed.css('width', thead.width() + 'px');
        fixed.find('th').each(function(index) {
            $(this).css('width', thead.find('th').eq(index).width() + 'px');
        });
    }
    
    function fixedTheadOnScroll() {
        var scroll_top = thead.scrollTop();
        var offset_top = table.offset().top;
        var offset_bottom = offset_top + table.height() - thead.height();
        
        if (scroll_top < offset_top || scroll_top > offset_bottom) {
            fixed.hide();
        }
        else if (offset_top <= scroll_top && scroll_top <= offset_bottom && fixed.is(':hidden')) {
            fixed.show();
        }
        
        if ($(window).width() < $(document).width()) {
            fixed.css('left', table.offset().left - thead.scrollLeft());
        }
    }
}(jQuery));
