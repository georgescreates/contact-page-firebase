// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
apiKey: "AIzaSyAxrERT5gxfmwXYcVTLz4ro1DbcqZWVTGA",
authDomain: "locomotive-contact-page.firebaseapp.com",
projectId: "locomotive-contact-page",
storageBucket: "locomotive-contact-page.appspot.com",
messagingSenderId: "1046036559258",
appId: "1:1046036559258:web:ec1faf6f4f23e62ea97623",
measurementId: "G-35X4ZZP29C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// form
const form = document.getElementById("contact-form");

// preventing the form from submitting
form.addEventListener('submit', (e) => {
    e.preventDefault();
})

// all inputs
const inputs = document.getElementsByTagName("input");
const nameInput = document.getElementById('name-input');
const companyInput = document.getElementById("company-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById('phone-input');

// textarea
const textArea = document.getElementById("user-area");

// submit button
const submitAnchor = document.getElementById('submit-anchor');

// popup
const popup = document.getElementById("popUp");
const alertIcon = document.getElementById('alert-icon');
const alertParag = document.getElementById('alert');

// patterns
var mailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
var phonePattern = "[0-9]{3,}";

// alert messages array
var alertMessages = [
    "Please, note that all fields are required.",
    "Your name is required.",
    "A valid name is longer than one letter.",
    "The company's name is required",
    "Your email is required.",
    "Please, enter a valid mail address.",
    "Your phone number is required",
    "The phone number you provided is not valid.",
    "It seems you forgot to write you message.",
    "Your message is too short. Three(3) characters at least are required.",
    "Your message is too long. The max is 741 characters."
];

function formValidity(){
    // set form as invalid
    function formAddInvalid(){
        if(form.classList.contains('valid')){
            form.classList.remove('valid');
        };
        form.classList.add('invalid');
    }

    // set form as valid
    function formAddValid(){
        if(form.classList.contains('invalid')){
            form.classList.remove('invalid');
        };
        form.classList.add('valid');
    }

    //checking inputs state at loading
    window.addEventListener('load', () => {
        if(nameInput.value.length == 0){
            nameInput.className = 'wrong';
            formAddInvalid();
        }
        if(companyInput.value.length == 0){
            companyInput.className = 'wrong';
            formAddInvalid();
        }
        if(emailInput.value.length == 0){
            emailInput.className = 'wrong';
            formAddInvalid();
        }
        if(phoneInput.value.length == 0){
            phoneInput.className = 'wrong';
            formAddInvalid();
        }
        if(textArea.value.length == 0){
            textArea.className = 'wrong';
            formAddInvalid();
        }
    });

    // updating inputs states
    // updating nameInput
    nameInput.addEventListener('keyup', () => {
        if(nameInput.value.length < 2 || nameInput.value.length > 25){
            nameInput.className = "wrong";
        }
        else{
            nameInput.className = "good";
        }
    });

    // updating companyInput
    companyInput.addEventListener('keyup', () => {
        if(companyInput.value.length < 1){
            companyInput.className = "wrong";
        }
        else{
            companyInput.className = "good";
        }
    });

    // updating emailInput
    emailInput.addEventListener('keyup', () => {
        if(!emailInput.value.match(mailPattern)){
            emailInput.className = "wrong";
        }
        else{
            emailInput.className = "good";
        }
    });

    // updating phoneInput
    phoneInput.addEventListener('keyup', () => {
        if(!phoneInput.value.match(phonePattern)){
            phoneInput.className = "wrong";
        }
        else{
            phoneInput.className = "good";
        }
    });

    // updating textarea
    textArea.addEventListener('keyup', () => {
        if(textArea.value.length < 3 || textArea.value.length > 741){
            textArea.className = "wrong";
        }
        else{
            textArea.className = "good";
        }
    });

    submitAnchor.addEventListener('click', () => {
        // if all fields are invalid
        if(nameInput.className == 'wrong' && companyInput.className == 'wrong' && emailInput.className == 'wrong' && phoneInput.className == 'wrong' && textArea.className == 'wrong'){
            alertIcon.innerHTML = '<span class="iconify" data-icon="eva:alert-triangle-outline" data-inline="false"></span>';
            alertParag.textContent = alertMessages[0];
            formAddInvalid();
        }

        if(nameInput.className == 'wrong' || companyInput.className == 'wrong' || emailInput.className == 'wrong' || phoneInput.className == 'wrong' || textArea.className == 'wrong'){
            alertIcon.innerHTML = '<span class="iconify" data-icon="eva:alert-triangle-outline" data-inline="false"></span>';
            formAddInvalid();

            // checking nameInput validity
            if(nameInput.value.length == 0){
                alertParag.textContent = alertMessages[1];
            }
            else{
                if(nameInput.value.length < 2){
                    alertParag.textContent = alertMessages[2];
                }
            }

            // checking companyInput validity
            if(companyInput.value.length == 0){
                alertParag.textContent = alertMessages[3];
            }

            // checking emailInput validity
            if(emailInput.value.length == 0){
                alertParag.textContent = alertMessages[4];
            }
            else{
                if(!emailInput.value.match(mailPattern)){
                    alertParag.textContent = alertMessages[5];
                }
            }

            // checking phoneInput validity
            if(phoneInput.value.length == 0){
                alertParag.textContent = alertMessages[6];
            }
            else{
                if(!phoneInput.value.match(phonePattern)){
                    alertParag.textContent = alertMessages[7];
                }
            }

            // checking textarea validity
            if(textArea.value.length == 0){
                alertParag.textContent = alertMessages[8];
            }
            else{
                if(textArea.value.length < 3){
                    alertParag.textContent = alertMessages[9]
                }
                if(textArea.value.length > 741){
                    alertParag.textContent = alertMessages[10]
                }
            }
        }else{
            // if all fields are valid
            if(nameInput.className == 'good' && companyInput.className == 'good' && emailInput.className == 'good' && phoneInput.className == 'good' && textArea.className == 'good'){
                formAddValid();

                //collecting user's inquiries
                var theName = nameInput.value;
                var theCompany = companyInput.value;
                var theEmail = emailInput.value;
                var thePhone = phoneInput.value;
                var theMessage = textArea.value;

                // save the inquiries into firebase
                function saveMessage(theName, theCompany, theEmail, thePhone, theMessage){
                    var newMessageRef = messagesRef.push();
                    newMessageRef.set({
                        name: theName,
                        company: theCompany,
                        email: theEmail,
                        phone: thePhone,
                        message: theMessage
                    })
                }
                saveMessage(theName, theCompany, theEmail, thePhone, theMessage);

                // giving a confirmation alert
                alertIcon.innerHTML = '<span class="iconify" data-icon="gg:check-o" data-inline="false"></span>';
                alertParag.textContent = "Your requests have been sent. Thank you!";

                // resetting the form
                form.reset();
            }
        }

        popup.style.animation = 'none';
            setTimeout(function() {
                 popup.style.animation = 'popped 4s ease-in-out';
             }, 10);

    });
}
formValidity();