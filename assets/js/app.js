
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

