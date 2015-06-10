/*globals QUnit, base, $ */
(function() {
    'use strict';

    /** @type {HTMLElement} */
    var $fixture;


    QUnit.module('Base.toggle', {
        beforeEach: function() {
            $fixture = $('#qunit-fixture').get(0);
        }
    });

    QUnit.test('base.toggle', function(assert) {
        assert.expect(1);
        var done = assert.async();

        var firedEvents = {};

        $($fixture).on(
            'base:toggle base:toggle:show base:toggle:hide',
            function(e) {
                if (e.type in firedEvents) {
                    firedEvents[e.type] += 1;
                } else {
                    firedEvents[e.type] = 1;
                }
            }
        );

        base.toggle($fixture);
        base.toggle($fixture);

        setTimeout(function() {
            assert.deepEqual(
                firedEvents, {
                    'base:toggle': 2,
                    'base:toggle:show': 1,
                    'base:toggle:hide': 1
                }
            );
            return done();
        }, 100);
    });

    QUnit.test('[data-toggle]', function(assert) {
        assert.expect(3);

        var $a = base.$('a', $fixture);
        var containerSelector = $a.getAttribute('data-toggle');
        var $container = base.$(containerSelector);

        assert.ok(!$container.hasAttribute('hidden'));
        base.trigger('click', $a);
        assert.ok($container.hasAttribute('hidden'));
        base.trigger('click', $a);
        assert.ok(!$container.hasAttribute('hidden'));
    });
}());
