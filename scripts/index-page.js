const comments=[
    {
        username:"Connor Walton ",
        time:"02/17/2021",
        content:"This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        username:"Emilie Beach",
        time:"01/09/2021",
        content:"I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        username:"Miles Acosta",
        time:"12/20/2020",
        content:"I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

//loading commonts history

function renderComments(comments) {
    const renderContainer = document.querySelector('#comments-render');

    comments.forEach(comment => {
        const renderContent = document.createElement('div');
        renderContent.classList.add('comments__history');

        renderContent.innerHTML = `
            <div class="comments__history-img"></div>
            <div class="comments__history-textBox">
                <span class="comments__history-title">${comment.username}</span>
                <span class="comments__history-time">${comment.time}</span>
                <p class="comments__history-text">${comment.content}</p>
            </div>
        `;

        renderContainer.appendChild(renderContent);
    });
}

renderComments(comments);


// adding new comments

const form = document.querySelector('#commentsform');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const usernameInput = e.target.elements.username;
    const commentInput = e.target.elements.usercomment;

    const commentbox = document.querySelector('.comments__new-comment');
    const namebox = document.querySelector('.comments__new-name');
    const commentHistory = document.querySelectorAll('.comments__history');

    if (!usernameInput.value) {
        namebox.style.border = "1px solid #D22D2D";
    }

    if (!commentInput.value) {
        commentbox.style.border = "1px solid #D22D2D";
    }

    const newComment = {
        username: usernameInput.value,
        time: Date.now(),
        content: commentInput.value
    }

    comments.unshift(newComment);

    commentHistory.forEach(element => {
        element.innerHTML = "";
    });

    for (let i = 0; i < Math.min(comments.length, 3); i++) {
        const comment = comments[i];
        const commentContainer = commentHistory[i];

        commentContainer.innerHTML = `
            <div class="comments__history-img"></div>
            <div class="comments__history-textBox">
                <span class="comments__history-title">${comment.username}</span>
                <span class="comments__history-time">${formatDate(comment.time)}</span>
                <p class="comments__history-text">${comment.content}</p>
            </div>
        `;
    }

    usernameInput.value = "";
    commentInput.value = "";

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return formattedDate;
    }
});
