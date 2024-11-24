// Elements for toggling
const authModal = document.getElementById("auth-modal");
const signInTab = document.getElementById("sign-in-tab");
const registerTab = document.getElementById("register-tab");
const signInForm = document.getElementById("sign-in-form");
const registerForm = document.getElementById("register-form");
const authToggleBtn = document.getElementById("auth-toggle-btn");
const closeAuthBtn = document.getElementById("close-auth-btn");
const productSigninBtn = document.getElementById("sign-in-btn");
const clearReviews = document.getElementById("clear-reviews");
const clearCustomers = document.getElementById("clear-customers");
const clearMostRecentReview = document.getElementById("clear-most-recent-review");

// Check if the user is already signed in
const email = getCookie("email");
const password = getCookie("password");
const customerName = getCookie("customerName");

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

// Clear customers
clearCustomers.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('Clearing customers');

    try {
        const response = await fetch('../backend/clear_customers.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            // Refresh the customers section
            console.log('Customers cleared');
            location.reload();
        } else {
            alert('Failed to clear customers');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error clearing customers');
    }

});

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

// Show modal with Sign-In form initially
authToggleBtn.addEventListener("click", () => {
    authModal.classList.remove("hidden");
    showSignInForm();
});

// Close modal
closeAuthBtn.addEventListener("click", () => {
    authModal.classList.add("hidden");
});

// Show modal with Sign-In form initially
productSigninBtn.addEventListener("click", () => {
    authModal.classList.remove("hidden");
    showSignInForm();
});

const signIn = async (email, password) => {
    try {
        const response = await fetch('../backend/signin.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.success) {
            // Set cookies for email and password
            setCookie("email", email, 7); // Expires in 7 days
            setCookie("password", password, 7); // Expires in 7 days
            setCookie("customerName", result.name, 7); // Expires in 7 days

            localStorage.setItem('customerName', result.name);

            // Display success message and redirect
            showAlert("Welcome back, " + result.name + "! You’ve successfully signed in.");
            window.location.href = "../html/productView.html";
        } else {
            showAlert(result.message || "Sign-in failed. Please check your email and password.");
        }
    } catch (error) {
        showAlert("An error occurred. Please try again later.");
    }
};

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Show Sign-In form
signInTab.addEventListener("click", showSignInForm);
function showSignInForm() {
    signInForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    signInTab.classList.add("text-blue-500");
    registerTab.classList.remove("text-blue-500");
}

// Show Register form
registerTab.addEventListener("click", showRegisterForm);
function showRegisterForm() {
    registerForm.classList.remove("hidden");
    signInForm.classList.add("hidden");
    registerTab.classList.add("text-blue-500");
    signInTab.classList.remove("text-blue-500");
}

const submitForm = async (name, email, password) => {
    try {
        // Make the POST request
        const response = await fetch('../backend/submit_customer.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        // Parse the response as JSON
        const result = await response.json();

        // Check the content of the response and act accordingly
        if (result.success) {
            showAlert("You’re now registered as one of our valued customers. Please sign in to start your shopping journey with us!");
            // Handle success (e.g., redirect to login or another page)
        } else {
            showAlert("Something went wrong on the backend. Please contact IT admin.");
            // Handle failure (e.g., display error message)
        }
    } catch (error) {
        // Handle any errors during the request (e.g., network issues)
        showAlert("An unexpected error occurred. Please try again later.");
    }
};

function showAlert(message) {
    // Create alert container
    const alertContainer = document.createElement("div");
    alertContainer.className = "fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300 ease-in-out";
    alertContainer.style.zIndex = 1000;

    // Alert content
    alertContainer.innerHTML = `
        <strong class="text-lg font-semibold block mb-1">🎉 Congratulations! 🎉</strong>
        <p class="text-sm">${message}</p>
    `;

    // Append to body
    document.body.appendChild(alertContainer);

    // Fade out the alert after 4 seconds
    setTimeout(() => {
        alertContainer.classList.add("opacity-0");
    }, 4000);

    // Remove from DOM after fade out
    setTimeout(() => {
        alertContainer.remove();
    }, 4500);
}

// Handle Sign-In Form Submission
signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.querySelector("input[type='email']").value;
    const password = e.target.querySelector("input[type='password']").value;

    // Sign-in logic (API or validation logic goes here)
    await signIn(email, password);
    authModal.classList.add("hidden");
});

// Handle Registration Form Submission
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = e.target.querySelector("input[type='text']").value;
    const email = e.target.querySelector("input[type='email']").value;
    const password = e.target.querySelector("input[type='password']").value;

    // Registration logic (API or validation logic goes here)
    submitForm(name, email, password);
    authModal.classList.add("hidden");
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

if (email && password) {
    // Auto sign-in
    signIn(email, password);
}

// Load reviews when the page loads
window.addEventListener("DOMContentLoaded", loadReviews);
