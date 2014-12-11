jQuery(document).ready(function ($) {

  var $body = $('body');
  var $links = $('nav a');
  var $menu = $('.menu');
  var $zone = $('.zone');
  var $collapse = $('.collapse input');
  var $container = $('.views');
  var $views = $('.view');
  var $others = $('.list, .list + div, .bloc, .form, .element');
  var $infos = $('.info p');
  var $tooltip = $('.info-tooltip');
  var $overlay = $('.overlay');

  var navigate = function(template) {
    var $link = $('nav a[data-template='+template+']')
    var $view = $('#'+template);
    var view_offset = $view.offset().left;
    $body.scrollLeft(view_offset);
  }

  var space = function() {
    $views.each( function(index) {
      var view_width = $(this).outerWidth();
      var body_width = $container.outerWidth();
      var percentage = (view_width / body_width) * 100;
      var $link = $links.eq(index);
      if (index == ($links.length - 1)) {
        percentage = Math.floor(percentage);
      }
      $link.css('width', percentage + '%');
    });
  }

  var highlight = function() {
    var body_viewport = $body.outerWidth();
    var body_offset = $body.scrollLeft();
    var body_width = $container.outerWidth();
    var zone_offset = (body_offset / body_width) * 100;
    var zone_width = (body_viewport / body_width) * 100;
    $zone.css('left', zone_offset + '%');
    $zone.css('width', zone_width + '%');
  }

  $collapse.prop('checked', false);
  space();
  highlight();

  $links.click( function() {
    var template = $(this).data('template');
    navigate(template);
  });

  $infos.hover(
    function() {
      var content = $(this).data('title');
      var offset = $(this).position().left;
      $overlay.addClass('active');
      $tooltip.text(content).css('left', offset).addClass('active');
    }, function() {
      $overlay.removeClass('active');
      $tooltip.removeClass('active');
    }
  );

  $collapse.click( function() {
    $container.toggleClass('collapsed');
    $(this).parent().toggleClass('active');
    $others.toggle();
    space();
    highlight();
  });

  $(window).scroll( function() {
    highlight();
  });

});