/*globals QUnit, base */
(function() {
    'use strict';

    /** @type {HTMLElement} */
    var $fixture;

    /** @type {HTMLElement} */
    var $a;

    /** @type {HTMLElement} */
    var $modal;


    QUnit.module('Base.modal', {
        beforeEach: function() {
            $fixture = base.$('#qunit-fixture');
            $a = base.$('a', $fixture);

            var modalSelector = $a.getAttribute('data-toggle');
            $modal = base.$(modalSelector);
        }
    });

    QUnit.test('base.modal open', function(assert) {
        assert.expect(4);
        var done = assert.async();

        assert.ok(!document.body.classList.contains('modal-open'));
        assert.ok($modal.hasAttribute('hidden'));

        setTimeout(function() {
            assert.ok(document.body.classList.contains('modal-open'));
            assert.ok(!$modal.hasAttribute('hidden'));

            return done();
        }, 20);

        base.trigger('click', $a);
    });

    QUnit.test('base.modal close', function(assert) {
        assert.expect(2);
        var done = assert.async();

        setTimeout(function() {
            assert.ok(!document.body.classList.contains('modal-open'));
            assert.ok($modal.hasAttribute('hidden'));

            return done();
        }, 20);

        base.trigger('click', $a);
        base.trigger('click', $a);
    });
}());
