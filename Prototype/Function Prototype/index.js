// Index page

let inputMessage = document.querySelector("main");
let tipsSection = document.querySelector(".comments");
let tipsReply = document.querySelector(".replycontainer");
let userInfo = [];
let userProfileInfo = [];
let tipsInfo = [];
let replyInfo = [];

async function getDataFromUser() {
  try {
    let responseMessage = await fetch("data.json");
    let dataGotten = await responseMessage.json();
    dataGotten.comments.forEach((tipDetail) => {
      tipsInfo.push(tipDetail);

      if (tipDetail.replies.length > 0) {
        tipDetail.replies.forEach((reply) => {
          replyInfo.push(reply);
        });
      }
    });

    userInfo.push(dataGotten.currentUser.username);
    userProfileInfo.push(dataGotten.currentUser.image.png);

  } catch (error) {
    console.log("error");
  }
}

// Show the gotten information on the page

getDataFromUser().then(() => {
  printDataOnPage();
});

const printDataOnPage = () => {
  // For first posted tips
  tipsInfo.forEach((element) => {
    tipsSection.innerHTML += tipsModelA(element);
  });
  // For afterwards reply message
  replyInfo.forEach((element) => {
    if (element.id === 3) {
      tipsReply.innerHTML += tipsModelB(element);
    } else {
      tipsReply.innerHTML += userFirstComment(element); // Shows "you"
    }
  });

  inputMessage.innerHTML += mainCommentBox();
};

// Displays the first tips posted on the screen
const tipsModelA = (element) => {
  let tipStructure = ` <div id="${element.id}" class="user-comment">
                <div class="details">
                <img src="${element.user.image.png}" alt="image" class="image">
                <p class="username">${element.user.username}</p>
                <p class="created">${element.createdAt}</p>
                </div>
                <p class="content"> ${element.content}</p>
               <div class="score-container" >
                <img src="images/icon-plus.svg" alt="image" class="plus" >
                <p class="score">${element.score}</p>
                <img src="images/icon-minus.svg" alt="image" class="minus">
                </div>
                    <div class="reply">
                <img src="images/icon-reply.svg" alt="image" class="click-reply arrow ">
                <p class="click-reply  replytext">Reply</p>
                </div>
               </div>
               <div class="replycontaine">
               </div>
                <div class="add-comments">
              </div>
               `;

  return tipStructure;
};

// Displays comment that is replying to other users (add "reply to" info)
const tipsModelB = (element) => {
  let tipStructure = ` <div id="${element.id}" class="user-comment">
                <div class="details">
                <img src="${element.user.image.png}" alt="image" class="image">
                <p class="username">${element.user.username}</p>
                <p class="created">${element.createdAt}</p>
                </div>
                <p class="content"> <span class="replyto">@${element.replyingTo} </span>${element.content}</p>
               <div class="score-container" >
                <img src="images/icon-plus.svg" alt="image" class="plus" >
                <p class="score">${element.score}</p>
                <img src="images/icon-minus.svg" alt="image" class="minus">
                </div>
                    <div class="reply">
                <img src="images/icon-reply.svg" alt="image" class="click-reply arrow">
                <p class="click-reply replytext">Reply</p>
                </div>
               </div>
               <div class="replycontaine">
               </div>
                <div class="add-comments">
              </div>             
               `;

  return tipStructure;
};

//Displays the current user's comment (shows "you" icon)
const userFirstComment = (element) => {
  let commentStructure = ` <div id="${element.id}" class="user-comment">
                  <div class="details">
                      <img src="${element.user.image.png}" alt="image" class="image">
                      <p class="username">${element.user.username}</p>
                      <p class="you">you</p>
                      <p class="created">${element.createdAt}</p>
                  </div>
                      <p class="content">  <span class="replyto">@${element.replyingTo} </span> ${element.content}</p>
                      <div class="score-container">
                          <img src="images/icon-plus.svg" alt="image" class="plus" >
                          <p class="score">${element.score}</p>
                          <img src="images/icon-minus.svg" alt="image" class="minus">
                      </div>                    
                      <div class="edit">
                        <img src="images/icon-edit.svg" alt="image" class="click-edit editimg">
                        <p class="click-edit">Edit</p>
                        </div>                               
              </div>
              <div class="editwrappe"></div>
              `;

  return commentStructure;
};

// function to insert the main user reply box at the bottom of the main page
const mainCommentBox = () => {
  let currentUser = `
    <div class="add-comments"></div>
             <div class="add-comment">
            <form  id="addCommentForm" class="replyform">
                <img class="profile" src="${userProfileInfo}" alt="image">
                <textarea class="textarea" name="add-comment" id="addCommentBox" placeholder="Add a comment..."></textarea>
                <div class="add-comment__trigger">
                    <button type="submit" class="page">SEND</button>
                </div>
            </form>
            </div>
        `;
  return currentUser;
};

//function to display editbox when the "edit" icon or "edit" text is clicked
const editBoxStructure = (createdAt, content, score) => {
  let editPartstructure = ` <div class="details">
                    <img src="${userProfileInfo}" alt="image" class="image">
                    <p class="username">${userInfo}</p>
                    <p class="you">you</p>
                    <p class="created">${createdAt}</p>
             </div>

                 <form id="addCommentForm" class="contents">
                <textarea class="textarea" name="add-comment" id="addCommentBox" placeholder="Add a comment...">${content}</textarea>

            <div class="score-con">
                    <img src="images/icon-plus.svg" alt="image" class="plus">
                    <p class="score">${score}</p>
                    <img src="images/icon-minus.svg" alt="image" class="minus">
                </div>

                <div class="add-comment__trigger">
                    <button type="submit" class="sends">UPDATE</button>
                </div>
        </form>
`;
  return editPartstructure;
};

