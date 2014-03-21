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

    function placeholdersSupported() {
        return document.createElement("input").placeholder !== undefined;
    }

    var i = 0;
    function keydown(evt) {
        var c = evt.keyCode;
        ((47 < c && c < 91) || (95 < c && c < 112) || (185 < c && c < 223)) && update.call(this, true);
    }
    
    $.fn.updateplaceholderlabel = function () {
        return this.each(update);
    };

    $.fn.placeholderlabels = function () {
        if (!placeholdersSupported()) {
            this.each(function () {
                var me = $(this);
                var lbl = $('<label></label>').text(me.attr('placeholder')).click(function () { me.focus(); });
                me.get(0).removeAttribute('placeholder');
                me.wrap('<div class="input-wrapper" />').parent().prepend(lbl);
            });

            this.on('changeDate', function () {
                alert('here!');
            });

            this.on('focus', focus).on('blur', blur).on('input keyup', update).on('click', update).on('keydown', keydown).updateplaceholderlabel();
        }

        return this;
    };
    
    $(function () {
        $('input[placeholder], textarea[placeholder]').placeholderlabels();
    });
})(jQuery);