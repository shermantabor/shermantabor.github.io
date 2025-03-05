document.getElementById("phoneForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let phoneNumber = document.getElementById("phone").value;
    let responseMessage = document.getElementById("responseMessage");

    // Replace with your actual Google Sheets Web App URL
    let googleScriptURL = "https://script.google.com/macros/s/AKfycbx48i9oLcKUdRsPtstl106_FiHDdDA7BQhRDR3gH6zZfmhxk5nNmzRtfBiJOSGXsuCFJA/exec";

    let response = await fetch(googleScriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber })
    });

    if (response.ok) {
        responseMessage.innerText = "Phone number saved successfully!";
        responseMessage.style.color = "green";
    } else {
        responseMessage.innerText = "Error saving phone number.";
        responseMessage.style.color = "red";
    }
});