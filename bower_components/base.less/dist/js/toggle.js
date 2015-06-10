(function() {
    'use strict';

    var base = window.base = window.base || {};


    /**
     * Show or hide an element (with the `hidden` attribute)
     *
     * @param {HTMLElement} $el
     * @param {boolean=} visible
     * @return {boolean}
     */
    base.toggle = function($el, visible) {
        if (typeof visible !== 'undefined') {
            visible = !visible;
        }

        var afterToggle = !base.toggleAttr($el, 'hidden', visible);

        base.trigger('base:toggle', $el, { visible: afterToggle });
        if (afterToggle) {
            base.trigger('base:toggle:show', $el);
        } else {
            base.trigger('base:toggle:hide', $el);
        }
    };


    base.onReady(function whenDOMIsReady() {
        base.onClick(function clickEventHandler(e) {
            var $el = e.target;
            if (!$el.hasAttribute('data-toggle')) { return; }

            var targetSelector = $el.getAttribute('data-toggle');
            var target = base.$(targetSelector);
            if (!target) { return; }

            base.toggle(target);

            e.stopPropagation();
            return e.preventDefault();
        });
    });
}());
