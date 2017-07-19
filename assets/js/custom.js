jQuery(document).ready(function($){
  // browser window scroll (in pixels) after which the "menu" link is shown
  var offset = -1;

  var navigationContainer = $('#cd-nav'),
    mainNavigation = navigationContainer.find('#cd-main-nav ul');

  //hide or show the "menu" link
  checkMenu();
  $(window).scroll(function(){
    checkMenu();
  });

  //open or close the menu clicking on the bottom "menu" link
  $('.cd-nav-trigger').on('click', function(){
    $(this).toggleClass('menu-is-open');
    //we need to remove the transitionEnd event handler (we add it when scolling up with the menu open)
    mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');

  });

  function checkMenu() {
    if( $(window).scrollTop() > offset && !navigationContainer.hasClass('is-fixed')) {
      navigationContainer.addClass('is-fixed').find('.cd-nav-trigger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
        mainNavigation.addClass('has-transitions');
      });
    } else if ($(window).scrollTop() <= offset) {
      //check if the menu is open when scrolling up
      if( mainNavigation.hasClass('is-visible')  && !$('html').hasClass('no-csstransitions') ) {
        //close the menu with animation
        mainNavigation.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          //wait for the menu to be closed and do the rest
          mainNavigation.removeClass('is-visible is-hidden has-transitions');
          navigationContainer.removeClass('is-fixed');
          $('.cd-nav-trigger').removeClass('menu-is-open');
        });
      //check if the menu is open when scrolling up - fallback if transitions are not supported
      } else if( mainNavigation.hasClass('is-visible')  && $('html').hasClass('no-csstransitions') ) {
          mainNavigation.removeClass('is-visible has-transitions');
          navigationContainer.removeClass('is-fixed');
          $('.cd-nav-trigger').removeClass('menu-is-open');
      //scrolling up with menu closed
      } else {
        navigationContainer.removeClass('is-fixed');
        mainNavigation.removeClass('has-transitions');
      }
    }
  }


// $(".lists a.details").click(function(e){
//    e.preventDefault();
//    $('.modal-content').append('<div class="loader"><div class="preloader-wrapper small active"><div class="spinner-layer spinner-blue"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-red"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-yellow"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-green"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div>');
//    var dt = $(this).attr("data-target");
//    $("#" + dt).modal({
//       dismissible: true,
//       inDuration: 800,
//       ready: function(modal, trigger){
//         $('.preloader-wrapper').remove();
//       },
//       complete: function(){
//         console.log ("Close");
//       }
//    });
// })

 $('select').material_select();
 $('.lever').click(function(){
    if($('input[type="checkbox"]').is(':checked')){
      console.log(false)
     }
    else{
    console.log(false)
     }
})

  $(".button-collapse").sideNav();


});

function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}


if ($('.isotope-container').length>0) {
  $(window).load(function() {

   $('.isotope-container').fadeIn();

    var $container = $('.isotope-container').isotope({
      itemSelector: '.isotope-item',
      layoutMode: 'masonry',
      transitionDuration: '0.6s',
      initLayout:true
    });

    $container.imagesLoaded( function(){
      $container.isotope({
           animationOptions: {
           duration: 750,
           easing: 'ease-in-out',
           queue: true,
           initLayout: true
         }
      });
    });
  });
};

$( '#lazyjson' ).lazyjson({
    templatePrefix: 'template-',
    pagination: {
      lazyLoad: true
    },
    api: {
        uri: '/data/free_listing.json',
        forceJSONP: true
    }
});
