(function (window) {

  var Muuri = window.Muuri;

  QUnit.module('Grid events');

  QUnit.test('filter: should be triggered after grid.filter()', function (assert) {

    assert.expect(3);

    var container = utils.createGridElements({itemCount: 2}).container;
    var grid = new Muuri(container);
    var itemsToShow = grid.getItems([0, 1]);
    var itemsToHide = grid.getItems([2, 3]);
    var teardown = function () {
      grid.destroy();
      container.parentNode.removeChild(container);
    };

    grid.on('filter', function (shownItems, hiddenItems) {
      assert.strictEqual(arguments.length, 2, 'callback: should have two arguments');
      assert.deepEqual(utils.sortItemsById(shownItems), utils.sortItemsById(itemsToShow), 'callback: array of shown items should be the first argument');
      assert.deepEqual(utils.sortItemsById(hiddenItems), utils.sortItemsById(itemsToHide), 'callback: array of hidden items should be the second argument');
    });
    grid.filter(function (item) {
      return itemsToShow.indexOf(item) > -1;
    });
    teardown();


  });

})(this);