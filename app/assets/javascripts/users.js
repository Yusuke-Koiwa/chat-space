$(function(){

  function addUser(user){
    if ( $("#chat-group-users.js-ass-user").find('.chat-group-user').hasClass(`add-user-${user.id}`) ) {
      var html = 
        `<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">ユーザーが見つかりません</p>
        </div>`
    } else {
    var html = 
      `<div class="chat-group-user add-user-${user.id} clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>`
    }
    $('#user-search-result').append(html);
  }

  function addNoUser(){
    var html =
      `<div class="chat-group-user clearfix">
         <p class="chat-group-user__name">ユーザーが見つかりません</p>
       </div>`
    $('#user-search-result').append(html);
  }

  function addUserToMember(id, name) {
    var html =
      `<div class='chat-group-user add-user-${id}'>
        <input name='group[user_ids][]' type='hidden' value='${id}'>
        <p class='chat-group-user__name'>${name}</p>
        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn data-user-id="${id}" data-user-name="${name}'>削除</div>
      </div>`
    $('#chat-group-users.js-ass-user').append(html);
  }

  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });

  $(document).on('click', '.chat-group-user__btn--add', function(){
    var id = $(this).data("userId");
    var name = $(this).data("userName");
    $(this).parent(".chat-group-user").remove();
    addUserToMember(id, name);
  })

  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent(".chat-group-user").remove();
  })

});