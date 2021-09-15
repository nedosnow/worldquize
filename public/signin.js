console.log("signin");

$form = document.querySelector("[data-form]");

$form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  console.log(formData);
  const response = await fetch("/signin/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  console.log(response);
  if (response.redirected) {
    window.location = response.url;
  }
  e.target.reset();
});
