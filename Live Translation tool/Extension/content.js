const container = document.createElement("div");

container.id = "translator-overlay";
container.className = "overlay";
// container.innerHTML = "<p>Hello World</p>";

const subtitleText = document.createElement("p");
subtitleText.textContent = "Hello World";

container.appendChild(subtitleText);

document.body.appendChild(container);

function updateSubtitle(newText){
    subtitleText.textContent = newText;
}

// updateSubtitle("This is a test subtitle");

chrome.runtime.onMessage.addListner((message) => {
    if (message.type === "UPDATE_SUBTITLE"){
        updateSubtitle(message.text);
    }
});