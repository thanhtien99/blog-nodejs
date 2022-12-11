
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
});