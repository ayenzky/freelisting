'use strict';
/* global instantsearch */

var search = instantsearch({
  appId: 'DAAAWM16TQ',
  apiKey: '44914085bfda74e89bf571bdac1d8022',
  indexName: 'freelisting',
  urlSync: false,
  hierarchicalFacetsRefinements: {
    type: ['featured']
  }
});

var feaTemplate = '<div class="list">'+
                  '<div class="list-thumbnail"><a href="{{url}}" target="_blank" class="details"><img src="{{image}}"></a></div>'+
                  '<div class="list-title"><a href="{{url}}" target="_blank" class="list-link">{{name}}</a>'+
                    '<div class="blurb"></div>'+
                  '</div>'+
                '</div>'

var categoryTemp = '<div class="c-list">'+
                    '<a href="javascript:void(0);" class="facet-item {{#isRefined}}active{{/isRefined}}">{{name}} <span class="count">({{count}})</span></a>'+
                    '</div>';

var cityTemp = '<div class="c-list">'+
                    '<a href="javascript:void(0);" class="facet-item {{#isRefined}}active{{/isRefined}}">{{name}} <span class="count">({{count}})</span></a>'+
                    '</div>';
var zipTemp = '<div class="c-list">'+
                    '<a href="javascript:void(0);" class="facet-item {{#isRefined}}active{{/isRefined}}">{{name}} <span class="count">({{count}})</span></a>'+
                    '</div>';

search.addWidget(
  instantsearch.widgets.hits({
    container: '#featured',
    attributeName: 'type',
    templates: {
      header: 'Featured Ads',
      item: document.getElementById('feat-template').innerHTML,
    },
    cssClasses: {
      body: 'isotope-container',
      item: 'featured-list col l3  mb-16 isotope-item'
    }
  })
);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-input',
    placeholder: 'Search a product'
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats'
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      item: document.getElementById('hit-template').innerHTML,
      empty: "We didn't find any results for the search <em>\"{{query}}\"</em>",
    },
    cssClasses: {
      item: 'col l3  mb-16 isotope-item'
    }
  })
);


search.addWidget(
  instantsearch.widgets.menu({
      container: '#categories',
      attributeName: 'categories',
      templates: {
        header: '<h4>Categories</h4>',
        item: categoryTemp
      },
      cssClasses: {
        header: 'category-list',
        body: 'category-list-body',
        item: 'category-list-item'
      }
    })
);

search.addWidget(
  instantsearch.widgets.menu({
    container: '#city',
    limit: 5,
    showMore: true,
    attributeName: 'city',
    templates: {
      header: '<h5>City</h5>',
      item: cityTemp
    },
    cssClasses: {
        header: 'city-list',
        body: 'city-list-body',
        item: 'city-list-item'
    }
  })
);

search.addWidget(
  instantsearch.widgets.menu({
    container: '#zipcode',
    attributeName: 'zip',
    templates: {
      header: '<h5>Zipcode</h5>',
      item: zipTemp
    },
    cssClasses: {
        header: 'zip-list',
        body: 'zip-list-body',
        item: 'zip-list-item'
    }
  })
);


search.addWidget(
  instantsearch.widgets.clearAll({
    container: '#clear-all',
    templates: {
      link: '<i class="fa fa-eraser"></i> Clear all filters'
    },
    cssClasses: {
      root: 'waves-effect waves-light btn'
    },
    autoHideContainer: true
  })
);

function searchFunction(helper){
  var searchResults = $('#hits');
  if(helper.state.query === ""){
    searchResults.hide();
    return;
  }
  helper.search();
  searchResults.show();
}

// search.addWidget(
//   instantsearch.widgets.sortBySelector({
//     container: '#sort-by-selector',
//     indices: [
//       {name: 'name', label: 'Most relevant'}
//     ],
//     label:'sort by',
//     autoHideContainer: false
//   })
// );



// search.addWidget(
//   instantsearch.widgets.stats({
//     container: '#stats'
//   })
// );

// search.on('render', function() {
//   $('.product-picture img').addClass('transparent');
//   $('.product-picture img').one('load', function() {
//       $(this).removeClass('transparent');
//   }).each(function() {
//       if(this.complete) $(this).load();
//   });
// });

// var hitTemplate =
//   '<article class="hit">' +
//       '<div class="product-desc-wrapper">' +
//         '<div class="product-picture"><img src="{{{smallimg}}}"></div>' +
//         '<div class="product-name">{{{_highlightResult.title.value}}}</div>' +
//         '<div class="product-type">{{{_highlightResult.type.value}}}</div>' +
//         '<div class="product-price">${{price}}</div>' +
//         '<div class="product-rating">{{#stars}}<span class="ais-star-rating--star{{^.}}__empty{{/.}}"></span>{{/stars}}</div>' +
//       '</div>' +
//   '</article>';

