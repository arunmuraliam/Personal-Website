
var nameError = document.getElementById('name-error')
var emailError = document.getElementById('email-error')
var passwordError = document.getElementById('pw1-error')
var passwordConfirmError = document.getElementById('confirm-error')
var phoneError = document.getElementById('phone-error')

var submitError = document.getElementById('submit-error')


// function for validating the input field  
function validateName() {
    var name = document.getElementById('firstName').value


    if (name.length == 0) {
        nameError.innerHTML = 'Name required'
        return false

    }
    if (!name.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)) {  // condition for checking full name or not 
        nameError.innerHTML = 'Write full name'    // assiging the error message to nameError variable
        return false

    }
    nameError.innerHTML = ''
    return true
}