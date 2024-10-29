const baseURL = "https://evaluation-c3-default-rtdb.firebaseio.com/";
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));
// console.log(productId);

// fetching data
// fetchReviews();

async function fetchReviews() {
  const requestOpt = {
    method: "GET",
    redirect: "follow",
  };
  const response = await fetch(`${baseURL}reviews.json`, requestOpt);
  let data = await response.json();
  data = Object.entries(data);
  const res = data.filter(([id, review]) => review.productId === productId);
  // console.log(res);

  displayReview(res);
}

function displayReview(data) {
  const reviewContainer = document.querySelector("#reviews-cont");
  reviewContainer.innerHTML = "";

  // atta=ching data to the cards

  data.forEach(([id, review]) => {
    // console.log(review);

    reviewContainer.innerHTML += `
      <div class="card">
            <p class="userji">User: ${review.userId}</p>
            <p class="desc">${review.content}</p>
            <p>rating: ${review.rating}/5
            </p>
        </div>
    `;
  });
}

// ------------------------------------------------------------------
// for creating a new review on submission of the form
const submitReview = document.getElementById("create-review");

// yaar bohot pareshan krra yeh
const starRate = document.querySelectorAll(' .star-rating input[type="radio"]');
starRate.forEach((input) => {
  input.addEventListener("change", () => {
    localStorage.setItem("star", input.value);
  });
});

submitReview.addEventListener("submit", (e) => {
  e.preventDefault();
  const reviewContent = document.getElementById("message");
  const review = {
    userId: JSON.parse(localStorage.getItem("login-session")).username,
    productId: productId,
    content: reviewContent.value,
    rating: localStorage.getItem("star"),
  };
  createReview(review);
  localStorage.removeItem("star");
  fetchReviews();
});

async function createReview(review) {
  try {
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    const requestOption = {
      method: "POST",
      header: myHeader,
      body: JSON.stringify(review),
      redirect: "follow",
    };

    const response = await fetch(`${baseURL}reviews.json`, requestOption);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
// console.log(arr);

// createReview();
