$(document).ready(function(){
    $(document).on('click', '#register', function(e) {
        e.stopPropagation();
        var formData =  $('#content-register').serialize();
        var username = $('#content-register').find('input[name="username"]').val();
        var email = $('#content-register').find('input[name="email"]').val();
        var password = $('#content-register').find('input[name="password"]').val();
        var repassword = $('#content-register').find('input[name="repassword"]').val();
        if(username == "" || email == "" || password == ""|| repassword == ""){
            $('#message_error').removeClass("hide");
            $('#message_error_match').addClass("hide");
        }else if(repassword != password){
            $('#message_error').addClass("hide");
            $('#message_error_match').removeClass("hide");
        }else{
            $.ajax({
                type: "POST",
                url: '/users/create',
                data: { username, email, password },
                dataType: 'json',
            }).done(data => {
                if (data.type == 'success') {
                    window.location.href = '/users/login';
                } else {
                    alert("Email already in use !");
                }
            });
        }
    });
});