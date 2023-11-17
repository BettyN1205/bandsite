// THE DEVELOPERJOKES API(https://developerjokes.herokuapp.com) IS NOW MY SOURCE OF TRUTH
// --------------------------------
// - I should be aiming to delete my local array of data
// - whenever I need my jokes/data I should be using the developerjokes api

// JokesAPI class
// ---------------
//  - class to easily interface with the developerjokes api
//  - properties: apiKey, baseUrl
//       - used to create our axios call url's
//  - methods: getJokes(), postJokes()

class JokesAPI {
  constructor(apikey) {
    this.apiKey = apikey;
    this.baseUrl = "https://developerjokes.herokuapp.com";
  }

  // get all jokes from api
  async getJokes() {
    const response = await axios.get(`${this.baseUrl}/jokes`);

    return response.data;
  }

  // post new joke to api - requires a joke object as its second argument
  async postJoke(joke) {
    const response = await axios.post(
      `${this.baseUrl}/jokes?api_key=${this.apiKey}`,
      joke
    );
    console.log(response);
  }
}

// create instance of JokesAPI class
const jokesAPI = new JokesAPI("neocat");
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
