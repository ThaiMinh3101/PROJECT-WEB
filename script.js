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
    
    const quantity = parseFloat(productCard.querySelector('.buy-quantity').value);
    const unit = productCard.querySelector('.buy-unit').value;

    // Lấy giá thực tế (đã xử lý lỗi giá giảm dính số)
    let priceElement = productCard.querySelector('.price').cloneNode(true);
    if (priceElement.querySelector('.old-price')) priceElement.querySelector('.old-price').remove();
    const pricePerKg = parseInt(priceElement.innerText.replace(/[^0-9]/g, ''));

    // TÍNH TOÁN THEO LẠNG: 1 lạng = 1/10 kg
    const unitPrice = (unit === 'lang') ? (pricePerKg / 10) : pricePerKg;
    const totalItemPrice = unitPrice * quantity;

    const product = {
        name: productCard.querySelector('h4').innerText,
        img: productCard.querySelector('img').src,
        unit: (unit === 'lang') ? 'lạng' : 'kg',
        quantity: quantity,
        pricePerUnit: unitPrice,
        total: totalItemPrice
    };

    let cart = JSON.parse(localStorage.getItem('seafoodCart')) || [];
    
    // Kiểm tra trùng sản phẩm và đơn vị để cộng dồn
    const existing = cart.find(item => item.name === product.name && item.unit === product.unit);
    if (existing) {
        existing.quantity += product.quantity;
        existing.total += product.total;
    } else {
        cart.push(product);
    }

    localStorage.setItem('seafoodCart', JSON.stringify(cart));
    updateCartBadge(); // Hiệu ứng nảy giỏ hàng
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(btn => btn.addEventListener('click', addToCart));
});

