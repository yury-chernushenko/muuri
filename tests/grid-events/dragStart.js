(function (window) {

  var Muuri = window.Muuri;

  QUnit.module('Grid events');

  QUnit.test('dragStart: should be triggered when dragging starts', function (assert) {

    assert.expect(4);

    var done = assert.async();
    var container = utils.createGridElements().container;
    var grid = new Muuri(container, {dragEnabled: true});
    var item = grid.getItems()[0];
    var calls = 0;
    var teardown = function () {
      grid.destroy();
      container.parentNode.removeChild(container);
      done();
    };

    grid.on('dragStart', function (draggedItem, ev) {
      assert.strictEqual(arguments.length, 2, 'callback: should have receive two arguments');
      assert.strictEqual(draggedItem, item, 'callback: first argument should be the dragged item');
      assert.strictEqual(utils.isHammerEvent(ev), true, 'callback: second argument should be a hammer event object');
      ++calls;
    });

    utils.dragElement({
      element: item.getElement(),
      move: {
        left: 100,
        top: 100
      },
      onRelease: function () {
        assert.strictEqual(calls, 1, 'should be called only once during drag process');
        teardown();
      }
    });

  });

})(this);