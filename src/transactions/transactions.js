/*
Set item in localstorage
========================

const user = { name: 'Javed' }
localStorage.setItem('user', JSON.stringify(user))
*/

// getUser()
getMonthAndYear()
getTransactions()

getname();



function getname()
{
  const userId = localStorage.getItem('userId')
  const user = document.getElementById('user')
  firebase.firestore().collection('users').doc(userId).get()
  .then(function(name){
    console.log("user---------->",name.data().fullname)
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
  const user = JSON.parse(localStorage.getItem('user'))

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
    alert("Add Successfully")
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

function saveExpense()
{
  const userId = localStorage.getItem('userId')
  const amount = document.getElementById('amount-expense').value;
  const date = document.getElementById('date-expense').valueAsDate;
  const description = document.getElementById('description-expense').value;
  const category = document.getElementById('category-expense').value;
  
  console.log(amount,date,description,category)

  firebase.firestore().collection('transactions').add({
    amount,date,description,category,userId,type:'expense'
  }).then(function(){
    alert("Add Successfully")
    clearIncomeform()
    getTransactions()
    $('#expenseModal').modal('hide')
  }).catch(function(){

  })
}

function getTransactions()
{
  const userId = localStorage.getItem('userId')
  const table = document.getElementsByTagName('tbody')[0]
 table.innerHTML = ''
  firebase.firestore().collection('transactions')
  .orderBy('date','desc')
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

      type.innerHTML = data.type
      amount.innerHTML = data.amount
      category.innerHTML = data.category
      date.innerHTML = data.date.toDate()

      row.appendChild(type)
      row.appendChild(amount)
      row.appendChild(category)
      row.appendChild(date)
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
 
       type.innerHTML = data.type
       amount.innerHTML = data.amount
       category.innerHTML = data.category
       date.innerHTML = data.date.toDate()
 
       row.appendChild(type)
       row.appendChild(amount)
       row.appendChild(category)
       row.appendChild(date)
       table.appendChild(row)
 
     })
 
   })
 }
