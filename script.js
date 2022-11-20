const form = document.getElementById("calculator");

function handleSignupFormSubmit(e) {
  // prevent default browser behaviour
  e.preventDefault();

  const amountResult = [];
  const interestResult = [];
  const formData = new FormData(e.target);
  
  const loanAmount = localStringToNumber(formData.get('loanAmount'));
  const interestRate = formData.get('interestRate');
  const time = formData.get('time');

  const monthlyPrincipal = loanAmount / time;

  for (let i = 0; i < time; i++) {
    interestResult[i] = (loanAmount - (monthlyPrincipal * i)) * (interestRate / 100) / time;
    amountResult[i] = interestResult[i] + monthlyPrincipal;
  }

  const totalAmount = amountResult.reduce((v, t) => v + t , 0) 
  const totalInterest = interestResult.reduce((v, t) => v + t , 0)

  console.log("Tổng tiền gốc và lãi", formatNumber(totalAmount))
  console.log("Tổng tiền lãi", formatNumber(totalInterest))
  console.log("Tiền đóng hàng tháng", formatNumber(amountResult[5]))
  console.log("Lãi hàng tháng", interestResult)
  console.log("Gốc và lãi hàng tháng", amountResult)
  console.log("<==============================================================================>")
}

function formatNumber(number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
}

form.addEventListener('submit', (e) => handleSignupFormSubmit(e));

// ---------------------------------

var currencyInput = document.querySelector('input[type="currency"]')
var currency = 'VND' // https://www.currency-iso.org/dam/downloads/lists/list_one.xml

 // format inital value
onKeydown({target:currencyInput})

// bind event listeners
currencyInput.addEventListener('focus', onFocus)
currencyInput.addEventListener('keyup', onKeydown)


function localStringToNumber( s ){
  return Number(String(s).replace(/[^0-9.-]+/g,""))
}

function onFocus(e){
  var value = e.target.value;
  e.target.value = value ? localStringToNumber(value) : ''
}

function onKeydown(e){
  var value = e.target.value

  var options = {
      maximumFractionDigits : 2,
      currency              : currency,
      style                 : "currency",
      currencyDisplay       : "symbol"
  }
  
  e.target.value = (value || value === 0) 
    ? localStringToNumber(value).toLocaleString(undefined, options)
    : ''
}