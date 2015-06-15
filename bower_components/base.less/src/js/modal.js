/*globals base */
(function() {
    'use strict';

    /**
     * @param {HTMLElement} $modal
     */
    var closeModal = function($modal) {
        base.toggle($modal, false);
    };

    /**
     * @param {MouseEvent} e
     */
    var modalClickEventHandler = function(e) {
        var outsideClick = e.target.classList.contains('modal');
        if (!outsideClick) {
            return;
        }

        closeModal(this);

        e.stopPropagation();
        return e.preventDefault();
    };


    base.onReady(function whenDOMIsReady() {
        var $body = base.$('body');

        base.on('base:toggle', function toggleEventHandler(e) {
            var $el = e.target;
            if (!$el.classList.contains('modal')) { return; }

            var isVisible = e.detail.visible;
            if (isVisible) {
                $body.classList.add('modal-open');
                base.onClick(modalClickEventHandler, $el);
            } else {
                $body.classList.remove('modal-open');
                base.off('click', modalClickEventHandler, $el);
            }

            return e.stopPropagation();
        });
    });
}());
