$(function(){
  function buildHTML(message){
    var img = `<img src= ${message.image} class= "lower-message__image">`
    if (message.image == null){
      img = '';
    };
    var html =`<div class="message">
                 <div class="message-upper-info">
                   <p class="message-upper-info__talker">
                     ${message.user_name}
                   </p>
                   <p class="message-upper-info__date">
                     ${message.created_at}
                   </p>
                 </div>
                 <div class="message__text">
                   ${message.content}
                 </div>
                 ${img}
               </div>`
    return html ;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = $(this).attr('action')

    $.ajax({
      url: href,
      type: "post",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      var message = $('.messages')[0].scrollHeight;
      $('.messages').append(html);
      $('.messages').animate({
      scrollTop: message}, 200);
      $(".new_message")[0].reset();
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
    return false;

  })
});


