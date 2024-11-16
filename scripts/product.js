const clearReviews = document.getElementById("clear-reviews");
<<<<<<< Updated upstream
=======
const checkoutForm = document.getElementById('checkout-form-content');
const submitOrderBtn = checkoutForm.querySelector('button[type="submit"]');
const closeCheckoutBtn = document.getElementById('close-checkout-btn');
const checkoutModal = document.getElementById('checkout-form');
const successModal = document.getElementById('success-modal');
const closeSuccessBtn = document.getElementById('close-success-btn');
const clearMostRecentReview = document.getElementById('clear-most-recent-review');

console.log(document.cookie);

// Clear most recent review
clearMostRecentReview.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('Clearing most recent review');

    try {
        const response = await fetch('../backend/clear_most_recent_review.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            // Refresh the reviews section
            console.log('Most recent review cleared');
            location.reload();
        } else {
            alert('Failed to clear most recent review');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error clearing most recent review');
    }

});
>>>>>>> Stashed changes

// Clear reviews
clearReviews.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('Clearing reviews');

    try {
        const response = await fetch('../backend/clear_reviews.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            // Refresh the reviews section
            console.log('Reviews cleared');
            location.reload();
        } else {
            alert('Failed to clear reviews');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error clearing reviews');
    }

});

<<<<<<< Updated upstream
=======
//Logout from session
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('userName');
    deleteCartCookie();
    deleteCustomerCookie();
    window.location.href = '../html/index.html'; // Refresh to reset any user-specific content
});

>>>>>>> Stashed changes
// Sample products
const products = [
    { id: 1, name: "Macbook Pro", price: 1900.00, image: "../images/products/macbook.jpeg" },
    { id: 2, name: "Dell Laptop", price: 1399.00, image: "../images/products/dell_laptop.jpg" },
    { id: 3, name: "Smart Watch 3000", price: 250.99, image: "../images/products/smart_watch.jpeg" },
    { id: 4, name: "Ipad Pro", price: 1300.00, image: "../images/products/ipad_pro.jpeg" },
    { id: 5, name: "Samsung Galaxy S1000", price: 1500.99, image: "../images/products/samsung_phone.jpeg" },
    { id: 6, name: "Samsung Galaxy Tab S Ultra", price: 999.99, image: "../images/products/samsung_tablet.jpeg" },
    { id: 7, name: "Apple Watch 3000 Ultra Max", price: 399.99, image: "../images/products/apple_watch.jpeg" },
    { id: 8, name: "HP Envy Probook", price: 1200.00, image: "../images/products/smart_watch.jpeg" },
    { id: 9, name: "Huawei X20", price: 899.99, image: "../images/products/huawei.jpeg" },
    { id: 10, name: "IPhone Ultra Pro MAX", price: 1299.99, image: "../images/products/iphone.jpeg" },
];

// Cart array
let cart = [];

// Load products to page
const productList = document.getElementById("product-list");
products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.className = "bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1";
    productElement.innerHTML = `
    <div class="relative overflow-hidden rounded-lg h-40">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105">
    </div>
    <h3 class="text-xl font-semibold mt-4 text-gray-800">${product.name}</h3>
    <p class="text-gray-600 text-lg mb-4">$${product.price.toFixed(2)}</p>
    <button onclick="addToCart(${product.id})" 
            class="bg-blue-600 text-white px-5 py-2 rounded-full mt-4 font-medium hover:bg-blue-700 transition-colors duration-300 w-full">
        Add to Cart
    </button>
`;
    productList.appendChild(productElement);
});

<<<<<<< Updated upstream
=======

// Event listener for the Submit Order button
submitOrderBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission to handle with JS

    // Get form data
    const formData = new FormData(checkoutForm);
    const nameOnCard = formData.get('name-on-card');
    const paymentType = formData.get('payment-type');
    const creditCardNumber = formData.get('credit-card-number');
    const cvv = formData.get('cvv');
    const expiry = formData.get('expiry');

    // Get transaction details (order summary)
    const totalPrice = document.getElementById('total-price').textContent;

    // Populate success modal with order details
    const successCartItems = document.getElementById('success-cart-items-summary');
    successCartItems.innerHTML = ''; // Clear previous items

    Array.from(cart).forEach(item => {
        // Create list item for product
        const listItem = document.createElement('li');
        listItem.className = "flex justify-between text-gray-800";

        listItem.innerHTML = `<span>${item.name}</span><span>$${item.price.toFixed(2)}</span>`;

        // Append the list item to the success modal cart summary
        successCartItems.appendChild(listItem);
    });

    // Set total price in success modal
    document.getElementById('success-total-price').textContent = totalPrice;

    // Show the success modal
    checkoutModal.classList.add('hidden'); // Hide checkout modal
    successModal.classList.remove('hidden'); // Show success modal
});


// Event listener for the Close button in the success modal
closeSuccessBtn.addEventListener('click', () => {
    successModal.classList.add('hidden'); // Hide success modal
    cart = [];
    deleteCartCookie();
    updateCartCount();
});

// Event listener for the Close button in the checkout modal
closeCheckoutBtn.addEventListener('click', () => {
    checkoutModal.classList.add('hidden'); // Hide checkout modal
});

// Save cart to a cookie
function setCartCookie(cart) {
    const cartJSON = JSON.stringify(cart); // Convert cart object to a JSON string
    document.cookie = `cart=${encodeURIComponent(cartJSON)}; path=/; max-age=31536000`; // Set cookie for 1 year
}

