function validateName() {
  name = document.getElementById('profile-name').value;
  return (name.length > 0 && name.length <= 50);
}

function validateAddress() {
  address = document.getElementById('profile-address').value;
  return (address.length > 0 && address.length <= 140);
}

function checkExist(inputId, requestKey) {
    input = document.getElementById(inputId).value;
    xhr = new XMLHttpRequest();
    obj = {};
    obj[requestKey] = input;
    content = JSON.stringify(obj);
    xhr.open('POST', probookPageBase + 'register/validate');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            redElement(inputId, !response[requestKey]);
        }
    };
    xhr.send(content);
}

function validatePhone() {
  regex = /^[+\-\*#0-9]{9,12}$/;
  phone = document.getElementById('profile-phone').value;
  return phone.match(regex);
}

function validateCardNumber() {
    regex = /^[0-9]{16}$/;
    cardnumber = document.getElementById('card-number').value;
    return cardnumber.match(regex);
}

function redElement(elementId, red) {
  var classList = document.getElementById(elementId).classList;
  if (red)
    classList.add('redborder');
  else
    classList.remove('redborder');
  return red;
}

function redName() {
  return redElement('profile-name', !validateName());
}

function redAddress() {
  return redElement('profile-address', !validateAddress());
}

function redPhone() {
  return redElement('profile-phone', !validatePhone());
}

function redCardNumber() {
    return redElement('card-number', !validateCardNumber());
}

document.getElementById('profile-name').onblur = redName;
document.getElementById('profile-address').onblur = redAddress;
document.getElementById('profile-phone').onblur = redPhone;
document.getElementById('card-number').onblur = function () {
    if (!redCardNumber())
        checkExist('card-number', 'cardnumber');
};

document.getElementById('updateform').addEventListener("submit", function(event) {
  var invalid = [
    redName(), redAddress(), redPhone(), redCardNumber()
  ];
  if (invalid.some(x => x))
    event.preventDefault();
});

document.getElementById('dp-file').onchange = function() {
  var str = this.value;
  var temp = new String(str).substring(str.lastIndexOf('/') + 1);
  var base = new String(temp).substring(temp.lastIndexOf('\\') + 1);
  document.getElementById('profile-picture').value = base;
}
