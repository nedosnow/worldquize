console.log("here");

const $form = document.forms.formData;
const $question = document.querySelector(".question");
const $img = document.querySelector(".img");

let index = 1;

$form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(e.target));
  console.log(formData);
  const response = await fetch("/abs/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formData: formData, index: index }),
  });
  index += 1;
  const dataFromServer = await response.json();
  console.log(dataFromServer)

  const newPostHTML = createHTMLforNewQuestion(dataFromServer);

  if (dataFromServer.image) {
    $img.src = dataFromServer.image;
    $img.style.display = "block";
    setTimeout(() => {
      $img.style.display = "none";
      $question.innerHTML = newPostHTML;
    }, 4000);
  } else {
    $img.style.display = "none";
  }
  e.target.reset();
});

function createHTMLforNewQuestion(newQuest) {
  return `
  <div class ="question" name='question' class="card-text">${newQuest.question.question}</>
  `;
}
