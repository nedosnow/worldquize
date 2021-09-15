console.log("local");

const $container = document.querySelector(".questions-contain");
const $forma = document.forms.formData;

const $serchForma = document.querySelector("[data-form]");
const log = document.getElementById("log");

$serchForma?.addEventListener("keyup", async (e) => {
  const formData = await Object.fromEntries(new FormData($serchForma));
  console.log(formData);
  e.preventDefault();
  const response = await fetch(`/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const Obnowlyashka = await response.json();
  console.log(Obnowlyashka);
});

$container.addEventListener("click", async (e) => {
  e.preventDefault();
  if (e.target.dataset.delete === "delete") {
    const elToDelete = e.target.closest(".card").id;
    const $elToD = e.target.closest(".card");
    const result = await fetch(`/admin/${elToDelete}`, {
      method: "DELETE",
    });
    if (result.status === 200) $elToD.remove();
  }
});

$container.addEventListener("dblclick", async (e) => {
  if (e.target.dataset.question === "question") {
    const elToRetake = e.target.closest(".card").id;
    const $elToRet = e.target.closest(".card");
    const $text = $elToRet.querySelector("#card-text-question");
    const $inputText = $elToRet.querySelector("#card-text-class");

    $text.style.display = "none";
    $inputText.style.display = "block";

    $inputText.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = await Object.fromEntries(new FormData($inputText));

      const result = await fetch(`/admin/${elToRetake}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (result.status === 200) {
        const Obnowlyashka = await result.json();
        console.log(Obnowlyashka);
        $text.style.display = "block";
        $inputText.style.display = "none";
        $text.innerHTML = Obnowlyashka.question;
      }
    });
  } else if (e.target.dataset.close === "close") {
    const elToRetake = e.target.closest(".card").id;
    const $elToRet = e.target.closest(".card");
    const $text = $elToRet.querySelector("#card-text-question");
    const $inputText = $elToRet.querySelector("#card-text-class");

    $text.style.display = "block";
    $inputText.style.display = "none";
  }
});

$container.addEventListener("click", async (e) => {
  if (e.target.dataset.change === "change") {
    const elToRetake = e.target.closest(".card").id;
    const $elToRet = e.target.closest(".card");
    const $text = $elToRet.querySelector("#card-text-question");
    const $inputText = $elToRet.querySelector("#card-text-class");

    $text.style.display = "none";
    $inputText.style.display = "block";
  } else if (e.target.dataset.save === "save") {
    e.preventDefault();
    const elToRetake = e.target.closest(".card").id;
    const $elToRet = e.target.closest(".card");
    const $text = $elToRet.querySelector("#card-text-question");
    const $inputText = $elToRet.querySelector("#card-text-class");
    const formData = await Object.fromEntries(new FormData($inputText));
    const result = await fetch(`/admin/${elToRetake}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (result.status === 200) {
      const Obnowlyashka = await result.json();
      console.log(Obnowlyashka);
      $text.style.display = "block";
      $inputText.style.display = "none";
      $text.innerHTML = Obnowlyashka.question;
    }
  } else if (e.target.dataset.close === "close") {
    const elToRetake = e.target.closest(".card").id;
    const $elToRet = e.target.closest(".card");
    const $text = $elToRet.querySelector("#card-text-question");
    const $inputText = $elToRet.querySelector("#card-text-class");

    $text.style.display = "block";
    $inputText.style.display = "none";
  }
});
