$(document).ready(function() {
    // Keypad button click handler
    $('.keypad-btn').on('click', function() {
        const value = $(this).text();
        const input = $('#phoneInput');
        const currentValue = input.val();
        
        // Format the phone number as user types
        let newValue = currentValue + value;
        newValue = formatPhoneNumber(newValue);
        input.val(newValue);
    });

    // Format phone number input
    $('#phoneInput').on('input', function() {
        const value = $(this).val();
        const formattedValue = formatPhoneNumber(value);
        $(this).val(formattedValue);
    });

    // Function to format phone number
    function formatPhoneNumber(value) {
        // Remove all non-numeric characters
        const number = value.replace(/\D/g, '');
        
        // Format the number
        if (number.length <= 3) {
            return number;
        } else if (number.length <= 6) {
            return `(${number.slice(0, 3)}) ${number.slice(3)}`;
        } else {
            return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 10)}`;
        }
    }
}); 