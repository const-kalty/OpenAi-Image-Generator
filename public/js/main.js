const submitHandler = (e) => {
  e.preventDefault();
  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";
  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;
  if (prompt === "") {
    alert("Input some text please");
    return;
  }
  generateImageRequest(prompt, size);
};
const generateImageRequest = async (prompt, size) => {
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
      removeSpinner();
      throw new Error("That image could not be generated");
    }
    const result = await response.json();
    const imageUrl = result.data;
    document.querySelector("#image").src = imageUrl;
    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
};

const showSpinner = () => {
  document.querySelector(".spinner").classList.add("show");
};
const removeSpinner = () => {
  document.querySelector(".spinner").classList.remove("show");
};

document.querySelector("#image-form").addEventListener("submit", submitHandler);
