// 1. Lấy dữ liệu giỏ hàng từ localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('seafoodCart')) || [];
}

// 2. Cập nhật con số hiển thị trên icon giỏ hàng (chấm đỏ)
function updateCartBadge() {
    const cart = getCart();
    const badge = document.getElementById('cart-count');
    if (!badge) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = totalItems;
    
    // Hiện chấm đỏ khi có hàng, ẩn khi giỏ trống
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
}

function addToCart(event) {
    const button = event.target;
    const productCard = button.closest('.product-card'); 
    
    // 1. Lấy phần tử chứa giá
    const priceElement = productCard.querySelector('.price');
    let priceText = priceElement.innerText;

    // 2. NẾU CÓ GIÁ CŨ: Loại bỏ giá cũ ra khỏi chuỗi để không bị dính số
    const oldPriceSpan = priceElement.querySelector('.old-price');
    if (oldPriceSpan) {
        priceText = priceText.replace(oldPriceSpan.innerText, '');
    }

    // 3. Chỉ lấy con số cuối cùng (giá đang bán)
    const priceValue = parseInt(priceText.replace(/[^0-9]/g, ''));

    const product = {
        name: productCard.querySelector('h4').innerText,
        price: priceValue,
        img: productCard.querySelector('img').src,
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem('seafoodCart')) || [];
    const existingItem = cart.find(item => item.name === product.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('seafoodCart', JSON.stringify(cart));
    updateCartBadge();

    // HIỆU ỨNG RUNG (BUMP) - KHÔNG HIỆN ALERT
    const cartIconContainer = document.querySelector('.cart-icon');
    cartIconContainer.classList.remove('bump');
    void cartIconContainer.offsetWidth; 
    cartIconContainer.classList.add('bump');
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(btn => btn.addEventListener('click', addToCart));
});

