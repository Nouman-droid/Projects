const button = document.getElementById("translateBtn");
const output = document.getElementById("output");

const noSelectionMessage = "Please select text on the webpage first.";

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

  output.textContent = result[0].result.trim();

  if (!selectedText) {
    output.textContent = noSelectionMessage;
    return;
  }

  output.textContent = selectedText;

  chrome.tabs.sendMessage(tab.id, {
    type: "UPDATE_SUBTITLE",
    text: selectedText
  });

});
