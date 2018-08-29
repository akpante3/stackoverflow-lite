$('document').ready(() =>  {

    $('button.postbtn').click((e) => {
       e.preventDefault();
       const question =$('input.post-question').val();
       fetch('http://localhost:8000/v1/questions', {
            method : 'post',
            body : JSON.stringify({question}),
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json'
            }
       })
    //    .then(res => {
    //        res.json().then(data => {
    //          const question = data.results.question;
    //          $('.questions').prepend(`<hr>
    //          <i class="fas fa-1x fa-user-circle" ></i>
    //          <h4>Texy</h4>
    //          <h3>
    //              <a href="./answers.html">
    //                  ${question}
    //              </a>
    //          </h3>
    //          <ul>
    //              <li><a><i class="fas fa-thumbs-up"> 0 </i></a></li>
    //              <li> <a><i class="fas fa-thumbs-down"> 0 </i></a></li>
    //              <li><a href="./answers.html"><i class="fas fa-comments"> 0 </i></a> 
    //          </ul>`)
    //        });
    //    }); 
    });
})