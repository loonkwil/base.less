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

        base.on('base:toggle:show', function(e) {
            $body.classList.add('modal-open');

            var modal = e.target;
            base.onClick(modalClickEventHandler, modal);

            return e.stopPropagation();
        });

        base.on('base:toggle:hide', function(e) {
            $body.classList.remove('modal-open');

            var modal = e.target;
            base.off('click', modalClickEventHandler, modal);

            return e.stopPropagation();
        });
    });
}());
