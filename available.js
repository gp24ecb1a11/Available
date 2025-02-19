// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAeOS8_0tDWKnfAwLf0GRKr6JaopYj1nnY",
    authDomain: "dormdash-40a10.firebaseapp.com",
    databaseURL: "https://dormdash-40a10-default-rtdb.firebaseio.com/",
    projectId: "dormdash-40a10",
    storageBucket: "dormdash-40a10.appspot.com",
    messagingSenderId: "219135353050",
    appId: "1:219135353050:web:49446a2e74414ebf8105e3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Fetch and display requests
document.addEventListener("DOMContentLoaded", function() {
    const requestsContainer = document.getElementById("requests-container");

    database.ref("requests").on("value", function(snapshot) {
        requestsContainer.innerHTML = "";
        if (!snapshot.exists()) {
            requestsContainer.innerHTML = "<p class='text-gray-600'>No available requests.</p>";
            return;
        }

        snapshot.forEach(function(childSnapshot) {
            const request = childSnapshot.val();
            const requestId = childSnapshot.key;

            if (request.status === "pending") {
                const requestElement = document.createElement("div");
                requestElement.className = "bg-gray-200 p-4 rounded shadow";
                requestElement.innerHTML = `
                    <p><strong>Name:</strong> ${request.fullName}</p>
                    <p><strong>Order Number:</strong> ${request.orderNumber}</p>
                    <p><strong>Service:</strong> ${request.serviceName}</p>
                    <p><strong>Courier:</strong> ${request.courierService}</p>
                    <p><strong>Size:</strong> ${request.packageSize}</p>
                    <p><strong>Arrival:</strong> ${request.arrivalTime}</p>
                    <p><strong>OTP:</strong> ${request.otp}</p>
                    <button class="bg-green-500 text-white px-4 py-2 rounded mt-2 accept-btn" data-id="${requestId}">Accept Order</button>
                `;
                requestsContainer.appendChild(requestElement);
            }
        });
    });

    // Accept order functionality
    requestsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("accept-btn")) {
            const requestId = event.target.getAttribute("data-id");
            database.ref("requests/" + requestId).update({ status: "accepted" }).then(() => {
                alert("Order accepted!");
            }).catch(error => {
                console.error("Error accepting request:", error);
            });
        }
    });
});
