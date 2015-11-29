$(function() {

	// Defined model and views:
	//=========================
	var ShopsModel = $.Model(shops, 'shops-model');

  // Define shops view:
	var ShopsView = $.View({
		element: '#shop-list',
		model: ShopsModel,
    variable: 'shop',
    template: '<li data-goto="coffeeShopDetail:${ shop.id }">\
      <img data-src="${ shop.image }" alt="${ shop.name }">\
      <div>\
        <h3>${ shop.name }</h3>\
        <h4>${ shop.location }</h4>\
        <p>${ shop.description }</p>\
      </div>\
      <aside><disclosure></disclosure></aside>\
    </li>'
	});
	ShopsView.render();

  // Define detail view:
	var ShopDetailView = $.View({
		element: '#shopDetail',
    variable: 'shop',
    template: '<li>\
      <img data-src="${ shop.image }" alt="${ shop.name }">\
      <div>\
        <h3>${ shop.name } <a class="offsiteLink" href="${ shop.site }"></a></h3>\
        <h4>${ shop.location }</h4>\
        <p>${ shop.content }</p>\
      </div>\
    </li>'
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