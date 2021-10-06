$(document).ready(() => {
  if ($('.tooltip-emoji-picker').length > 0) {
    Popper.createPopper($('.tooltip-emoji-picker'));

    $('.emoji-picker-open-btn').click((event) => {
      event.stopPropagation();
      const id = $(event.currentTarget).data('id');
      $('.tooltip-emoji-picker')
        .not('#tooltip-' + id)
        .removeClass('shown');
      $('#tooltip-' + id).toggleClass('shown');
    });

    $('emoji-picker').on('emoji-click', (event) => {
      event.stopPropagation();
      const id = $(event.currentTarget).data('id');
      $('#column-emojis-' + id).val(event.detail.unicode);
      $('.tooltip-emoji-picker').removeClass('shown');
    });

    // Prevent closing emoji picker on using picker
    $('emoji-picker').click((event) => {
      event.stopPropagation();
    });

    $(window).click(() => {
      $('.tooltip-emoji-picker').removeClass('shown');
    });
  }
});
