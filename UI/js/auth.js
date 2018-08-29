$(document).ready(() => {
    const Access_Key = 'access_token'
    console.log(window.localStorage.getItem(Access_Key))
   
    const setAccessToken = (token) => {
        if(window.localStorage.getItem(Access_Key) === null){
            window.localStorage.setItem(Access_Key, token);
            return;
        }
        localStorage.removeItem(Access_Key);
        window.localStorage.setItem(Access_Key, token);
    }
    

    $('button.signupbtn').click((e) => {
        e.preventDefault();
        const email = $('input.email').val();
        const password = $('input.password').val();
        const repeatPassword = $('input.repeat-password').val();
        if(password != repeatPassword)
        {
            $('form.sign-container').append(`<p>password must be the same</p>`)
            return;
        }

        fetch('http://localhost:8000/v1/auth/signup', {
            method : 'post',
            body : JSON.stringify({email, password}),
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            }

        }).then(res => {
            res.json().then(data => {
                const token = data.results.token;
                setAccessToken(token);
            });
            
        });
    });
    
    $('button.loginbtn').click((e) => {
        e.preventDefault();
       const email = $('input.email').val();
       const password = $('input.password').val();

       fetch('http://localhost:8000/v1/auth/login', {
        method : 'post',
        body : JSON.stringify({email, password}),
        headers : {
            'Accept' : 'application/json',
            'Content-Type':'application/json'
        }

        }).then(res => {
            res.json().then(data => {
                const token = data.results.token;
                setAccessToken(token)
            });
        });

    });

// end 
});
