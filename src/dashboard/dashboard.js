getUserData()

function getUserData() {
  const userId = localStorage.getItem('userId')
  firebase.firestore().collection('users').doc(userId).get()
  .then(function(snapshot) {
    const userObj = snapshot.data()
    document.getElementById('name').innerHTML = userObj.fullname
    document.getElementById('age').innerHTML = userObj.age
    document.getElementById('email').innerHTML = userObj.email
  }).catch(function(error){
    alert(error.message)
  })
}