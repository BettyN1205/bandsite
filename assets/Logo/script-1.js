// SHOULD BE DELETING THIS EVENTUALLY
// const jokes = [
//   {
//     id: "c367bf27-0b20-49ea-a42e-c4b50c2817e4",
//     question: "What do you call a computer that sings?",
//     response: "A Dell.",
//     posted: 1683237181616,
//   },
//   {
//     id: "539168df-782b-4e52-aff6-e7bbab377c20",
//     question: "How do you comfort a JavaScript bug?",
//     response: "You console it.",
//     posted: 1678219160803,
//   },
//   {
//     id: "4483389b-9286-4308-83dc-52ab5853f549",
//     question: "Why did the programmer quit their job?",
//     response: "Because they didn't get arrays.",
//     posted: 1678219169696,
//   },
// ];

// THE DEVELOPERJOKES API(https://developerjokes.herokuapp.com) IS NOW MY SOURCE OF TRUTH
// --------------------------------
// - I should be aiming to delete my local array of data
// - whenever I need my jokes/data I should be using the developerjokes api

// JokesAPI class
// ---------------
//  - class to easily interface with the developerjokes api
//  - properties: apiKey, baseUrl
//       - not using for this version of demo, see script-2.js for final version
//  - methods: getJokes(), postJokes()

class JokesAPI {
  constructor() {
    this.apiKey = "api key";
    this.baseUrl = "https://developerjokes.herokuapp.com";
  }

  // get all jokes from api
  async getJokes() {
    const response = await axios.get(
      "https://developerjokes.herokuapp.com/jokes"
    );

    return response.data;
  }

  // post new joke to api - requires a joke object as its second argument
  async postJoke(joke) {
    const response = await axios.post(
      "https://developerjokes.herokuapp.com/jokes?api_key=neocat",
      joke
    );
    console.log(response);
  }
}

// create instance of JokesAPI class
const jokesAPI = new JokesAPI();
// console.log(jokesAPI);

const jokeList = document.querySelector(".joke-list"); // <ul>
const form = document.querySelector(".form");

// fetch jokes and display to the DOM
//  - because we are awaiting the jokesAPI.getJokes() this function also needs to be async
async function fetchJokes() {
  jokeList.innerHTML = "";

  // use the jokesAPI.getJokes() method to get all jokes from the developerjokes api
  // -------------------------------------------------
  // - getJokes() is async so we need to use await to wait for the response to return
  const jokes = await jokesAPI.getJokes();
  // console.log("jokes", jokes);

  jokes.forEach((joke) => {
    const jokeListItem = document.createElement("li");
    jokeListItem.classList.add("joke-list__item");
    jokeList.appendChild(jokeListItem);

    const jokeQuestion = document.createElement("p");
    jokeQuestion.classList.add("joke-list__question");
    jokeQuestion.innerText = joke.question;
    jokeListItem.appendChild(jokeQuestion);

    const jokeAnswer = document.createElement("p");
    jokeAnswer.classList.add("joke-list__answer");
    jokeAnswer.innerText = joke.answer;
    jokeListItem.appendChild(jokeAnswer);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newJoke = {
    question: event.target.question.value,
    answer: event.target.answer.value,
  };

  // use jokesAPI.postJoke() to add the newJoke from the form to the developerjokes api
  await jokesAPI.postJoke(newJoke);

  // wait for the post to complete and call fetchJokes() to get and display the newly updated developerjokes api
  fetchJokes();

  form.reset();
});

fetchJokes();
