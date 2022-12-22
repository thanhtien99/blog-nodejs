
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
                 listCmt.prepend(`<ul class="comments_parent">
                    <li>
                    <div class="d-flex align-items-center justify-content-between">
                        <h6 class="font-weight-bold text-danger mb-1">`+ username +`</h6>
                        <p class="text-muted small mb-0"></p>
                    </div>
                    <p class="mt-3 mb-4 pb-2">`+ comment_content +`</p>
                    <!-- Reply comment -->
                    <div class="d-flex justify-content-end">
                    <div class="small d-flex mr-4">
                        <a path="<?php echo $this->commentData[$i]['path']; ?>" class="btn-reply d-flex align-items-center me-3 text-primary">
                        <i class="far fa-comment-dots mr-1"></i> Reply</a>
                    </div>
                    <!-- Delete Comment -->
                    <div class="small d-flex d mr-4">
                    <a path="<?php echo $this->commentData[$i]['path']; ?>" class="btn-reply d-flex align-items-center me-3 text-primary">
                        <i class="fa-solid fa-trash"></i> Delete</a>
                    </div>
                    </div>
        
                    <hr class="hr1">
                    </li>
               </ul>`)
              }else{
                alert('Wrong!');
              }
          });
    });
});