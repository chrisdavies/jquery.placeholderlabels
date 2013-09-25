/*
* Persistent Placeholder - treats a label like a placeholder and
* makes it persist even when you focus on an input. Huzzah!
*/
(function ($) {

    var parentSelector = 'div.input-wrapper';

    function update(force) {
        var $input = $(this),
            $parent = $input.parent(parentSelector);
        return $parent[force === true || $input.val() ? 'addClass' : 'removeClass']('filled');
    }

    function focus() {
        update.call(this).addClass('focus');
    }

    function blur() {
        update.call(this).removeClass('focus');
    }
    var i = 0;
    function keydown(evt) {
        var c = evt.keyCode;
        ((47 < c && c < 91) || (95 < c && c < 112) || (185 < c && c < 223)) && update.call(this, true);
    }

    $.fn.placeholderlabels = function () {
        return this.each(update);
    };

    $(function () {
        // only simulate placeholders if they are not supported:
        if (document.createElement("input").placeholder === undefined) {
            $('input[placeholder], textarea[placeholder]').each(function () {
                var me = $(this);
                var lbl = $('<label></label>').text(me.attr('placeholder')).click(function () { me.focus(); });
                me.get(0).removeAttribute('placeholder');
                me.wrap('<div class="input-wrapper" />').parent().prepend(lbl);
            });
    
            $('input, textarea', parentSelector).on('focus', focus).on('blur', blur).on('keyup', update).on('click', update).on('keydown', keydown).placeholderlabels();
        }
    });
})(jQuery);
