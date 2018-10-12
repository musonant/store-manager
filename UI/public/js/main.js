let QS = (string) => {
  return document.querySelectorAll(string);
}
let GID = (string) => {
  return document.getElementById(string)
}

// Sidebar toggle
//==========================
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');

sidebarToggle.addEventListener('click', () => {

  if (sidebar.className.indexOf('show') !== -1) {
    sidebar.className = 'sidebar';
  } else {
    sidebar.className = 'sidebar show';
  }
});

// Display Product Modals
// ===========================
let showModalButtons = QS('.js-show-product-modal');
for (const button of showModalButtons) {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    GID('product-modal').className = 'modal-wrapper show-modal';
  })
}

// Hide Modals
// ===========================
for (const item of QS('.js-hide-modal')) {
  item.addEventListener("click", (e) => {
    GID('product-modal').className = 'modal-wrapper';
  })
}
for (const item of QS('.js-hide-modal')) {
  item.addEventListener("click", (e) => {
    GID('cart-modal').className = 'modal-wrapper';
  })
}

// Display Product Modals
// ===========================
GID('show-cart').addEventListener('click', (e) => {
  GID('cart-modal').className = 'modal-wrapper show-modal';
})



