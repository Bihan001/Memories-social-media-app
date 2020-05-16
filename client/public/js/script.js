'use strict';

jQuery(document).ready(function ($) {
  $(window).trigger('scroll');
  $(window).trigger('resize');
});

/**
 * function for attaching sticky feature
 **/

function attachSticky() {
  // Sticky Chat Block
  $('#chat-block').stick_in_parent({
    parent: '#page-contents',
    offset_top: 20,
  });

  // Sticky Right Sidebar
  $('#sticky-sidebar').stick_in_parent({
    parent: '#page-contents',
    offset_top: 20,
  });
}

// Disable Sticky Feature in Mobile
$(window).on('resize', function () {
  if ($.isFunction($.fn.stick_in_parent)) {
    // Check if Screen wWdth is Less Than or Equal to 992px, Disable Sticky Feature
    if ($(this).width() <= 992) {
      $('#chat-block').trigger('sticky_kit:detach');
      $('#sticky-sidebar').trigger('sticky_kit:detach');

      return;
    } else {
      // Enabling Sticky Feature for Width Greater than 992px
      attachSticky();
    }

    // Firing Sticky Recalculate on Screen Resize
    return function (e) {
      return $(document.body).trigger('sticky_kit:recalc');
    };
  }
});
