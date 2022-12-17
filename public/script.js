function onSubmit(e) {
  e.preventDefault();
  imageContainer.innerHTML = "";
  const prompt = document.getElementById("prompt").value;
  const size = document.getElementById("size").value;
  if (prompt === "") {
    alert("Description can not be empty.");
    return;
  }
  document.querySelector(".error").classList.remove("show");
  generateImageRequest(prompt, size);
}

document.querySelector("#img-form").addEventListener("submit", onSubmit);
const imageContainer = document.querySelector(".image-container");

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();
    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });
    if (!response.ok) {
      hideSpinner();
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    showImages(data.data);
    hideSpinner();
  } catch (error) {
    document.querySelector(".error").classList.add("show");
  }
}

async function showImages(data) {
  for (let i = 0; i < data.length; i++) {
    var img = document.createElement("img");
    img.src = data[i].url;
    imageContainer.appendChild(img);
  }
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("loading");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("loading");
}
