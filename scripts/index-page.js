//create default comments
const comments = [
  {
    username: "Connor Walton ",
    time: "02/17/2021",
    content:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    username: "Emilie Beach",
    time: "01/09/2021",
    content:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    username: "Miles Acosta",
    time: "12/20/2020",
    content:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

// Function to format relative time
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

//rendering defualt commonts

function renderComments(comments) {
  const renderContainer = document.querySelector("#comments-render");

  comments.forEach((comment) => {
    const renderContent = document.createElement("div");
    renderContent.classList.add("comments__history");

    const timestamp = new Date(comment.time).getTime();

    renderContent.innerHTML = `
            <div class="comments__history-img"></div>
            <div class="comments__history-textBox">
                <span class="comments__history-title">${comment.username}</span>
                <span class="comments__history-time">${formatRelativeTime(
                  timestamp
                )}</span>
                <p class="comments__history-text">${comment.content}</p>
            </div>
        `;

    renderContainer.appendChild(renderContent);
  });
}

renderComments(comments);

// adding new comments

const form = document.querySelector("#commentsform");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const usernameInput = e.target.elements.username;
  const commentInput = e.target.elements.usercomment;

  const commentbox = document.querySelector(".comments__new-comment");
  const namebox = document.querySelector(".comments__new-name");
  const commentHistory = document.querySelectorAll(".comments__history");

  //Form Validation
  if (usernameInput.value.trim() && commentInput.value.trim()) {
    const newComment = {
      username: usernameInput.value,
      time: Date.now(),
      content: commentInput.value,
    };

    comments.unshift(newComment);

    commentHistory.forEach((element) => {
      element.innerHTML = "";
    });

    for (let i = 0; i < Math.min(comments.length, 3); i++) {
      const comment = comments[i];
      const commentContainer = commentHistory[i];

      commentContainer.innerHTML = `
              <div class="comments__history-img"></div>
              <div class="comments__history-textBox">
                  <span class="comments__history-title">${
                    comment.username
                  }</span>
                  <span class="comments__history-time">${formatRelativeTime(
                    comment.time
                  )}</span>
                  <p class="comments__history-text">${comment.content}</p>
              </div>
          `;
    }

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
