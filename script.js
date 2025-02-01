// JavaScript for Desserts Page Interactions

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTitle = document.querySelector('.cart-title');
    const confirmOrderBtn = document.querySelector('.confirm-order-btn');
    const cartTotal = document.querySelector('.cart-section p b');
    const searchInput = document.getElementById('search-input');
    const desserts = document.querySelectorAll('.dessert-item');

    let cart = []; // Array to store cart items
    let total = 0; // Total price of items in the cart

    // Function to update cart display
    function updateCartDisplay() {
        // Clear current cart display
        cartItemsContainer.innerHTML = '';

        // Add items to the cart list
        cart.forEach(item => {
            const cartItemElement = document.createElement('li');
            cartItemElement.classList.add('cart-item');

            cartItemElement.innerHTML = `
                <p>${item.name}</p>
                <p>$${(item.price * item.quantity).toFixed(2)} <span style="font-size: 0.9rem">(${item.quantity}x)</span></p>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        // Update total price
        total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        cartTotal.innerText = `$${total.toFixed(2)}`;

        // Update total items in cart title
        cartTitle.innerText = `Your Cart (${cart.length})`;
    }

    // Function to add item to the cart
    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.name === item.name);

        if (existingItem) {
            existingItem.quantity += 1; // Increment quantity if item exists
        } else {
            cart.push({ ...item, quantity: 1 }); // Add new item to cart
        }

        updateCartDisplay();
    }

    // Add click event listeners to "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const dessertInfo = event.target.closest('.dessert-item');
            const name = dessertInfo.querySelector('h3').innerText;
            const price = parseFloat(dessertInfo.querySelector('p').innerText.replace('$', ''));

            addToCart({ name, price });
        });
    });

    // Confirm order button
    confirmOrderBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty! Please add some desserts.');
        } else {
            alert('Thank you for your order!');
            cart = []; // Clear the cart
            updateCartDisplay();
        }
    });

    // Real-time search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        desserts.forEach(dessert => {
            const title = dessert.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                dessert.style.display = 'block';
            } else {
                dessert.style.display = 'none';
            }
        });
    });
});
