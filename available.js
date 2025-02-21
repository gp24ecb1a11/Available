import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyAeOS8_0tDWKnfAwLf0GRKr6JaopYj1nnY",
    authDomain: "dormdash-40a10.firebaseapp.com",
    projectId: "dormdash-40a10",
    storageBucket: "dormdash-40a10.firebasestorage.app",
    messagingSenderId: "219135353050",
    appId: "1:219135353050:web:49446a2e74414ebf8105e3"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const requestsContainer = document.getElementById("requestsContainer");

async function loadRequests() {
    const querySnapshot = await getDocs(collection(db, "requests"));
    requestsContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (!data.taken) {
            const requestElement = document.createElement("div");
            requestElement.classList = "bg-white shadow-md rounded-lg p-5 border";
            requestElement.innerHTML = `
                <h2 class="text-lg font-semibold text-gray-900">${data.title}</h2>
                <p class="text-gray-600">${data.description}</p>
                <p class="text-gray-600 font-semibold">Reward: ₹${data.reward}</p>
                <button class="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 take-order" data-id="${doc.id}">
                    Take Order
                </button>
            `;
            requestsContainer.appendChild(requestElement);
        }
    });

    document.querySelectorAll('.take-order').forEach(button => {
        button.addEventListener('click', async function () {
            const orderId = this.getAttribute("data-id");
            const confirmOrder = confirm("Are you sure you want to accept this order?");
            if (!confirmOrder) return; // Exit if user cancels
            await updateDoc(doc(db, "requests", orderId), { taken: true });

            alert("Order Taken!");
            loadRequests();
        });
    });
    document.querySelectorAll('.take-order').forEach(button => {
    button.addEventListener('click', function () {
        const orderId = this.getAttribute("data-id");
        const title = this.getAttribute("data-title");
        const description = this.getAttribute("data-description");
        const reward = this.getAttribute("data-reward");

        // Confirmation popup
        const confirmOrder = confirm("Are you sure you want to accept this order?");
        if (!confirmOrder) return;

        // Redirect to Accepting Order page with order details in URL
        window.location.href = `https://dormdash1accept.netlify.app/?id=${orderId}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&reward=${encodeURIComponent(reward)}`;
    });
});

}

loadRequests();
