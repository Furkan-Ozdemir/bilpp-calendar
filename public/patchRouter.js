const updateButton = document.getElementById("updateButton");
const form = document.getElementById("form");
const inputId = document.getElementById("inputId");

const deleteButton = document.getElementById("deleteButton");
const deleteForm = document.getElementById("formDelete");
const deleteId = document.getElementById("deleteId");

updateButton.addEventListener("click", () => {
  form.setAttribute("action", `/tasks/${inputId.value}`);
});

deleteButton.addEventListener("click", () => {
  deleteForm.setAttribute("action", `/tasksDelete/${deleteId.value}`);
});
