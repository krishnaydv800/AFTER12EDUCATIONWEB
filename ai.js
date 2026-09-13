const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");
const clearBtn = document.getElementById("clearChat");

const BACKEND_URL = "http://localhost:5000/chat";


function addMessage(message, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message", sender);

    const messageText = document.createElement("div");

    messageText.classList.add("message-text");

    messageText.textContent = message;

    messageDiv.appendChild(messageText);

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}


async function sendMessage() {

    const message = input.value.trim();

    if (!message) return;


    // User message
    addMessage(message, "user");

    input.value = "";

    // Loading message
    addMessage("Thinking... ", "bot");


    try {

        const response = await fetch(BACKEND_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });


        const data = await response.json();


        // Remove Thinking message
        const messages = chatBox.querySelectorAll(".message");

        const lastMessage = messages[messages.length - 1];

        if (lastMessage && lastMessage.classList.contains("bot")) {
            lastMessage.remove();
        }


        if (!response.ok) {

            throw new Error(data.error || "Server error");

        }


        // AI response
        addMessage(data.reply, "bot");


    } catch (error) {

        console.error(error);

        const messages = chatBox.querySelectorAll(".message");

        const lastMessage = messages[messages.length - 1];

        if (lastMessage && lastMessage.classList.contains("bot")) {
            lastMessage.remove();
        }

        addMessage(
            "Sorry, AI se connection nahi ho pa raha. Backend check karo.",
            "bot"
        );
    }
}


// Send button
sendBtn.addEventListener("click", sendMessage);


// Enter key
input.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        sendMessage();
    }

});


// Clear chat
if (clearBtn) {

    clearBtn.addEventListener("click", () => {

        chatBox.innerText = "";

    });

}


