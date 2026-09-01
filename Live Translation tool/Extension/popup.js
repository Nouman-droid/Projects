const button = document.getElementById("translateBtn");
const output = document.getElementById("output");

button.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  const result = await chrome.scripting.executeScript({
    target: { tabId: tab.id },

    func: () => {
      return window.getSelection().toString();
    }
  });

  output.textContent = result[0].result || "No text selected.";

  chrome.tabs.sendMessage(tab.id, {
    type: "UPDATE_SUBTITLE",
    text: result[0].result || "No text selected."
  });

});
