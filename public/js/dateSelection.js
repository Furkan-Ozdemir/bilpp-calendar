let today = new Date().getDate();
let year = new Date().getFullYear();
let day = (new Date().getDate() < 10 ? "0" : "") + new Date().getDate();
let month =
  (new Date().getMonth() < 10 ? "0" : "1") + (new Date().getMonth() + 1);
let dateValue = year + "-" + month + "-" + day;

let dateInput = document.getElementById("dateInput");
dateInput.setAttribute("value", `${dateValue}`);

/*----------------------------------------- */

let spans = document.getElementsByTagName("span");
let selectedDateP = document.getElementById("selectedDate");
let inputHidden = document.getElementById("inputHidden");
let showTaskUrl = document.getElementById("showTaskUrl");
let searchByPhraseUrl = document.getElementById("searchByPhraseUrl");
let searchByPhraseInput = document.getElementById("searchByPhraseInput");
let searchByDateInput = document.getElementById("searchByDateInput");
let searchByDateUrl = document.getElementById("searchByDateUrl");

for (let i = 0; i < spans.length; i++) {
  if (spans[i].innerHTML == today) {
    // bu gün ise highlight et
    spans[i].setAttribute("class", "today");
  }
}
/* ----------------------------------------- */
for (let i = 0; i < spans.length; i++) {
  spans[i].addEventListener("click", () => {
    let aside = document.getElementsByClassName("aside")[0];
    aside.classList.toggle("show");
  });
  spans[i].addEventListener("click", () => {
    let spanValue = spans[i].innerHTML;
    dateInput.setAttribute(
      "value",
      `2021-08-${spanValue < 10 ? "0" : ""}${spanValue}`
    );
  });
  spans[i].addEventListener("click", () => {
    selectedDateP.innerHTML = year + "/" + month + "/" + spans[i].innerHTML;
    inputHidden.setAttribute(
      "value",
      `${
        year +
        "-" +
        month +
        "-" +
        (spans[i].innerHTML < 10 ? "0" : "") +
        spans[i].innerHTML
      }`
    );
  });
  spans[i].addEventListener("click", () => {
    showTaskUrl.setAttribute("href", `/tasks/date?date=${inputHidden.value}`);
  });
}
searchByPhraseUrl.addEventListener("click", () => {
  searchByPhraseUrl.setAttribute(
    "href",
    `/tasks/phraseFound?searchPhrase=${searchByPhraseInput.value}`
  );
});
searchByDateUrl.addEventListener("click", () => {
  searchByDateUrl.setAttribute(
    "href",
    `/tasks/searchByDateView?searchDate=${searchByDateInput.value}`
  );
});
/* ----------------------------------------- */
