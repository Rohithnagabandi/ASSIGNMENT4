// Initialize EmailJS
emailjs.init('2NRluruulzHwV94Ug'); // Replace with your EmailJS public key

// Cart data
let cart = [];
let total = 0;

// Scroll to booking section
document.getElementById('book-btn').addEventListener('click', () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
});

// Handle add/remove item to/from cart using event delegation
document.querySelector('.booking-left').addEventListener('click', (e) => {
    if (e.target.classList.contains('add-btn')) {
        const name = e.target.dataset.name;
        const price = parseFloat(e.target.dataset.price);
        cart.push({ name, price });
        updateCart();
        e.target.textContent = "remove item";
        e.target.classList.remove('add-btn');
        e.target.classList.add('remove-btn');
    } else if (e.target.classList.contains('remove-btn')) {
        const name = e.target.dataset.name;
        const price = parseFloat(e.target.dataset.price);
        const index = cart.findIndex(item => item.name === name);
        if (index > -1) {
            cart.splice(index, 1);
            updateCart();
        }
        e.target.textContent = "Add Item";
        e.target.classList.remove('remove-btn');
        e.target.classList.add('add-btn');
    }
});

// Update cart display
function updateCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
        total += item.price;
    });
    document.getElementById('total').textContent = total;
}

// Book Now with EmailJS
document.getElementById('book-now-btn').addEventListener('click', () => {
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const orderDetails = cart.map(item => `${item.name} - $${item.price}`).join(', ');

    if (!name || !email || !phone || cart.length === 0) {
        alert('Please fill all fields and add items to cart.');
        return;
    }

    // Send email
    emailjs.send('service_kv5wime', 'template_19i45mx', {
        to_name: name,
        to_email: email,
        from_name: 'Laundry Service',
        message: `Order Details: ${orderDetails}. Total: $${total}. Phone: ${phone}`
    }).then(() => {
        document.getElementById('thank-you-msg').style.display = 'block';
        // Reset form and cart
        cart = [];
        total = 0;
        updateCart();
        document.getElementById('full-name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
    }).catch(err => {
        alert('Error sending email: ' + err);
    });
});

// Newsletter subscribe
document.getElementById('subscribe-btn').addEventListener('click', () => {
    const name = document.getElementById('newsletter-name').value;
    const email = document.getElementById('newsletter-email').value;
    if (name && email) {
        alert('Subscribed successfully!');
        document.getElementById('newsletter-name').value = '';
        document.getElementById('newsletter-email').value = '';
    } else {
        alert('Please fill all fields.');
    }
});