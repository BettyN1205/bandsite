import BandSiteApi from "./band-site-api.js";

// const shows = [
//   {
//     date: "Mon Sept 06 2021",
//     venue: "Ronald Lane",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Tue Sept 21 2021",
//     venue: "Pier 3 East",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Fri Oct 15 2021",
//     venue: "View Lounge",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Sat Nov 06 2021",
//     venue: "Hyatt Agency",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Fri Nov 26 2021",
//     venue: "Moscow Center",
//     location: "San Francisco, CA",
//   },
//   {
//     date: "Wed Dec 15 2021",
//     venue: "Press Club",
//     location: "San Francisco, CA",
//   },
// ];

//format timestamp
function formatDate(timestamp) {
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = new Date(timestamp).toLocaleDateString('en-US', options);
  return formattedDate;
}

//render data from API
const apiKey = "c717bcb6-f19a-492d-bc98-0140cbcecc0a";
const bandSiteApi = new BandSiteApi(apiKey);

async function renderShows() {
  try {
    const shows= await bandSiteApi.getShows();
    const showsBox = document.querySelector(".shows__box");

    shows.forEach((show, index) => {
      const showDiv = document.createElement("div");
      showDiv.classList.add("shows__container");
    
      let subtitleClass = "shows__subtitle";
    
      if (index === 0) {
        subtitleClass += " first";
      }
    
      showDiv.innerHTML = `
        <div class="shows__container-box">
          <p class="${subtitleClass}">DATE</p>
          <p class="shows__content date">${formatDate(show.date)}</p>
        </div>
        <div class="shows__container-box">
          <p class="${subtitleClass}">VENUE</p>
          <p class="shows__content">${show.place}</p>
        </div>
        <div class="shows__container-box">
          <p class="${subtitleClass}">LOCATION</p>
          <p class="shows__content">${show.location}</p>
        </div>
        <div class="shows__button">BUY TICKETS</div>
      `;
    
      showsBox.appendChild(showDiv);
    
      // styling change
      let isBackgroundColorChanged = false;
    
      showDiv.addEventListener("click", () => {
        isBackgroundColorChanged = !isBackgroundColorChanged;
        if (isBackgroundColorChanged) {
          showDiv.style.backgroundColor = "#E1E1E1";
        } else {
          showDiv.style.backgroundColor = "";
        }
      });
    });
    
  } catch (error) {
    console.log(error);
  }
  
}

renderShows();

