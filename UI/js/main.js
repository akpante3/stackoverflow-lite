let thumbsDown = Array.from(document.querySelectorAll('.fa-thumbs-down'));
let thumbsUP = Array.from(document.querySelectorAll('.fa-thumbs-up'));
let profileAnswer = document.querySelector('#profile-answers');
let profileQuestion = document.querySelector('#profile-questions');
let profileHeader = document.querySelector('#profile-header');

// thumbs down downvote
thumbsDown.forEach( elem =>{
    elem.addEventListener("click", function() {
    if(elem.style.color==="red"){
      elem.style.color="black";
      elem.innerHTML = " "+0;;
      console.log("color")
    }else{
       elem.style.color="red";
       elem.innerHTML= " "+1;
    }
  });
});
//thumbs up upvote
thumbsUP.forEach( elem =>{
    elem.addEventListener("click", ()=> {
    if(elem.style.color==="green"){
      elem.style.color="black";
      elem.innerHTML = " "+0;
      console.log("color")
    }else{
       elem.style.color="green";
       elem.innerHTML= " "+1;
    }
  });
});
//profile mid nav item "Answers"
profileAnswer.addEventListener('click',()=>{
    if (profileHeader.classList.contains("active-nav-user")){
      return
    }else{
      profileAnswer.classList.add("active-nav-user");
      profileHeader.innerHTML ="Your Answers";
      profileQuestion.classList.remove("active-nav-user")
    } 

  });
  //profile mid nav item "question"
  profileQuestion.addEventListener('click',()=>{
    if (profileQuestion.classList.contains("active-nav-user")){
      return
    }else{
      profileQuestion.classList.add("active-nav-user");
      profileHeader.innerHTML ="Your Question";
      profileAnswer.classList.remove("active-nav-user");
    }
  });
 