// Sample product data
const products = [
    {
        id: 1,
        emoji: '⌚',
        title: 'SmartWatch Pro',
        category: 'Wearables',
        description: 'Advanced health monitoring with 7-day battery life',
        price: 299.99,
        originalPrice: 399.99
    },
    {
        id: 2,
        emoji: '🎧',
        title: 'AudioPulse Elite',
        category: 'Audio',
        description: 'Noise-cancelling headphones with premium sound quality',
        price: 199.99,
        originalPrice: 279.99
    },
    {
        id: 3,
        emoji: '📱',
        title: 'Mobile Hub Max',
        category: 'Smartphones',
        description: 'Flagship smartphone with AI-powered camera system',
        price: 899.99,
        originalPrice: 1099.99
    },
    {
        id: 4,
        emoji: '💻',
        title: 'UltraBook Pro',
        category: 'Laptops',
        description: 'Ultra-thin laptop with powerful performance',
        price: 1299.99,
        originalPrice: 1699.99
    },
    {
        id: 5,
        emoji: '🖥️',
        title: 'Monitor 4K Ultra',
        category: 'Displays',
        description: '32-inch 4K monitor for professional creators',
        price: 449.99,
        originalPrice: 599.99
    },
    {
        id: 6,
        emoji: '🎮',
        title: 'Gaming Console X',
        category: 'Gaming',
        description: 'Next-gen gaming console with ray-tracing',
        price: 499.99,
        originalPrice: 699.99
    },
    {
        id: 7,
        emoji: '⌨️',
        title: 'MechKey Pro',
        category: 'Peripherals',
        description: 'Mechanical gaming keyboard with RGB lighting',
        price: 149.99,
        originalPrice: 199.99
    },
    {
        id: 8,
        emoji: '🔊',
        title: 'SoundBar Ultra',
        category: 'Audio',
        description: 'Premium soundbar for immersive home theatre',
        price: 379.99,
        originalPrice: 499.99
    },
    {
        id: 9,
        emoji: '📷',
        title: 'Camera Pro 5K',
        category: 'Cameras',
        description: 'Professional 5K video camera for creators',
        price: 1899.99,
        originalPrice: 2499.99
    }
];

// Cart array to store added items
let cart = [];

// Render products to the grid
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">
                        <span class="original">$${product.originalPrice.toFixed(2)}</span>
                        $${product.price.toFixed(2)}
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add Cart</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        showNotification(`${product.title} added to cart!`);
        updateCartCount();
    }
}

// Update cart count in navbar
function updateCartCount() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cart.length > 0) {
        cartIcon.textContent = `🛒 Cart (${cart.length})`;
    } else {
        cartIcon.textContent = '🛒 Cart';
    }
}

// Show temporary notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00d4ff 0%, #6366f1 100%);
        color: #0a0e27;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Add animation keyframes dynamically
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Handle form submissions
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();

    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            showNotification(`Thanks for subscribing! Check ${email}`);
            newsletterForm.reset();
        });
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('input[type="text"]').value;
            showNotification(`Thanks ${name}! We'll get back to you soon.`);
            contactForm.reset();
        });
    }

    // Cart icon click
    document.querySelector('.cart-icon').addEventListener('click', (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            showNotification('Your cart is empty. Add some products!');
        } else {
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            showNotification(`Cart: ${cart.length} items • Total: $${total.toFixed(2)}`);
        }
    });

    // CTA button
    document.querySelector('.cta-btn').addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
});

// Add smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
