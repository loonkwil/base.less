/*globals QUnit, base, $ */
(function() {
    'use strict';

    /** @type {HTMLElement} */
    var $fixture;


    QUnit.module('Base', {
        beforeEach: function() {
            $fixture = $('#qunit-fixture').get(0);
        }
    });

    QUnit.test('base.$all', function(assert) {
        assert.expect(4);
        var $el;

        $el = base.$all('.container>span', $fixture);
        assert.ok($el instanceof NodeList);
        assert.equal($el[0].innerText, 'test');

        assert.equal(base.$all('not-found').length, 0);
        assert.equal(base.$all('body', document)[0], document.body);
    });

    QUnit.test('base.$', function(assert) {
        assert.expect(4);

        assert.ok(base.$('body') instanceof HTMLElement);
        assert.equal(base.$('body'), document.body);
        assert.equal(base.$('not-found'), null);
        assert.equal(
            base.$all('.container', $fixture)[0],
            base.$('.container', $fixture)
        );
    });

    QUnit.test('base.on', function(assert) {
        assert.expect(1);
        var done = assert.async();

        base.on('click', function(e) {
            assert.ok(e instanceof MouseEvent);
            return done();
        }, $fixture);

        $($fixture).click();
    });

    QUnit.test('base.off', function(assert) {
        assert.expect(1);
        var done = assert.async();

        var eventFired = false;
        var eventHandler = function() {
            eventFired = true;
        };

        base.on('click', eventHandler, $fixture);
        base.off('click', eventHandler, $fixture);
        $($fixture).click();

        setTimeout(function() {
            assert.ok(!eventFired);
            return done();
        }, 100);
    });

    QUnit.test('base.onClick', function(assert) {
        assert.expect(1);
        var done = assert.async();

        base.onClick(function(e) {
            assert.ok(e instanceof MouseEvent);
            return done();
        }, $fixture);

        $($fixture).click();
    });

    QUnit.test('base.onReady', function(assert) {
        assert.expect(1);
        var done = assert.async();

        base.onReady(function() {
            assert.ok(true);
            return done();
        });
    });

    QUnit.test('base.trigger', function(assert) {
        assert.expect(1);
        var done = assert.async();

        $($fixture).on('test', function() {
            assert.ok(true);
            return done();
        });

        base.trigger('test', $fixture);
    });

    QUnit.test('base.toggleAttr', function(assert) {
        assert.expect(4);

        assert.ok(!$fixture.hasAttribute('data-test'));
        base.toggleAttr($fixture, 'data-test');
        assert.ok($fixture.hasAttribute('data-test'));
        base.toggleAttr($fixture, 'data-test');
        assert.ok(!$fixture.hasAttribute('data-test'));

        base.toggleAttr($fixture, 'data-test', false);
        assert.ok(!$fixture.hasAttribute('data-test'));
    });
})();
