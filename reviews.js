const baseURL = "https://evaluation-c3-default-rtdb.firebaseio.com/";

// console.log(productId);

// fetching data
fetchReviews();

async function fetchReviews() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const requestOpt = {
    method: "GET",
    redirect: "follow",
  };
  const response = await fetch(`${baseURL}reviews.json`, requestOpt);
  let data = await response.json();
  data = data.filter((prod) => prod.productId === productId);

  displayReview(data);
}

function displayReview(data) {
  const reviewContainer = document.querySelector("#reviews-cont");
  reviewContainer.innerHTML = "";

  // atta=ching data to the cards

  data.forEach((review) => {
    console.log(review);

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
