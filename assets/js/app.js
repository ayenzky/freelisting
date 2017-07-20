
// var $select = $('select');
// var selected = $select.find('option:selected').text();
// var $input = $('input');
// var $users = $('#results .isotope-container');

// $(document).ready(function() {
//   var client = algoliasearch("DAAAWM16TQ", "4711c5a5f317934bcfeb8bebd5f31ff6");
//   var index = client.initIndex('freelisting');

//   $select.change(function(){
//     var selected = $(this).find('option:selected').text();
//     console.log(selected);
//     $('#search-input').val(selected)
//   })

//   $input.keyup(function() {
//     index.search($input.val(), {
//       hitsPerPage: 10,
//       facets: '*'
//     }, searchCallback);
//   }).focus();

//     // index.addObjects(contactsJSON, function(err, content) {
//     //   console.log(content);
//     // });


// });


// function searchCallback(err, content) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   if (content.query != $input.val()) {
//     // do not consider out-dated queries
//     $users.empty();
//     return;
//   }
//  if (content.hits.length == 0 || $.trim(content.query) === '') {
//         // no results
//       $users.empty();
//       return;
//  }
//  $('.isotope-container').isotope({itemSelector: '.isotope-item', initLayout: true});


//   $users.empty();

//   for (var i = 0; i < content.hits.length; i++) {
//     $users.append('<div class="lists col l3 isotope-item mb-16">\
//                     <div class="list">\
//                       <div class="list-thumbnail"><a href="#" data-target="modal'+ i +'" class="details"><img src="'+ content.hits[i].smallimg +'"/></a></div>\
//                       <div class="list-title"><a href="#" class="list-link">'+ content.hits[i].title +'</a></div>\
//                     </div>\
//                   </div>');
//   }
// };

'use strict';

var $input = $('input');
var $users = $('#featured');


var client = algoliasearch("DAAAWM16TQ", "44914085bfda74e89bf571bdac1d8022");
var index = client.initIndex('freelisting');

  $input.keyup(function() {
    index.search($input.val(), {
      hitsPerPage: 10,
      filters: '(type: featured OR type: free)'
    }, searchCallback2);
  }).focus();

    index.search({
      hitsPerPage: 10,
      filters: 'type: featured'
    }, searchCallback);

    function searchCallback2(err, content) {
      if (err) {
        console.error(err);
        return;
     }

     $users.empty()

      for (var i = 0; i < content.hits.length; i++) {
        $users.append('<div class="featured-list col xs12 s6 m4 l3 mb-16"><div class="list">'+
                    '<div class="list-thumbnail"><a href="http://'+ content.hits[i].url +'" target="_blank" class="details"><img src="'+ content.hits[i].image +'"></a>'+
                    '<div class="blurb"><p class="type">'+ content.hits[i].type +'</p></div>'+
                    '</div>'+
                    '<div class="list-title">'+
                    '<a href="http://'+ content.hits[i].url +'" target="_blank" class="list-link">'+ content.hits[i].title +'</a>'+
                    '<div class="short-desc"><p>'+ content.hits[i].shortdesc +'</p></div>'+
                    '</div>'+
                    '</div></div>');
      }

      $('.list-title').createExcerpts('.short-desc',100,'...');
    };


    function searchCallback(err, content) {
      if (err) {
        console.error(err);
        return;
     }

      for (var i = 0; i < content.hits.length; i++) {
        $users.append('<div class="featured-list col xs12 s6 m4 l3 mb-16"><div class="list">'+
                    '<div class="list-thumbnail"><a href="http://'+ content.hits[i].url +'" target="_blank" class="details"><img src="'+ content.hits[i].image +'"></a>'+
                    '<div class="blurb"><p class="type">'+ content.hits[i].type +'</p></div>'+
                    '</div>'+
                    '<div class="list-title">'+
                    '<a href="http://'+ content.hits[i].url +'" target="_blank" class="list-link">'+ content.hits[i].title +'</a>'+
                    '<div class="short-desc"><p>'+ content.hits[i].shortdesc +'</p></div>'+
                    '</div>'+
                    '</div></div>');
      }
      $('.list-title').createExcerpts('.short-desc',100,'...');
    };




