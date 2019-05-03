$(function(){
  function insertHTML(message){
    var img = (message.image == null) ? '' : `<img src= ${message.image} class= "lower-message__image">`

    var html =`<div class="message" data-id=${message.id}>
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


  var reloadMessages = function(){
    if($('.messages')[0]){
      var last_message_id = $('.message:last').data('id');
    } else {
      var last_message_id = 0 
    }
    var last_message_id = $('.message:last').data('id');
    var group_id = $('.main-header').data('group-id');
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(data){
      //追加するHTMLの入れ物を作る
      var html = [];
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(data, function(i, data){
        html.push(insertHTML(data));
      });
      //メッセージが入ったHTMLを取得
      $.each(html, function(i, html){
      //メッセージを追加
        $('.messages').append(html);
      });
      //メッセージ分だけスクロール
      var height = $('.messages')[0].scrollHeight;
      $('.messages').animate({
      scrollTop: height}, 200);      
    })
    .fail(function(){
      alert('errorだよ')
    });
  };  
  
  var pathname = location.pathname.match(/messages/)
  var reg = RegExp(pathname);
  if(reg.test("messages")){
    setInterval(reloadMessages, 5000);
  }
  $('.message').on('click', function(){
    reloadMessages
  });
});