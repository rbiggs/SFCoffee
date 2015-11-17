$(function() {

	// Defined model and views:
	//=========================
	var ShopsModel = $.Model(shops, 'shops-model');
	var ShopsView = $.View({
		element: '#shop-list',
		model: ShopsModel
	});
	ShopsView.render();

	var ShopDetailView = $.View({
		element: '#shopDetail'
	});

	// Event handler to get to list of shops:
	$('#exploreButton').on('tap', function() {
		$.GoToScreen('shops');
	});
	// Set up router:
  var SelectedCoffeeRoute = $.Router();
  SelectedCoffeeRoute.addRoute([
    {
      route: 'coffeeShopDetail',
      callback: function(id) {
        var selectedShop = shops.filter(function(shop) {
          return shop.id === id;
        });
        ShopDetailView.render(selectedShop);
      }
    }
  ]);

  // Setup up About info sheet:
  //===========================
  var aboutApp = $('#aboutThisAppTemplate').html();
  $.Sheet({
    id: 'aboutSheet',
    handle: true,
    slideDown: true
  });
  // Register event to show sheet:
  $('#aboutSheet').find('section').html(aboutApp);
  // Open About sheet:
  $('#aboutThisApp').on('tap', function() {
		$.ShowSheet('#aboutSheet');
	});
  // Close About sheet:
	$('#aboutSheet').find('button').on('tap', function() {
		$.HideSheet('#aboutSheet');
	});

});