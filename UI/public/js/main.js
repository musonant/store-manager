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

if (sidebarToggle && sidebar) {

  sidebarToggle.addEventListener('click', () => {
  
    if (sidebar.className.indexOf('show') !== -1) {
      sidebar.className = 'sidebar';
    } else {
      sidebar.className = 'sidebar show';
    }
  });
};

// Display Product Modals
// ===========================
let showModalButtons = QS('.js-show-product-modal');
for (const button of showModalButtons) {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    GID('product-modal').className = 'modal-wrapper show-modal';
  });
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
if (GID('show-cart')) {
  GID('show-cart').addEventListener('click', (e) => {
    GID('cart-modal').className = 'modal-wrapper show-modal';
  })
}


// DROPDOWN
// ===========================

let state = {
}

let dropDowns = document.getElementsByClassName('dropdown');

for (let i=0; i < dropDowns.length; i++) {
  let dropDown = dropDowns[i];
  dropDowns[i].addEventListener('click', toggleDropDown);
  dropDown.id = 'dropdown_' + i;
  state[dropDown.id] = 'inactive';
}

function toggleDropDown() {
  if(state[this.id] === 'inactive') {
    this.className = 'dropdown active';
    state[this.id] = 'active';
  } else {
    this.className = 'dropdown';
    state[this.id] = 'inactive';
  }
}

// // RESPONSIVE PROFILE LINK
// // =========================

// if (window.outerWidth < 560) {
//   let profileSettings = document.getElementsByClassName('profile-settings')[0];
//   let sideBar = document.getElementById('sidebar');

//   sideBar.appendChild(profileSettings);
  
//   // console.log(profileSettings);
//   // profileSettings.innerHTML = "";

// }