import 'bootstrap/scss/bootstrap.scss';
import './scss/style.scss';
import './css/style.css';
import '@fortawesome/fontawesome-free/js/all.min';
// import 'popper.js/dist/popper.min';
// import $ from 'jquery';
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';

const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

document.querySelectorAll('.add-to-cart-btn').forEach(item => {
    item.addEventListener('click', () => {
        alert('أضيف المُنتج إلى عربة الشراء')
    })
})

document.querySelectorAll(['.color-option input[type="radio"]']).forEach(item => {
    item.addEventListener('change', () => {
        document.querySelectorAll('.color-option').forEach(i => {
            i.classList.remove("active")
        })
        item.parentNode.parentNode.classList.add("active")
    })
})

document.querySelectorAll(['.size-option input[type="radio"]']).forEach(item => {
    item.addEventListener('change', () => {
        document.querySelectorAll('.size-option').forEach(i => {
            i.classList.remove("active")
        })
        item.parentNode.parentNode.classList.add("active")
    })
})

document.querySelectorAll('[data-remove-from-cart]').forEach(item => {
    item.addEventListener('click', () => {
        item.closest('[data-product-info]').remove()
        calculateTotalPrice()
    })
})

document.querySelectorAll('[data-product-quantity]').forEach(item => {
    item.addEventListener('change', () => {
        const newQuantity = item.value
        const parent = item.closest('[data-product-info]')
        const pricePerUnit = parent.getAttribute('data-product-price')
        const totalPriceForProduct = newQuantity * pricePerUnit
        parent.querySelector('.total-price-for-product').innerHTML = totalPriceForProduct + '$'
        calculateTotalPrice()
    })
})

function calculateTotalPrice() {
    // أنشئ متغيّرًا جديدًا لحفظ السعر الإجمالي    
    let totalPriceForAllProducts = 0;
    // لكل سطر يمثل معلومات المُنتج في الصّفحة    
    document.querySelectorAll('[data-product-info]').forEach(item => {
        // اجلب سعر القطعة الواحدة من الخاصّية الموافقة        
        const pricePerUnit = item.getAttribute("data-product-price");
        // اجلب كمية المنتج من حقل اختيار الكمية 
        const quantity = item.querySelector('[data-product-quantity]').value;
        // اجلب السعر الإجمالي للمنتج بناء على الكمية المشتراه منه
        const totalPriceForProduct = pricePerUnit * quantity;
        // أضف السعر الإجمالي لهذا المنتج إلى السعر الإجمالي لكل المُنتجات، واحفظ القيمة في المتغير نفسه        
        totalPriceForAllProducts = totalPriceForAllProducts + totalPriceForProduct;
    });
    // حدث السعر الإجمالي لكل المُنتجات في الصفحة    
    document.getElementById("total-price-for-all-products").innerHTML = totalPriceForAllProducts + '$';
}

var citiesByCountry = {
    sa: ['الرياض', 'جدة'],
    eg: ['القاهرة', 'الإسكندرية'],
    jo: ['عمان', 'الزرقاء'],
    sy: ['دمشق', 'حلب', 'حماه']
};

document.querySelectorAll('#form-checkout select[name="country"]').forEach(item => {
    item.addEventListener('change', () => {
        // اجلب رمز البلد
        const country = item.value;
        // اجلب مدن هذا البلد من المصفوفة
        const cities = citiesByCountry[country];
        const city_options= document.querySelector('select[name="city"]')
        while (city_options.options.length > 0) {
            city_options.remove(0);
        }

        const firstOption = document.createElement('option');
        const optionText = document.createTextNode('اختر المدينة');
        firstOption.appendChild(optionText);
        firstOption.setAttribute('value', '');
        firstOption.setAttribute('disabled', 'true');
        firstOption.setAttribute('selected', 'true');
        city_options.appendChild(firstOption);

        // أضف المدن إلى قائمة المدن
        cities.forEach(function (city) {
            const newOption = document.createElement('option');
            const optionText = document.createTextNode(city);
            newOption.appendChild(optionText);
            newOption.setAttribute('value', 'city');
            city_options.appendChild(newOption);
        });
    })
})

document.querySelectorAll('#form-checkout input[name="payment_method"]').forEach(item => {
    item.addEventListener('change', () => {
        const paymentMethod = item.value
        const credit_card_option = document.querySelectorAll('#credit-card-info input')
        if (paymentMethod === 'on_delivery') {
            credit_card_option.forEach(item => {
                item.disabled= true
                item.style.display = item.style.display == 'none' ? 'block' : 'none';
            })
        }
        else {
            credit_card_option.forEach(item => {
                item.disabled= false
                item.style.display = item.style.display == 'none' ? 'block' : 'none';
            })            
        }
    })
})

document.getElementById('copyright').innerHTML= "جميع الحقوق محفوظة للمتجر سنة " + new Date().getFullYear()

$(function () {
    $("#price-range").slider({
        range: true,
        min: 50,
        max: 1000,
        step: 50,
        values: [250, 800],
        slide: function (event, ui) {
            $('#price-min').text(ui.values[0]);
            $('#price-max').text(ui.values[1]);
        }
    });
})