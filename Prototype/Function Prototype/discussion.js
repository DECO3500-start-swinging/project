// Online discussion area

let nameString = document.getElementById('name');
let commentString = document.getElementById('comment');
let contentString = document.getElementById('discussion-comments');
let btncloseString = document.getElementById('btn-close');
let btnsubmitString = document.getElementById('btn-submit');

let currentComments = [
    {
        name:'Jack',
        comment:"how many social patterns should we achieved in our project?",
        time:"Thu Oct 13 2022 21:16:36 GMT+0800 (Hong Kong Standard Time)"
    },
    {
        name:'Danny',
        comment:"I think the key point of social framework is how to combine the framework with our project.",
        time:"Thu Oct 13 2022 21:16:51 GMT+0800 (Hong Kong Standard Time)"
    },
  ];
  
  function postComments() {
    currentComments.unshift({
        name:nameString.value,
        comment:commentString.value,
        time:new Date()
    })
  }
  
  let deliverComment = function(comments){
    contentString.innerHTML = '';
    for(let i =0; i<comments.length;i++){
        let Comment = comments[i];
        contentString.insertAdjacentHTML(
            'beforeend',
            `
            <hr/>
            <h4>
            <span>${Comment.name}</span>
            <span class = "date">${Comment.time}</span>
            </h4>
            <p>${Comment.comment}</P>
            `
        );
    }
  }
  
  deliverComment(currentComments);
  
  btnsubmitString.onclick = function(){
    postComments(currentComments);
    deliverComment(currentComments);
  }
  
  btncloseString.onclick = function(){
    if(btncloseString.innerHTML == "CLOSE MESSAGE BOARD"){
        btncloseString.innerHTML= "OPEN MESSAGE BOARD";
        nameString.disable = true;
        commnetStr,disable = true;
    }
    else {
        btncloseString.innerHTML= "CLOSE MESSAGE BOARD";
        nameString.disable = false;
        commnetStr,disable = false;
    }
  }