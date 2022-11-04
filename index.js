let recordBtn2 = document.querySelector("#recordBtn2");

recordBtn2.addEventListener("click", () => {
  chrome.tabs.update({
    url: "http://127.0.0.1:5500/main.html",
  });
});
