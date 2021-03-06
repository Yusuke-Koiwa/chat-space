$(function(){

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message);
        });
        $('.message-list').append(insertHTML);
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error!');
    });
  };

  function buildHTML(message) {
    var message_top =
      `<div class="message__top">
        <div class="message__top__user-name">
          ${message.user_name}
        </div>
        <div class="message__top__date">
          ${message.created_at}
        </div>
      </div>`
    if (message.image) {
      var html =
        `<div class="message" data-message-id=${message.id}>
          ${message_top}
          <div class="message__bottom">
            <p class="message__bottom__text">
              ${message.body}
            </p>
            <img src=${message.image} class="message__bottom__image" >
          </div>
        </div>`
      return html;
    } else {
      var html =
        `<div class="message" data-message-id=${message.id}>
          ${message_top}
          <div class="message__bottom">
            <p class="message__bottom__text">
              ${message.body}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('form')[0].reset();
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('.form-items__send-btn').prop("disabled", false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.form-items__send-btn').prop("disabled", false);
    });
  });

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});