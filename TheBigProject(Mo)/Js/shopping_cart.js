document.addEventListener('DOMContentLoaded', () => {
    
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryShipping = document.getElementById('summary-shipping');
    const summaryTotal = document.getElementById('summary-total');
    const shippingRadios = document.querySelectorAll('.shipping-radio');

    
    function updateCart() {
        let totalSubtotal = 0;

        
        const itemRows = document.querySelectorAll('.cart-item');
        itemRows.forEach(row => {
            
            const priceText = row.querySelector('.item-price').innerText;
            const qtyInput = row.querySelector('.item-qty');
            const rowSubtotalDisplay = row.querySelector('.item-subtotal');

            
            const price = parseFloat(priceText.replace('$', '').replace(/,/g, ''));
            const qty = parseInt(qtyInput.value);

            
            const rowTotal = price * qty;
            totalSubtotal += rowTotal;


            rowSubtotalDisplay.innerText = '$' + rowTotal.toLocaleString('en-US', { minimumFractionDigits: 2 });
        });

        
        let shippingCost = 0;
        shippingRadios.forEach(radio => {
            if (radio.checked) {
                shippingCost = parseFloat(radio.dataset.cost);
            }
        });

        
        summarySubtotal.innerText = '$' + totalSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 });
        summaryShipping.innerText = '$' + shippingCost.toLocaleString('en-US', { minimumFractionDigits: 2 });
        
        
        const finalTotal = totalSubtotal + shippingCost;
        summaryTotal.innerText = '$' + finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2 });
    }

    
    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('item-qty')) {
            
            if (e.target.value < 1) e.target.value = 1; 
            updateCart();
        }
    });

    
    document.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-item-btn');
        if (removeBtn) {
            removeBtn.closest('.cart-item').remove(); 
            updateCart(); 
        }
    });


    shippingRadios.forEach(radio => {
        radio.addEventListener('change', updateCart);
    });


    updateCart();

});
