$(document).ready(function() {
  // --- our code goes here ---
  const $submitButton = $('button.btn.btn-success');
  $submitButton.click(function (event) {
    let data = $('form').serializeArray();
    let dataArr = [];
    for (let object of data) {
      dataArr.push(object.value)
    }
    // Indicates a duplicate value has been selected
    if (new Set(dataArr).size !== dataArr.length) {
      $('.error_duplicate').css('display', 'flex')
      event.preventDefault();
    }
    if (dataArr.includes("")) {
      $('.error_missing').css('display', 'flex')
      event.preventDefault();
    }
  })
});



