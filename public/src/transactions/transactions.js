
getMonthAndYear()
getTransactions()

getname();

function logout()
{
  localStorage.clear('')
  location.replace('../../index.html')
}



function getname()
{
  const userId = localStorage.getItem('userId')
  const user = document.getElementById('user')
  firebase.firestore().collection('users').doc(userId).get()
  .then(function(name){
    
    user.innerHTML = name.data().fullname
  })
 
}



function getUser() {
  const userId = localStorage.getItem('userId')
  firebase.firestore().collection('users').doc(userId).get()
  .then(function(snapshot) {
    const userObj = snapshot.data()
    const userElement = document.getElementById('name')
    userElement.innerHTML = userObj.fullname
    
  }).catch(function(error){
    alert(error.message)
  })
  

}

function getMonthAndYear() {
  const date = new Date()
  const currentMonth = date.getMonth()
  const currentYear = date.getFullYear()
  const monthElement = document.getElementById('month')
  const yearElement = document.getElementById('year')
  monthElement.value = currentMonth
  yearElement.value = currentYear
}

function saveIncome()
{
  const userId = localStorage.getItem('userId')
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').valueAsDate;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  
  console.log(amount,date,description,category)

  firebase.firestore().collection('transactions').add({
    amount,date,description,category,userId,type:'income'
  }).then(function(){
    
    swal({
      title: "Successfully Add!",
      icon: "success",
      button: "OK!",
    });
    clearIncomeform()
    getTransactions()
    $('#incomeModal').modal('hide')
  }).catch(function(){

  })
}

function clearIncomeform()
{
   
    document.getElementById('amount').value = ''
    document.getElementById('date').value = ''
    document.getElementById('description').value = ''
    document.getElementById('category').value = ''
}

function clearIncomeform2()
{
   
    document.getElementById('amount-expense').value = ''
    document.getElementById('date-expense').value = ''
    document.getElementById('description-expense').value = ''
    document.getElementById('category-expense').value = ''
}



function saveExpense()
{
  
  const userId = localStorage.getItem('userId')
  const amount = document.getElementById('amount-expense').value;
  const date = document.getElementById('date-expense').valueAsDate;
  const description = document.getElementById('description-expense').value;
  const category = document.getElementById('category-expense').value;
  const imagefile = document.getElementById('file-expense').files[0]
  
  var storageRef = firebase.storage().ref('expense.jpg');

  storageRef.put(imagefile).then(function(response){

    console.log('thiz-----',response)
    response.ref.getDownloadURL().then(function(url){
      
      firebase.firestore().collection('transactions').add({
        amount,date,description,category,userId,type:'expense',receipt:url
      }).then(function(){
       
       
        
        swal({
          title: "Successfully Add!",
          icon: "success",
          button: "OK!",
        });
        getTransactions()
        clearIncomeform2()
        
        $('#expenseModal').modal('hide')
      }).catch(function(){
    
      })
    })
    

  }).catch(function(error){
    console.log(error)

  })
 
  
}

function getTransactions()
{
  const userId = localStorage.getItem('userId')
  const table = document.getElementsByTagName('tbody')[0]
 table.innerHTML = ''
  firebase.firestore().collection('transactions')
  .orderBy('date','asc')
  
  .where('userId','==',userId)
  
  .get() 
  .then(function(snaps){

    
    snaps.forEach(function(doc){
      

      const data = doc.data()
      const row = document.createElement('TR')
      const type = document.createElement('TD')
      const amount = document.createElement('TD')
      const category = document.createElement('TD')
      const date = document.createElement('TD')
      const image = document.createElement('TD')

      type.innerHTML = data.type
      amount.innerHTML = data.amount
      category.innerHTML = data.category
      date.innerHTML =moment(data.date.toDate()).format("dddd, MMMM Do YYYY"); 
      if(data.receipt == null){
        image.innerHTML = `<img src="" />`
      }
      else{
      image.innerHTML = `<img src="${data.receipt}" width="100px"/>`
      }
      row.appendChild(type)
      row.appendChild(amount)
      row.appendChild(category)
      row.appendChild(date)
      row.appendChild(image)
      table.appendChild(row)

    })

  })
}

function filter()
{
  const userId = localStorage.getItem('userId')
  const type = document.getElementById('type-filter').value

  if(type === 'all')
  {
    return getTransactions()
  }

  const table = document.getElementsByTagName('tbody')[0]
  table.innerHTML = ''
   firebase.firestore().collection('transactions')
   .where('type','==',type)
   .where('userId','==',userId)
   .orderBy('date','desc')
   .get()
   .then(function(snaps){
     snaps.forEach(function(doc){
 
       const data = doc.data()
       const row = document.createElement('TR')
       const type = document.createElement('TD')
       const amount = document.createElement('TD')
       const category = document.createElement('TD')
       const date = document.createElement('TD')
       const image = document.createElement('TD')
 
       type.innerHTML = data.type
       amount.innerHTML = data.amount
       category.innerHTML = data.category
       date.innerHTML = data.date.toDate()
       image.innerHTML = `<img src="${data.receipt}" width="100px"/>`
 
       row.appendChild(type)
       row.appendChild(amount)
       row.appendChild(category)
       row.appendChild(date)
       row.appendChild(image)
       table.appendChild(row)
 
     })
 
   })
  }
