// Popup start
let popupBg = document.querySelector('.modal__bg'); // Popup window background
let popup = document.querySelector('.modal'); // Window itself
let popupButtons = document.querySelectorAll('.lookbook__button'); // Buttons to show/hide the window

popupButtons.forEach((button) => { // Loop through all the buttons
    button.addEventListener('click', (e) => { // For each we attach an event handler to the click
        e.preventDefault();
        popupBg.classList.toggle('active'); // Adding the 'active' class for the background
        popup.classList.toggle('active'); // And for the window
    })
});

document.addEventListener('click', (e) => { // Attach handler to the entire document
    if (e.target === popupBg) { // If the target of the click is
        popupBg.classList.remove('active'); // Removing the active class from the background
        popup.classList.remove('active'); // And from the window
    }
});
// Popup end

// Ajax API for cart start
const addToCartButtons = document.querySelectorAll('.addToCartButton');

addToCartButtons.forEach(addToCartButton => {
    addToCartButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const addToCartForm = addToCartButton.closest('.product-add-to-cart-form');
        const productId = addToCartForm.querySelector('input[name="id"]').value;
        const quantity = addToCartForm.querySelector('input[name="quantity"]').value;

        // Get the loading spinner element
        const buttonText = addToCartButton.querySelector('.product-card__text');
        const loadingSpinner = addToCartForm.querySelector('.loading-overlay__spinner');

        // Add hidden class to the button and remove it from the loading spinner
        buttonText.classList.add('hidden');
        loadingSpinner.classList.remove('hidden');

        const cartData = {
            items: [
                {
                    id: productId,
                    quantity: quantity
                }
            ]
        };

        try {
            await fetch("/cart/add.js", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartData),
            });

            // Fetch the updated cart
            const response = await fetch("/cart.json");
            const cart = await response.json();

            document.querySelectorAll(".cart-count-bubble").forEach(element => {
                element.textContent = cart.item_count;
            });
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            // Remove hidden class from the button and add it back to the loading spinner
            buttonText.classList.remove('hidden');
            loadingSpinner.classList.add('hidden');
        }
    });
});
// Ajax API for cart end