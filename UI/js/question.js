$('document').ready(() =>  {
    const Access_Key = 'access_token';

    $('button.postbtn').click((e) => {
       e.preventDefault();
       const question =$('input.post-question').val();
       const token = window.localStorage.getItem(Access_Key);
       fetch('http://localhost:8000/v1/questions', {
            method : 'post',
            body : JSON.stringify({question}),
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json',
                accessToken : window.localStorage.getItem(Access_Key)
            }
       })
       .then(res => {
           if(res.status == 200) {
            location.href =  './../UI/index.html';
           }
       }); 
    });
})