// 1. Lấy dữ liệu giỏ hàng từ localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('seafoodCart')) || [];
}

// 2. Cập nhật con số hiển thị trên icon giỏ hàng (ĐÃ SỬA: Đếm số loại mặt hàng)
function updateCartBadge() {
    const cart = getCart();
    const badge = document.getElementById('cart-count');
    if (!badge) return;

    // CHỖ THAY ĐỔI: Chỉ lấy độ dài của mảng (số lượng dòng sản phẩm)
    const totalOrders = cart.length; 
    
    badge.innerText = totalOrders;
    badge.style.display = totalOrders > 0 ? 'flex' : 'none';
}

// 3. Hàm xử lý khi bấm nút "Thêm vào giỏ hàng"
function addToCart(event) {
    const button = event.target;
    const productCard = button.closest('.product-card'); 
    
    const quantity = parseFloat(productCard.querySelector('.buy-quantity').value);
    const unit = productCard.querySelector('.buy-unit').value;

    // Lấy giá sạch (loại bỏ giá cũ nếu có)
    let priceElement = productCard.querySelector('.price').cloneNode(true);
    if (priceElement.querySelector('.old-price')) priceElement.querySelector('.old-price').remove();
    const pricePerKg = parseInt(priceElement.innerText.replace(/[^0-9]/g, ''));

    // Tính toán theo lạng hoặc kg
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

    let cart = getCart();
    
    // Kiểm tra trùng: Cùng tên và cùng đơn vị thì cộng dồn số lượng
    const existing = cart.find(item => item.name === product.name && item.unit === product.unit);
    if (existing) {
        existing.quantity += product.quantity;
        existing.total += product.total;
    } else {
        cart.push(product);
    }

    localStorage.setItem('seafoodCart', JSON.stringify(cart));
    
    // Cập nhật số lượng hiển thị (số loại mặt hàng)
    updateCartBadge();

    // KHÔI PHỤC HIỆU ỨNG RUNG (BUMP)
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.classList.remove('bump'); 
        void cartIcon.offsetWidth; // Reset animation
        cartIcon.classList.add('bump');
        // Xóa class sau khi diễn xong hiệu ứng
        setTimeout(() => cartIcon.classList.remove('bump'), 400);
    }
}

// Khởi tạo khi load trang
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(btn => btn.addEventListener('click', addToCart));
});