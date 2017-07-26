'use strict';
/* global instantsearch */

$('.results-wrapper').hide();
var search = instantsearch({
  appId: 'DAAAWM16TQ',
  apiKey: '44914085bfda74e89bf571bdac1d8022',
  indexName: 'prod_FREE',
  urlSync: false
  // hierarchicalFacetsRefinements: {
  //   type: ['featured']
  // }
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
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 3,
    templates: {
      header: '<h4>Search Results</h4>',
      item: document.getElementById('hit-template').innerHTML,
      empty: "We didn't find any results for the search <em>\"{{query}}\"</em>",
    },
    cssClasses: {
      item: 'col l4  mb-16'
    }
  })
);


search.addWidget(
  instantsearch.widgets.menu({
      container: '#categories',
      attributeName: 'categories',
      templates: {
        header: '<h5>Categories</h5>',
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

function searchFunction(helper) {
    var searchResults = $('#hits');
    if (helper.state.query === '') {
      searchResults.hide();
      return;
    }
    helper.search();
    searchResults.show();
  }


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


var menuTemplate =
  '<a href="javascript:void(0);" class="facet-item {{#isRefined}}active{{/isRefined}}"><span class="facet-name"><i class="fa fa-angle-right"></i> {{name}}</span class="facet-name"></a>';


var facetTemplateColors =
  '<a href="javascript:void(0);" data-facet-value="{{name}}" class="facet-color {{#isRefined}}checked{{/isRefined}}"></a>';


search.start();