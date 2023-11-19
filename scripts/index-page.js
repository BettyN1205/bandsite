import BandSiteApi from "./band-site-api.js";

const apiKey = "c717bcb6-f19a-492d-bc98-0140cbcecc0a";
const bandSiteApi = new BandSiteApi(apiKey);

function formatRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    const currentDate = new Date();
    const commentDate = new Date(timestamp);
    const yearDifference =
      currentDate.getFullYear() - commentDate.getFullYear();
    return `${yearDifference} years ago`;
  }
}

function createElement(comment) {
  const renderContainer = document.querySelector("#comments-render");
  const renderContent = document.createElement("div");
  renderContent.classList.add("comments__history");
  const timestamp = comment.timestamp;
  renderContent.innerHTML = `
            <div class="comments__history-img"></div>
            <div class="comments__history-textBox">
                <span class="comments__history-title">${comment.name}</span>
                <span class="comments__history-time">${formatRelativeTime(
                  timestamp
                )}</span>
                <p class="comments__history-text">${comment.comment}</p>
                <span class="comments__history-like"><i class="fa-regular fa-heart"></i>${
                  comment.likes
                }</span>
                <span class="comments__history-delete"><i class="fa-regular fa-trash-can"></i></span>
            </div>
        `;
  renderContainer.appendChild(renderContent);
}

// render default comments
async function renderComments() {
  try {
    const comments = await bandSiteApi.getComments();
    // Get the last three default comments
    let arrLength = comments.length;
    for (let i = arrLength - 3; i < arrLength; i++) {
      createElement(comments[i]);
    }
    addLikes();
    deleteComment();
  } catch (error) {
    console.log(error);
  }
}
renderComments();

//adding new comment

const form = document.querySelector("#commentsform");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const usernameInput = e.target.elements.username;
  const commentInput = e.target.elements.usercomment;
  const commentbox = document.querySelector(".comments__new-comment");
  const namebox = document.querySelector(".comments__new-name");
  const commentHistory = document.querySelectorAll(".comments__history");
  const renderContainer = document.querySelector("#comments-render");

  //Form Validation
  if (usernameInput.value.trim() && commentInput.value.trim()) {
    const newComment = {
      name: usernameInput.value,
      comment: commentInput.value,
    };
    // Add the new comment on API
    await bandSiteApi.postComments(newComment);
    // Get all comments after adding the new comment
    const comments = await bandSiteApi.getComments();
    //clean up the page
    renderContainer.innerHTML = "";
    // Get the latest three comments
    for (let i = 0; i < 3; i++) {
      createElement(comments[i]);
    }
    addLikes();
    deleteComment();

    usernameInput.value = "";
    commentInput.value = "";
    namebox.style.border = "";
    commentbox.style.border = "";
  } else if (!usernameInput.value.trim()) {
    namebox.style.border = "1px solid #D22D2D";
  } else if (!commentInput.value.trim()) {
    commentbox.style.border = "1px solid #D22D2D";
  }
});

addLikes();
deleteComment();

// add likes
async function addLikes() {
  const likes = document.querySelectorAll(".comments__history-like");
  likes.forEach((like, index) => {
    like.addEventListener("click", async () => {
      const comments = await bandSiteApi.getComments();
      const commentId = comments[index].id;
      await bandSiteApi.likeComment(commentId);
      like.innerHTML = `
      <i class="fa-solid fa-heart"></i>${comments[index].likes}</span>
      `;
    });
  });
}

// delete comments
async function deleteComment() {
  const delBtns = document.querySelectorAll(".comments__history-delete");
  delBtns.forEach((del, index) => {
    del.addEventListener("click", async () => {
      const comments = await bandSiteApi.getComments();
      const commentId = comments[index].id;

      await bandSiteApi.deleteComment(commentId);

      const renderContainer = document.querySelector("#comments-render");
      renderContainer.innerHTML = "";
      const latestComments = await bandSiteApi.getComments();
      for (let i = 0; i < 3; i++) {
        createElement(latestComments[i]);
      }
      addLikes();
      deleteComment();
    });
  });
}
