document.addEventListener('DOMContentLoaded', () => {
    
    const checkoutForm = document.getElementById('checkout-form');

    checkoutForm.addEventListener('submit', function(event) {
        
        event.preventDefault();

        let hasMistakes = false;

        const allRequiredInputs = document.querySelectorAll('.check-me');

        for (let i = 0; i < allRequiredInputs.length; i++) {
            
            let currentInput = allRequiredInputs[i];

            if (currentInput.value.trim() === "") {
                
                currentInput.style.borderColor = "red";
                hasMistakes = true; 

            } else {
                
                currentInput.style.borderColor = "green";
                
            }
        }

        const emailInput = document.querySelector('input[type="email"]');
        
        if (emailInput.value.includes("@") === false) {
            emailInput.style.borderColor = "red";
            hasMistakes = true; 
        }

        if (hasMistakes === true) {
            alert("Oops! Please fill out all the fields outlined in red.");
        } else {
            alert("Success! All fields are filled out correctly.");
        }
        
    });

});