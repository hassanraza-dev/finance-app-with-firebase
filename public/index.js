console.log('firebase=--->', firebase.firestore)

 
        
    function register(){
        var x= document.getElementById("login_ui");
    var y= document.getElementById("register");
    var z= document.getElementById("btn"); 
        x.style.left="-400px";
        y.style.left="50px";
        z.style.left="110px";
    }    
    
    function login_ui(){
        var x= document.getElementById("login_ui");
    var y= document.getElementById("register");
    var z= document.getElementById("btn"); 
        x.style.left="50px";
        y.style.left="450px";
        z.style.left="0";
    } 

function signup() {
    const email = document.getElementById('email-r').value
    const password = document.getElementById('password-r').value
    const fullname = document.getElementById('fullname-r').value
    // const age = document.getElementById('age-r').value
    const confirm = document.getElementById('confirm-pass').value

if(confirm == password)
{
    
localStorage.setItem('username' , fullname)
firebase.auth().createUserWithEmailAndPassword(email, password)
.then(function(userResponse) {
    const userId = userResponse.user.uid
   

    // firebase.firestore().collection('users').add({
    firebase.firestore().collection('users').doc(userId).set({
        fullname,
        email
        
    }).then(function() {
        
        swal({
            title: "Successfully Registered!",
            text: "You clicked the button!",
            icon: "success",
            button: "OK!",
          });
    }).catch(function(error) {
        var errorMessage = error.message;
        console.log(error)
        alert(errorMessage)
    })
})
.catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode)
    alert(errorMessage)
});
}
else
{
    alert('Password is not same')
}
}


function login() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(userResponse) {
        const userId = userResponse.user.uid
        localStorage.setItem('userId', userId)
        swal({
            title: "Successfully Login!",
            text: "You clicked the button!",
            icon: "success",
            button: "OK!",
          });
        location.replace("src/transactions/transactions.html")
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        // console.log('error --->', error)
        alert(errorMessage)
    });
}