// var noResultsTemplate =
//   '<div class="text-center">No results found matching <strong>{{query}}</strong>.</div>';



var menuTemplate =
  '<a href="javascript:void(0);" class="facet-item {{#isRefined}}active{{/isRefined}}"><span class="facet-name"><i class="fa fa-angle-right"></i> {{name}}</span class="facet-name"></a>';

// var facetTemplateCheckbox =
//   '<a href="javascript:void(0);" class="facet-item">' +
//     '<input type="checkbox" class="{{cssClasses.checkbox}}" value="{{name}}" {{#isRefined}}checked{{/isRefined}} />{{name}}' +
//     '<span class="facet-count">({{count}})</span>' +
//   '</a>';

var facetTemplateColors =
  '<a href="javascript:void(0);" data-facet-value="{{name}}" class="facet-color {{#isRefined}}checked{{/isRefined}}"></a>';

// search.addWidget(
//   instantsearch.widgets.hits({
//     container: '#hits',
//     hitsPerPage: 16,
//     templates: {
//       empty: noResultsTemplate,
//       item: hitTemplate
//     }
//     // transformData: function(hit) {
//     //   hit.stars = [];
//     //   for (var i = 1; i <= 5; ++i) {
//     //     hit.stars.push(i <= hit.rating);
//     //   }
//     //   return hit;
//     // }
//   })
// );

// search.addWidget(
//   instantsearch.widgets.pagination({
//     container: '#pagination',
//     cssClasses: {
//       active: 'active'
//     },
//     labels: {
//       previous: '<i class="fa fa-angle-left fa-2x"></i> Previous page',
//       next: 'Next page <i class="fa fa-angle-right fa-2x"></i>'
//     },
//     showFirstLast: false
//   })
// );

// search.addWidget(
//   instantsearch.widgets.refinementList({
//     container: '#brands',
//     attributeName: 'brand',
//     operator: 'or',
//     limit: 3,
//     templates: {
//       item: facetTemplateColors,
//       header: 'Brands'
//     }
//   })
// );

// search.addWidget(
//   instantsearch.widgets.hierarchicalMenu({
//     container: '#categories',
//     attributes: 'categories.business',
//     sortBy: ['title:asc'],
//     templates: {
//       item: menuTemplate
//     }
//   })
// );

// search.addWidget(
//   instantsearch.widgets.refinementList({
//     container: '#materials',
//     attributeName: 'materials',
//     operator: 'or',
//     limit: 10,
//     templates: {
//       item: facetTemplateCheckbox,
//       header: '<div class="facet-title">Materials</div class="facet-title">'
//     }
//   })
// );

// search.addWidget(
//   instantsearch.widgets.refinementList({
//     container: '#colors',
//     attributeName: 'colors',
//     operator: 'or',
//     limit: 10,
//     templates: {
//       item: facetTemplateColors,
//       header: '<div class="facet-title">Colors</div class="facet-title">'
//     }
//   })
// );

// search.addWidget(
//   instantsearch.widgets.starRating({
//     container: '#rating',
//     attributeName: 'rating',
//     templates: {
//       header: '<div class="facet-title">Ratings</div class="facet-title">'
//     }
//   })
// );

// search.addWidget(
//   instantsearch.widgets.priceRanges({
//     container: '#prices',
//     attributeName: 'price',
//     cssClasses: {
//       list: 'nav nav-list',
//       count: 'badge pull-right',
//       active: 'active'
//     },
//     templates: {
//       header: '<div class="facet-title">Prices</div class="facet-title">'
//     }
//   })
// );

// search.addWidget(
//   instantsearch.widgets.sortBySelector({
//     container: '#sort-by-selector',
//     indices: [
//       {type: 'featured', label: 'featured'},
//       {type: 'free', label: 'free'},
//     ],
//     label:'sort by'
//   })
// );

// search.addWidget(
//   instantsearch.widgets.clearAll({
//     container: '#clear-all',
//     templates: {
//       link: '<i class="fa fa-eraser"></i> Clear all filters'
//     },
//     cssClasses: {
//       root: 'btn btn-block btn-default'
//     },
//     autoHideContainer: true
//   })
// );

// if ($('.isotope-container').length>0) {
//   $(window).load(function() {

//    $('.isotope-container').fadeIn();

//     var $container = $('.isotope-container').isotope({
//       itemSelector: '.ais-hits--item',
//       layoutMode: 'masonry',
//       transitionDuration: '0.6s',
//       initLayout:true
//     });

//     $container.imagesLoaded( function(){
//       $container.isotope({
//            animationOptions: {
//            duration: 750,
//            easing: 'ease-in-out',
//            queue: true,
//            initLayout: true
//          }
//       });
//     });
//   });
// };

search.start();
