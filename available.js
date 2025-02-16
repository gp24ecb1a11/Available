// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDobwvOdyiwBCjNNBUyRNStwrMQmhFv3vY",
  authDomain: "dormdash-1becd.firebaseapp.com",
  databaseURL: "https://dormdash-1becd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dormdash-1becd",
  storageBucket: "dormdash-1becd.firebasestorage.app",
  messagingSenderId: "789434000901",
  appId: "1:789434000901:web:a8f28358c7e0091b2ede6c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Function to fetch and display requests
function fetchRequests() {
  const requestsContainer = document.getElementById("requests-container");
  requestsContainer.innerHTML = ""; // Clear previous data

  db.ref("orders").once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const order = childSnapshot.val();
      const orderElement = document.createElement("div");

      orderElement.innerHTML = `
        <div class="order">
          <h3>${order.serviceName} - Order #${order.orderNumber}</h3>
          <p><strong>Name:</strong> ${order.name}</p>
          <p><strong>Courier Service:</strong> ${order.courierService}</p>
          <p><strong>Package Size:</strong> ${order.packageSize}</p>
          <p><strong>Arrival Time:</strong> ${order.arrivalTime}</p>
          <button onclick="takeOrder('${childSnapshot.key}', this)">Take Order</button>
        </div>
        <hr>
      `;
      requestsContainer.appendChild(orderElement);
    });
  });
}

// Function to take an order
function takeOrder(orderId, button) {
  db.ref("orders/" + orderId).remove().then(() => {
    button.innerText = "Order Taken ✅";
    button.disabled = true;
    button.style.backgroundColor = "gray";
    fetchRequests(); // Refresh list
  });
}

// Fetch requests on page load
window.onload = fetchRequests;
