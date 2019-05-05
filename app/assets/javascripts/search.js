$(document).on('turbolinks:load',function(){
var search_list = $("#user-search-result");
function appendUser(user){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>`
      search_list.append(html);
}
function appendErrMsgToHTML(msg) {
  var html = `<div>
                <p class="chat-group-user__name">${msg}</p>
              </div>`
  search_list.append(html);
}

var group_list = $("#chat-group-users");
function appendGroupList(name, id) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                  <input name="group[user_ids][]" type="hidden" value="${id}">
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  group_list.append(html);
}


  $('#user-search-field').on("keyup", function(){
    var input = $("#user-search-field").val();


    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
         });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });

  $('#user-search-result').on('click', '.chat-group-user__btn--add', function(){
    $(this).parent().remove()
    var name = $(this).data('userName');
    var id = $(this).data('userId');
    appendGroupList(name, id)
    $(this).prop("disabled",true);
  });

  $('#chat-group-users').on('click', '.js-remove-btn', function(){
    $(this).parent().remove()
  });


});
