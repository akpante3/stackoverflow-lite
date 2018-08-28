$(document).ready(() => {
    const Access_Key = 'access_token'
    console.log(window.localStorage.getItem(Access_Key))

    $('button.signupbtn').click((e) => {
        e.preventDefault();
        const email = $('input.email').val();
        const password = $('input.password').val();
        const repeatPassword = $('input.repeat-password').val();
        if(password != repeatPassword)
        {
            $('form').append(`<p>password must be the same</p>`)
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
                window.localStorage.setItem(Access_Key, token);
            });
            
        })
    })
})