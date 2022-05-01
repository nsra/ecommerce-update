import 'bootstrap/dist/css/bootstrap.rtl.min.css';
// import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import '@fortawesome/fontawesome-free/js/all.min';
import './css/style.css'
import 'jquery/dist/jquery.slim.min.js';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap';
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import $ from 'jquery';

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

$(function() {
    $('.add-to-cart-btn').on( "click",function() {
        alert('أضيف المُنتج إلى عربة الشراء');
    });
    $('#copyright').text("جميع الحقوق محفوظة للمتجر سنة " + new Date().getFullYear());
})