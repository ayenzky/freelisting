
var $input = $('input');
var $users = $('#users');


$(document).ready(function() {
  var client = algoliasearch("DAAAWM16TQ", "4711c5a5f317934bcfeb8bebd5f31ff6");
  var index = client.initIndex('freelisting');

  $input.keyup(function() {
    index.search($input.val(), {
      attributesToRetrieve: ['firstname', 'lastname'],
      hitsPerPage: 10,
      facets: '*'
    }, searchCallback);
  }).focus();
  var objects = [{
    firstname: 'Jimmie',
    lastname: 'Barninger'
  }, {
    firstname: 'Warren',
    lastname: 'Speach'
  }];

  index.addObjects(objects, function(err, content) {
    console.log(content);
  });


});

function searchCallback(err, content) {
  if (err) {
    console.error(err);
    return;
  }

  $users.empty();

  for (var i = 0; i < content.hits.length; i++) {
    $users.append('<li>' + content.hits[i].firstname + '</li>');
  }
};

