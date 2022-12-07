
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
                  alert('oke!!!')
              }else{
                alert('Wrong!');
              }
          });
    });
});