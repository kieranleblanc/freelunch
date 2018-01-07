function didSelectCurtain() {
     const login = document.getElementById('login'),
           post = document.getElementById('post');
     if (!login.hidden) { login.hidden = true };
     if (!post.hidden) { post.hidden = true };
     curtain.hidden = true;
}

function didSelectLogin() {
     const login = document.getElementById('login');
     login.hidden = !login.hidden; curtain.hidden = !curtain.hidden;
}

function didSelectPost() {
     const post = document.getElementById('post');
     post.hidden = !post.hidden; curtain.hidden = !curtain.hidden;
}

function didSubmitForm() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      var request = new XMLHttpRequest();
      request.open('POST', '/auth', true);
      request.setRequestHeader('Content-Type', 'application/json');
      var data = JSON.stringify({"email": email, "password": password});
      request.send(data);

      request.onreadystatechange = function() {
         if (request.readyState === 4) {
              var res = JSON.parse(request.response);
              console.debug(res.error)
              if ( res.error ) {
                   document.getElementById("error").hidden = false;
              } else {
                   window.location.assign("/");
              }

         }
     };

     return false
};