//Display comment box when the "reply" arrow icon or "reply" text is clicked
const createComment = () => {
  let currentUser = `
            <form  id="addCommentForm" class="replyform">
                <img class="profile" src="${userProfileInfo}" alt="image">
                <textarea class="textarea" name="add-comment" id="addCommentBox" placeholder="Add a comment..."></textarea>
                <div class="add-comment__trigger">
                    <button type="submit" class="send">SEND</button>
                </div>
            </form>
        `;
  return currentUser;
};

//Display the added comments when the send button is clicked
const replybox = (replyTo, replyMsg) => {
  let replyStructure = ` <div id="4" class="user-comment">
              <div class="details">
                  <img src="${userProfileInfo}" alt="image" class="image">
                    <p class="username">${userInfo}</p>
                    <p class="you">you</p>
                  <p class="created">seconds ago</p>
              </div>
                  <p class="content">  <span class="replyto">@${replyTo}</span> ${replyMsg}</p>
              <div class="score-container">
                    <img src="images/icon-plus.svg" alt="image" class="plus" >
                  <p class="score">0</p>
                  <img src="images/icon-minus.svg" alt="image" class="minus">
              </div>                          
                <div class="edit">
                  <img src="images/icon-edit.svg" alt="image" class="click-edit editimg">
                <p class="click-edit">Edit</p>
                  </div>
          </div>                       
              <div class="editwrappe"></div>`;

  return replyStructure;
};

// Display the updated reply message
const updateReply = (createdAt, score, replyTo, contentText) => {
  let updateReplyStructure = ` <div class="details">
                    <img src="${userProfileInfo}" alt="image" class="image">
                    <p class="username">${userInfo}</p>
                    <p class="you">you</p>
                    <p class="created">${createdAt}</p>
                </div>
                    <p class="content">  <span class="replyto">${replyTo} </span> ${contentText}</p>
                    <div class="score-container">
                        <img src="images/icon-plus.svg" alt="image" class="plus" >
                        <p class="score">${score}</p>
                        <img src="images/icon-minus.svg" alt="image" class="minus">
                    </div>                                   
                      <div class="edit">
                      <img src="images/icon-edit.svg" alt="image" class="click-edit editimg">
                      <p class="click-edit">Edit</p>
                      </div>
            </div>                            
            <div class="editwrappe"></div>`;

  return updateReplyStructure;
};


// Click event details

let hasBeenClicked = false;

inputMessage.addEventListener("click", (e) => {
  e.preventDefault();
  let buttonClick = e.target;
  if (buttonClick.className.includes("plus") && !hasBeenClicked) {
    hasBeenClicked = true;
    buttonClick.nextElementSibling.textContent++;

  } else if (buttonClick.className.includes("minus") && hasBeenClicked) {
    hasBeenClicked = false;
    buttonClick.previousElementSibling.textContent--;

  } else if (buttonClick.className.includes("click-reply")) {
    buttonClick.parentElement.parentElement.nextElementSibling.innerHTML =
      createComment();
  } else if (buttonClick.className === "send") {
    let textBox = buttonClick.parentElement.parentElement.children[1];

    let container =
      buttonClick.parentElement.parentElement.parentElement.nextElementSibling;

    let username =
      buttonClick.parentElement.parentElement.parentElement
        .previousElementSibling.children[0].children[1].textContent;

    let reply = textBox.value.trim();
    if (reply.length > 0) {
      container.innerHTML += replybox(username, reply);

      let replyboxContainer = buttonClick.parentElement.parentElement;

      replyboxContainer.innerHTML = "";
      replyboxContainer.style.display = "none";
    }
  } else if (buttonClick.className === "sends") {

    let replyContent =
      buttonClick.parentElement.parentElement.children[0].value.trim();

    let replyTo = replyContent.split(" ")[0];
  
    let contentText = replyContent.split(" ").slice(1).join(" ");
    let container = buttonClick.parentElement.parentElement.parentElement;
   
    let score =
      buttonClick.parentElement.previousElementSibling.children[1].textContent;
  
    let createdAt =
      buttonClick.parentElement.previousElementSibling.previousElementSibling
        .parentElement.previousElementSibling.children[3].textContent;
   

    container.innerHTML = updateReply(createdAt, score, replyTo, contentText);
  } else if (buttonClick.className === "page") {
    let textBoxx = buttonClick.parentElement.parentElement.children[1];

    let contain =
      buttonClick.parentElement.parentElement.parentElement
        .previousElementSibling;

    let reply = textBoxx.value.trim();
    if (reply.length > 0) {
      let replyTo = "Tommy";
    
      contain.innerHTML += replybox(replyTo, reply);
      textBoxx.value = "";
    }
  } else if (buttonClick.className.includes("click-edit")) {
  
    let container = buttonClick.parentElement.parentElement;

    let createdAt = container.children[0].children[3].textContent;

    let content = container.children[1].textContent;
    let score = container.children[2].children[1].textContent;

    container.innerHTML = editBoxStructure(createdAt, content, score);
  } else if (buttonClick.className.includes("leavecomment")) {
    
      buttonClick.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML =
        "";
   
  }
});




