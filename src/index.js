import 'bootstrap/dist/css/bootstrap.rtl.min.css';
// import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import '@fortawesome/fontawesome-free/js/all.min';
import './css/style.css'
import 'popper.js/dist/popper.min';
import $ from 'jquery';
// import 'bootstrap/dist/js/bootstrap.min.js';
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');


$(function() {
    $('[data-bs-toggle="tooltip"]').tooltip()
    $('.add-to-cart-btn').on( "click", function() {
        alert('أضيف المُنتج إلى عربة الشراء');
    });
    $('#copyright').text("جميع الحقوق محفوظة للمتجر سنة " + new Date().getFullYear());
})