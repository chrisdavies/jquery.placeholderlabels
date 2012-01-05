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
        $('input[placeholder], textarea[placeholder]').each(function () {
            var me = $(this);
            var lbl = $('<label></label>').text(me.attr('placeholder'));
            me.removeAttr('placeholder').wrap('<div class="input-wrapper" />').parent().prepend(lbl);
        });

        $('input, textarea', parentSelector).live('focus', focus).live('blur', blur).live('keyup', update).live('click', update).live('keydown', keydown).placeholderlabels();
    });
})(jQuery);