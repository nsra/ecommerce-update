import 'bootstrap/dist/css/bootstrap.rtl.min.css';
// import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import '@fortawesome/fontawesome-free/js/all.min';
import './css/style.css'
import 'popper.js/dist/popper.min';
import $ from 'jquery';
// import 'bootstrap/dist/js/bootstrap.min.js';
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';

$(function () {
    $('[data-bs-toggle="tooltip"]').tooltip()
    $('.add-to-cart-btn').on("click", function () {
        alert('أضيف المُنتج إلى عربة الشراء');
    });
    $('.product-option input[type="radio"]').on("change", function () {
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    });

    $('[data-remove-from-cart]').on("click", function () {
        $(this).parents('[data-product-info]').remove();

        // أعد حساب السعر الإجمالي بعد حذف أحد المُنتجات
        calculateTotalPrice();
    });

    function calculateTotalPrice() {

        // أنشئ متغيّرًا جديدًا لحفظ السعر الإجمالي
        var totalPriceForAllProducts = 0;

        // لكل سطر يمثل معلومات المُنتج في الصّفحة
        $('[data-product-info]').each(function () {

            // اجلب سعر القطعة الواحدة من الخاصّية الموافقة
            var pricePerUnit = $(this).attr('data-product-price');

            // اجلب كمية المنتج من حقل اختيار الكمية
            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPriceForProduct = pricePerUnit * quantity;

            // أضف السعر الإجمالي لهذا المنتج إلى السعر الإجمالي لكل المُنتجات، واحفظ القيمة في المتغير نفسه
            totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);
        });

        // حدث السعر الإجمالي لكل المُنتجات في الصفحة
        $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
    }

    var citiesByCountry = {
        sa: ['الرياض', 'جدة'],
        eg: ['القاهرة', 'الإسكندرية'],
        jo: ['عمان', 'الزرقاء'],
        sy: ['دمشق', 'حلب', 'حماه']
    };

    // عندما يتغير البلد
    $('#form-checkout select[name="country"]').on("change", function () {
        // اجلب رمز البلد
        var country = $(this).val();

        // اجلب مدن هذا البلد من المصفوفة
        var cities = citiesByCountry[country];

        // فرّغ قائمة المدن
        $('#form-checkout select[name="city"]').empty();
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">اختر المدينة</option>'
        );

        // أضف المدن إلى قائمة المدن
        cities.forEach(function (city) {
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        });
    });

    // عندما تتغير طريقة الدفع
    $('#form-checkout input[name="payment_method"]').on("change", function () {

        // اجلب القيمة المُختارة حاليًا
        var paymentMethod = $(this).val();

        if (paymentMethod === 'on_delivery') {

            // إذا كانت عند الاستلام، فعطّل حقول بطاقة الائتمان
            $('#credit-card-info input').prop('disabled', true);

        } else {

            // وإلا ففعلّها
            $('#credit-card-info input').prop('disabled', false);
        }

        // بدل معلومات بطاقة الائتمان بين الظهور والإخفاء
        $('#credit-card-info').toggle();
    });

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

    $('#copyright').text("جميع الحقوق محفوظة للمتجر سنة " + new Date().getFullYear());

})