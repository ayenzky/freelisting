'use strict';

var $input = $('input');
var $users = $('#featured');
var $business = $('#freelisting');
var $page  = $('#single-page');
var $info  = $('#list-info');


var client = algoliasearch("DAAAWM16TQ", "44914085bfda74e89bf571bdac1d8022");
var index = client.initIndex('prod_FREE');


  // $input.keyup(function() {
  //   index.search($input.val(), {
  //     filters: 'type: Featured'
  //   }, searchCallback2);
  // }).focus();


  index.search({
      filters: 'type: Featured'
  }, searchCallback);

  index.search({
      filters: 'type: Free'
  }, searchfreeCallback);


  function clicktopage(){

    $('.lists .list').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    var selected = $(this).find('.list-link').text();
    var temp = selected.replace(/\s/g, '-');
    console.log(temp)
    var url = "/list" +"?q="+ temp.toLowerCase();
    window.location.replace(url)
    })

  };

    var x = window.location.search;
    var query = x.replace(/%20/g, " ").replace('?q=', '');
    index.search(query, function(err, content) {
      if (err) {
        console.error(err);
        return;
      }

      $page.find('h1.page-title').text(content.hits[0].title);
      $page.find('.lazy').attr('data-src', content.hits[0].banner);
      $page.find('.postbody').html(content.hits[0].postbody);
      if(content.hits[0].address !== ""){
        $page.find($info).append('<div id="address"><i class="material-icons tiny">room</i><p class="address">'+content.hits[0].address+'</p>');
      }
      if(content.hits[0].phone !== ""){
        $page.find($info).append('<div id="phone"><i class="material-icons tiny">stay_current_portrait</i><p class="phone">'+content.hits[0].phone+'</p>');
      }
      if(content.hits[0].email !== ""){
        $page.find($info).append('<div id="email"><i class="material-icons tiny">email</i><p class="email"><a href="mailto:'+content.hits[0].email+'">'+content.hits[0].email+'</a></p>');
      }
      if(content.hits[0].web !== ""){
        $page.find($info).append('<div id="web"><i class="material-icons tiny">language</i><p class="web"><a href="http://'+content.hits[0].web+'" target="_blank">'+content.hits[0].web+'</a></p>');
      }
      if(content.hits[0].address !== ""){
        $page.find('#map').append('<iframe width="100%" height="300" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCcHeSmYvzt6smHyJ0WC2eSgCd4-1iIVxA\
                          &q='+content.hits[0].address+'" allowfullscreen=""></iframe>');
      }

    });

    function searchCallback2(err, content) {
      if (err) {
        console.error(err);
        return;
     }

     $users.empty()

      for (var i = 0; i < content.hits.length; i++) {

        $users.append('<div class="featured-list col xs12 s6 m4 l4 mb-16"><div class="list">'+
                    '<div class="list-thumbnail" style="background-color:'+content.hits[i].bgcolor+'"><a href="http://'+ content.hits[i].web +'" target="_blank" class="details"><img src="'+ content.hits[i].image +'"></a>'+
                    '<div class="blurb"><p class="type">'+ content.hits[i].type +'</p></div>'+
                    '</div>'+
                    '<div class="list-title">'+
                    '<a href="http://'+ content.hits[i].web +'" target="_blank" class="list-link">'+ content.hits[i].title +'</a>'+
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

      $.getJSON( "listing.json", function( data ) {
        var items = [];
        $.each(data, function(key, val){
          items.push(val)
        })
        console.log(items)
        index.addObjects(items, function(err, content){
          console.log(content)
        })

      });

      for (var i = 0; i < content.hits.length; i++) {
        $users.append('<div class="featured-list col xs12 s6 m4 l4 mb-16"><div class="list">'+
                    '<div class="list-thumbnail" style="background-color:'+content.hits[i].bgcolor+'"><a href="http://'+ content.hits[i].web +'" target="_blank" class="details"><img src="'+ content.hits[i].image +'"></a>'+
                    '<div class="blurb"><p class="type">'+ content.hits[i].type +'</p></div>'+
                    '</div>'+
                    '<div class="list-title">'+
                    '<a href="http://'+ content.hits[i].web +'" target="_blank" class="list-link">'+ content.hits[i].title +'</a>'+
                    '<div class="short-desc"><p>'+ content.hits[i].shortdesc +'</p></div>'+
                    '</div>'+
                    '</div></div>');
      }
      $('.list-title').createExcerpts('.short-desc',100,'...');
    };

    function searchfreeCallback(err, content) {
      if (err) {
        console.error(err);
        return;
     }

      for (var i = 0; i < content.hits.length; i++) {
        $business.append('<div class="lists col xs12 s6 m4 l4 mb-16"><div class="list">'+
                    '<div class="list-thumbnail" style="background-color:'+content.hits[i].bgcolor+'"><a href="#" target="_blank" class="details"><img src="'+ content.hits[i].image +'"></a>'+
                    '<div class="blurb"><p class="type">'+ content.hits[i].type +'</p></div>'+
                    '</div>'+
                    '<div class="list-title">'+
                    '<a href="#" target="_blank" class="list-link">'+ content.hits[i].title +'</a>'+
                    '</div>'+
                    '</div></div>');
      }
      clicktopage();
    };
