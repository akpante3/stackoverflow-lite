$('document').ready(() =>  {
    const Access_Key = 'access_token';
    const appendQuestion = (questions) => {

        questions.forEach(question => {
            const template = `<i class="fas fa-1x fa-user-circle" ></i>
            <h4>${question.name}</h4>
            <h3>
                <a href="./answers.html">
                    ${question.question}
                </a>
            </h3>
            <ul>
                <li><a><i class="fas fa-thumbs-up"> 0 </i></a></li>
                <li> <i class="fas fa-thumbs-down"> 0 </i></li>
                <li><a href="./answers.html"><i class="fas fa-comments"> 4 </i></a> </li>
            </ul>
            <hr>`
            $('div.questions').append(template);
        });
        
    }
    const loadQuestion = () => {
        fetch('http://localhost:8000/v1/questions', {
            method : 'get',
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json',
                accessToken : window.localStorage.getItem(Access_Key)
            }
       })
       .then(res => {
           if(res.status == 200) {
            res.json().then(result => {
                appendQuestion(result.data)
            });
           }
       }); 
    }

    loadQuestion();  
})