// On page load, retrieve the cart from the cookie
window.onload = () => {
    cart = getCartFromCookie(); // Retrieve cart from cookie
    updateCartCount();
};

// Retrieve cart from cookie
function getCartFromCookie() {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === 'cart') {
            return JSON.parse(decodeURIComponent(cookie[1])); // Parse JSON string back into object
        }
    }
    return []; // Return empty array if no cart is found
}

// Delete cart cookie
function deleteCartCookie() {
    // Delete cart cookie
    document.cookie = 'cart=; path=/; max-age=0'; // Delete the cookie by setting its max-age to 0
}

function deleteCustomerCookie() {
    // Delete email cookie
    document.cookie = 'email=; path=/; max-age=0';
    // Delete name cookie
    document.cookie = 'customerName=; path=/; max-age=0';
    // Delete password cookie
    document.cookie = 'password=; path=/; max-age=0';
}


>>>>>>> Stashed changes
// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}

// Show cart modal
document.getElementById("cart-btn").addEventListener("click", () => {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
<<<<<<< Updated upstream
    cart.forEach((item, index) => {
        const cartItem = document.createElement("li");
        cartItem.className = "flex justify-between items-center py-2";
        cartItem.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
=======
    if (cart.length == 0) {
        cartItems.innerHTML = `
        <div class="text-center text-gray-600 py-6">
            <h3 class="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p class="text-gray-500">It looks like you haven't added anything to your cart yet. Please browse our products and add them to the cart to proceed with your purchase.</p>
        </div>
    `;

        document.getElementById("checkout-btn").classList.add("hidden");
    }
    else {
        document.getElementById("checkout-btn").classList.remove("hidden");
        cart.forEach((item, index) => {
            const cartItem = document.createElement("li");
            cartItem.className = "flex justify-between items-center py-2";
            cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
>>>>>>> Stashed changes
            <button onclick="removeFromCart(${index})" class="text-red-500">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
    document.getElementById("cart-modal").classList.remove("hidden");
});

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    document.getElementById("cart-btn").click();
}

// Close cart modal
document.getElementById("close-cart-btn").addEventListener("click", () => {
    document.getElementById("cart-modal").classList.add("hidden");
});

// Checkout form
document.getElementById("checkout-btn").addEventListener("click", () => {
    document.getElementById("cart-modal").classList.add("hidden");
    document.getElementById("checkout-form").classList.remove("hidden");
});

document.getElementById("close-checkout-btn").addEventListener("click", () => {
    document.getElementById("checkout-form").classList.add("hidden");
});

// Submit checkout form
document.getElementById("checkout-form-content").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Order submitted!");
    cart = [];
    updateCartCount();
    document.getElementById("checkout-form").classList.add("hidden");
});

// Fetch and display reviews
async function loadReviews() {
    try {
        const response = await fetch("../backend/fetch_reviews.php");
        const reviews = await response.json();

        // Check for errors in the PHP response
        if (reviews.error) {
            console.error(reviews.error);
            return;
        }

        const reviewsContainer = document.getElementById("reviews-container");
        reviewsContainer.innerHTML = ""; // Clear any existing reviews

        // Create HTML for each review and add it to the container
        // Check if there are reviews in the database
        if (reviews.length === 0) {
            // No reviews found, show a message encouraging the first review
            // Ensure reviewsContainer is centered and spans full width
            reviewsContainer.className = "flex justify-center items-center w-full";

            // Create the wrapper for the message
            const noReviewsWrapper = document.createElement("div");
            noReviewsWrapper.className = "flex justify-center w-full"; // Center the message container

            // Create the actual message
            const noReviewsMessage = document.createElement("p");
            noReviewsMessage.className = "text-lg text-center text-gray-600 italic p-6 bg-gray-100 rounded-lg max-w-md"; // max-w-md ensures it doesn’t take up too much width
            noReviewsMessage.innerText =
                "No customer reviews yet. Be the first to share your thoughts and help others make the perfect choice!";

            // Append message to wrapper, then wrapper to container
            noReviewsWrapper.appendChild(noReviewsMessage);
            reviewsContainer.appendChild(noReviewsWrapper);
        }
        else {
            reviewsContainer.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8";
            reviews.forEach(rev => {
                const reviewCard = document.createElement("div");
                reviewCard.className = "p-6 bg-gray-100 rounded-lg shadow-md";

                reviewCard.innerHTML = `
                <h3 class="text-xl font-semibold text-gray-800">${rev.customer_name}</h3>
                <p class="text-sm text-gray-500">Submitted on: <span class="font-medium">${new Date(rev.created_at).toLocaleDateString()}</span></p>
                <div class="flex items-center mt-2 mb-2"><span class="text-yellow-400 text-xl">${'⭐️'.repeat(rev.rating)}</span></div>
                <p class="text-gray-700 italic overflow-y-auto max-h-24">“${rev.review}”</p>
            `;

                reviewsContainer.appendChild(reviewCard);
            });
        }
    } catch (error) {
        console.error("Error loading reviews:", error);
    }
}

// Handle review form submission
document.getElementById("review-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const customer_name = document.getElementById("customer_name").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    // Form data to send to PHP
    const formData = new FormData();
    formData.append("customer_name", customer_name);
    formData.append("rating", rating);
    formData.append("comment", comment);

    try {
        const response = await fetch("../backend/submit_review.php", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            // Reload reviews to show the new one
            loadReviews();
            // Reset the form
            document.getElementById("review-form").reset();
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error("Error submitting review:", error);
    }
});

// Load reviews when the page loads
window.addEventListener("DOMContentLoaded", loadReviews);
