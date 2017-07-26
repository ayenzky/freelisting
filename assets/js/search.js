'use strict';
/* global instantsearch */

var appId = 'DAAAWM16TQ';
var apiKey = '44914085bfda74e89bf571bdac1d8022';
var indexName = 'prod_FREE';
$('.results-wrapper').hide();
var search = instantsearch({appId,apiKey,indexName,
  urlSync: false,
  hierarchicalFacetsRefinements: {
    type: ['featured']
  }
});

// var isearch = instantsearch({appId,apiKey,indexName,
//   urlSync: false,
//   hierarchicalFacetsRefinements: {
//     type: ['free']
//   }
// });

// var isearch = instantsearch({appId,apiKey,indexName,
//   urlSync: false,
//   searchFunction: function(helper) {
//     var searchResults = $('#hits');
//     if (helper.state.query === '') {
//       searchResults.hide();
//       return;
//     }
//     helper.search();
//     searchResults.show();
//   }
// });


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
    container: '#hits',
    attributeName: 'type',
    hitsPerPage: 3,
    templates: {
      header: 'Featured Ads',
      item: document.getElementById('hit-template').innerHTML
    },
    cssClasses: {
      item: 'featured-list col l4  mb-16'
    }
  })
);

// isearch.addWidget(
//   instantsearch.widgets.hits({
//     container: '#freelisting',
//     attributeName: 'type',
//     templates: {
//       header: 'Featured Ads',
//       item: document.getElementById('free-template').innerHTML,
//     },
//     cssClasses: {
//       item: 'lists col l4  mb-16'
//     }
//   })
// );

search.on('render', function(){
  $('.list-title').createExcerpts('.short-desc',100,'...');
  $('.list').click(function(e){
   var type = $(this).find('.type').text();
   if(type == "Free"){
    e.preventDefault();
    var selected = $(this).find('.list-link').text();
    var temp = selected.replace(/\s/g, '-');
    console.log(temp)
    var url = "/list" +"?q="+ temp.toLowerCase();
    window.location.replace(url)
   }
  })
  $("#search-input").on('keyup', function() {
  if($(this).val().length == 0) {
    $('.results-wrapper').hide()
    $('.main-wrapper').show()

  }else{
    $('.results-wrapper').show()
    $('.main-wrapper').hide()
   }
  });
  $('.facet-item').click(function(e){
    e.preventDefault();
    $('.results-wrapper').show()
    $('.main-wrapper').hide()
  })
  $('.ais-clear-all--link').click(function(e){
    e.preventDefault();
    $('.results-wrapper').hide()
    $('.main-wrapper').show()

  })



})

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-input',
    placeholder: 'Search a product'
  })
);

// isearch.addWidget(
//   instantsearch.widgets.searchBox({
//     container: '#search-input',
//     placeholder: 'Search a product'
//   })
// );

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats',
    autoHideContainer: true,
    cssClasses:{
      body: 'red-text',
      time: 'grey-text text-darken-4'
    }
  })
);

// search.addWidget(
//   instantsearch.widgets.hits({
//     container: '#hits',
//     templates: {
//       header: '<h5>Search Results</h5>',
//       item: document.getElementById('hit-template').innerHTML,
//       empty: "We didn't find any results for the search <em>\"{{query}}\"</em>",
//     },
//     cssClasses: {
//       root: 'row',
//       item: 'col l4  mb-16'
//     }
//   })
// );


search.addWidget(
  instantsearch.widgets.menu({
      container: '#categories',
      attributeName: 'categories',
      templates: {
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
      header: '<h6>City</h6>',
      item: cityTemp
    },
    cssClasses: {
        header: 'city-list mb-16 red-text lighten-4',
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
      header: '<h6>Zipcode</h6>',
      item: zipTemp
    },
    cssClasses: {
        header: 'zip-list mt-16 mb-16 red-text lighten-4',
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
      link: 'waves-effect waves-light btn red white-text'
    },
    autoHideContainer: true
  })
);


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

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#hits-pagination',
    cssClasses: {
      active: 'active'
    },
    labels: {
      previous: '<i class="material-icons">chevron_left</i>',
      next: '<i class="material-icons">chevron_right</i>'
    },
    showFirstLast: false
  })
);

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
// isearch.start();