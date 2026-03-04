// Biến lưu trữ số lượng giỏ hàng hiện tại
let count = 3; 

// Lấy tất cả các nút "Thêm vào giỏ" trên trang
const addButtons = document.querySelectorAll('.add-to-cart');
const cartCountElement = document.getElementById('cart-count');

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Tăng số lượng
        count++;
        cartCountElement.innerText = count;

        // 2. Hiệu ứng rung nhẹ cho icon giỏ hàng
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);

        // 3. Hiển thị thông báo nhỏ (Toast)
        showToast("Đã thêm hải sản vào giỏ hàng!");
    });
});

// Hàm hiển thị thông báo
function showToast(message) {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}