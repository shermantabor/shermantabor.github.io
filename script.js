document.getElementById("phoneForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let phoneNumber = document.getElementById("phone").value;
    let responseMessage = document.getElementById("responseMessage");

    let proxyURL = "http://localhost:3000/proxy"; // 🔹 Now sends data to your proxy

    try {
        let response = await fetch(proxyURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: phoneNumber })
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        let result = await response.json();
        responseMessage.innerText = result.status === "Success" ? "Thanks! We'll send you a reminder." : "Error saving phone number.";
        responseMessage.style.color = result.status === "Success" ? "beige" : "red";

    } catch (error) {
        console.error("Fetch error:", error);
        responseMessage.innerText = "Failed to save phone number.";
        responseMessage.style.color = "red";
    }
});
