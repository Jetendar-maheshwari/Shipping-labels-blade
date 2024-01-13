document.addEventListener("DOMContentLoaded", function () {
  var dateElement = document.getElementById("date");
  if (dateElement) {
    dateElement.value = new Date().toISOString().substring(0, 10);
  } else {
    console.error("Element with id 'date' not found.");
  }
});
