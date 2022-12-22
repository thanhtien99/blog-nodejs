
$(document).ready(function(){
    $(document).on('click', '#delete_blog', function(e) {
        e.stopPropagation();
        var blog_id = $(this).data('blog_id');
        var cf = confirm("Are you sure!");
        if (cf == true) {
          $.ajax({
              type: "DELETE",
              url: '/blogs/delete/' + blog_id,
              dataType: 'json',
          }).done(data => {
              if (data.type == 'success') {
                  $('.blogitem-'+blog_id).remove();
              }else{
                alert('Wrong!');
              }
          });
        }
    });

    //like
    $(document).on('click', '#like', function(e) {
        e.stopPropagation();
        var blog_id = $(this).data('blog_id');
          $.ajax({
              type: "PUT",
              url: '/blogs/like/' + blog_id,
              dataType: 'json',
          }).done(data => {
              if (data.type == 'success') {
                  $(this).addClass('hide');
                  $('#unlike').removeClass('hide');
              }else{
                alert('Wrong!');
              }
          });
    });
    //unlike
    $(document).on('click', '#unlike', function(e) {
        e.stopPropagation();
        var blog_id = $(this).data('blog_id');
          $.ajax({
              type: "PUT",
              url: '/blogs/unlike/' + blog_id,
              dataType: 'json',
          }).done(data => {
              if (data.type == 'success') {
                  $(this).addClass('hide');
                  $('.blog-pagination').prepend('<i class="fa-regular fa-heart like_icon con cac" id="like" data-blog_id=' + blog_id + '></i>');
              }else{
                alert('Wrong!');
              }
          });
    });

    //Comments
    $(document).on('click', '#btn_comment', function(e) {
        e.stopPropagation();
        var listCmt = $('#list_comments');
        var blog_id = $(this).data('blog_id');
        var user_id = $(this).data('user_id');
        var username = $(this).data('username');
        var comment_content = $('.comment_content').val();
          $.ajax({
              type: "POST",
              url: '/blogs/comment/' + blog_id,
              dataType: 'json',
              data : { user_id : user_id, username: username, comment_content: comment_content},
          }).done(data => {
              if (data.type == 'success') {
                 listCmt.prepend(`<ul class="comments_parent commentID-`+ data.commentID +`">
                    <li>
                    <div class="d-flex align-items-center justify-content-between">
                        <h6 class="font-weight-bold text-danger mb-1">`+ username +`</h6>
                        <p class="text-muted small mb-0"></p>
                    </div>
                    <p class="mt-3 mb-4 pb-2">`+ comment_content +`</p>
                    <!-- Reply comment -->
                    <div class="d-flex justify-content-end action-reply">
                        <div class="small d-flex mr-4">
                            <a path="<?php echo $this->commentData[$i]['path']; ?>" class="btn-reply d-flex align-items-center me-3 text-primary">
                            <i class="far fa-comment-dots mr-1"></i> Reply</a>
                        </div>
                        <!-- Delete Comment -->
                        <div class="small d-flex d mr-4">
                        <a id="delete_cmt" class="btn-reply d-flex align-items-center me-3 text-primary" data-cmt_id="`+ data.commentID +`">
                            <i class="fa-solid fa-trash"></i> Delete</a>
                        </div>
                    </div>
        
                    <hr class="hr1">
                    </li>
               </ul>`);
               $('.text-no-comment').addClass('hide');
              }else{
                alert('Wrong!');
              }
          });
    });

    // Show form reply cmt
    $(document).on('click', '#show_reply_cmt', function(e) {
        e.preventDefault();
        var comment_id = $(this).data('cmt_id');
        var blog_id = $(this).data('blog_id');
        var user_id = $(this).data('user_id');
        var username = $(this).data('username');
        if($(this).hasClass('open')){
            $(this).removeClass('open');
            $('.action-' + comment_id).find($('.form-reply')).remove();
        } else {
            $(this).addClass('open');
            $('.action-' + comment_id).append(` <div class="form-reply">
                <div class="flex-start w-100 concac">
                <h6 class="fw-bold text-danger mb-3">`+ username +`</h6>
                <div class="form-outline w-100 ml">
                <textarea class="form-control comment_content-`+ comment_id +`" rows="3" placeholder="Write your comment..." style="background: #fff;"></textarea>
                </div>
                </div>
                <div class="float-end mt-2 pt-1">
                    <button id="btn_comment_reply" type="submit" class="btn-comment btn btn-outline-dark btn-sm"
                    data-blog_id="`+ blog_id +`" data-user_id="`+ user_id +`" data-username="` + username + `" data-comment_id="` + comment_id + `">Post comment</button>
                </div>
            </div>`);
        }
    });
       //Reply Comments
       $(document).on('click', '#btn_comment_reply', function(e) {
        e.stopPropagation();
        var blog_id = $(this).data('blog_id');
        var comment_id = $(this).data('comment_id');
        var user_id = $(this).data('user_id');
        var username = $(this).data('username');
        var comment_content = $('.comment_content-'+comment_id).val();
        var listCmt = $('.list_comments_child-'+comment_id);
          $.ajax({
              type: "POST",
              url: '/blogs/replyCmt/' + comment_id,
              dataType: 'json',
              data : { user_id : user_id, username: username, comment_content: comment_content, blog_id : blog_id},
          }).done(data => {
              if (data.type == 'success') {
                 listCmt.prepend(`<ul class="comments_child">
                    <li>
                    <div class="card-body-comment reply_comment mar-l">
                        <div class="d-flex align-items-center justify-content-between">
                        <h6 class="font-weight-bold text-primary mb-1">`+ username +`</h6>
                        <p class="text-muted small mb-0">today</p>
                        </div>
                        <p class="mt-3 mb-4 pb-2">`+ comment_content +`</p>
                        <hr>
                    </div>
                    </li>
               </ul>`);
              }else{
                alert('Wrong!');
              }
          });
    });

    //Delete Comments
    $(document).on('click', '#delete_cmt', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var comment_id = $(this).data('cmt_id');
        var cf = confirm("Are you sure!");
        if (cf == true) {
          $.ajax({
              type: "DELETE",
              url: '/blogs/deleteCmt/' + comment_id,
              dataType: 'json',
          }).done(data => {
              if (data.type == 'success') {
                  $('.commentID-'+comment_id).remove();
              }else{
                alert('Wrong!');
              }
          });
        }
    });
});