const productSelect = document.getElementById('product');
const priceDisplay = document.getElementById('price');
const thankYou = document.getElementById('thankYou');

// Update price when product changes
productSelect.addEventListener('change', () => {
  priceDisplay.textContent = `Price: $${productSelect.value}`;
  // Reset thank you message if shown
  thankYou.style.display = 'none';
});

// Render PayPal Button
paypal.Buttons({
  createOrder: (data, actions) => {
    // Use the selected product price
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: productSelect.value
        }
      }]
    });
  },
  onApprove: (data, actions) => {
    return actions.order.capture().then(details => {
      // Show thank you message
      thankYou.style.display = 'block';
    });
  },
  onCancel: () => {
    alert('Payment cancelled.');
  },
  onError: err => {
    alert('An error occurred: ' + err);
  }
}).render('#paypal-button-container');
