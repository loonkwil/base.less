/*globals CustomEvent */
(function() {
    'use strict';

    var base = window.base = {};


    /**
     * Like `document.querySelectorAll`
     *
     * @param {string} selector
     * @param {HTMLElement=} $node
     * @return {NodeList}
     */
    base.$all = function(selector, $node) {
        $node = $node || document;
        return $node.querySelectorAll(selector);
    };

    /**
     * Like `document.querySelector`
     *
     * @param {string} selector
     * @param {HTMLElement=} $node
     * @return {?HTMLElement}
     */
    base.$ = function(selector, $node) {
        return base.$all(selector, $node)[0] || null;
    };

    /**
     * Add event listener
     *
     * @param {string} eventName
     * @param {function(Event)} fn
     * @param {HTMLElement=} $node
     */
    base.on = function(eventName, fn, $node) {
        $node = $node || document;
        $node.addEventListener(eventName, fn, false);
    };

    /**
     * Remove event listener
     *
     * @param {string} eventName
     * @param {function(Event)} fn
     * @param {HTMLElement=} $node
     */
    base.off = function(eventName, fn, $node) {
        $node = $node || document;
        $node.removeEventListener(eventName, fn);
    };

    /**
     * On click event listener
     *
     * @param {function(MouseEvent)} fn
     * @param {HTMLElement=} $node
     */
    base.onClick = function(fn, $node) {
        base.on('click', fn, $node);
    };

    /**
     * Execute a function when the DOM is ready
     *
     * @param {function} fn
     */
    base.onReady = function(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            base.on('DOMContentLoaded', fn);
        }
    };

    /**
     * Trigger a custom event
     *
     * @param {string} customEventName
     * @param {HTMLElement=} $node
     * @param {Object=} data
     */
    base.trigger = (function() {
        var createEvent;
        if (typeof CustomEvent === 'function') {
            createEvent = function createEvent(name, data) {
                return new CustomEvent(name, {
                    detail: data,
                    bubbles: true,
                    cancelable: true
                });
            };
        } else {
            createEvent = function createEvent(name, data) {
                var event = document.createEvent('CustomEvent');
                event.initCustomEvent(name, true, true, data);

                return event;
            };
        }

        return function(customEventName, $node, data) {
            data = data || Object.create(null);
            $node = $node || document;

            var event = createEvent(customEventName, data);
            $node.dispatchEvent(event);
        };
    }());

    /**
     * Add or remove a boolean attribute
     *
     * @param {HTMLElement} $el
     * @param {string} name
     * @param {boolean=} nextValue
     * @return {boolean} State after toggle
     */
    base.toggleAttr = function($el, name, nextValue) {
        if (typeof nextValue === 'undefined') {
            nextValue = !$el.hasAttribute(name);
        }

        if (nextValue) {
            $el.setAttribute(name, true);
            return true;
        } else {
            $el.removeAttribute(name);
            return false;
        }
    };
}());
