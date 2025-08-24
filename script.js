
const display = document.querySelector('.calculator input[type="text"]');
const buttons = document.querySelectorAll('.calculator button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const btnValue = button.textContent;

    if (btnValue === 'AC') {
      display.value = '';
    } else if (btnValue === 'DEL') {
      display.value = display.value.slice(0, -1);
    } else if (btnValue === '=') {
      try {
        // Evaluate the expression safely
        // Replace % with /100 for percentage calculation
        let expression = display.value.replace(/%/g, '/100');
        // Evaluate expression using Function constructor to avoid eval
        let result = Function('"use strict";return (' + expression + ')')();
        display.value = result;
      } catch (error) {
        display.value = 'Error';
      }
    } else {
      // Append button value to display
      // Prevent multiple operators in a row except for minus sign
      const operators = ['+', '-', '*', '/', '%'];
      const lastChar = display.value.slice(-1);

      if (operators.includes(btnValue)) {
        if (display.value === '' && btnValue !== '-') {
          // Do not allow operator at start except minus
          return;
        }
        if (operators.includes(lastChar)) {
          // Replace last operator with new one
          display.value = display.value.slice(0, -1) + btnValue;
          return;
        }
      }
      display.value += btnValue;
    }
  });
});
