

getTransactions2()
getTransactions()
getChart()
getChart1()

getSum('expense','total-exp')
getSum('income','total-inc')
getname();

function logout()
{
  localStorage.clear('')
  location.replace('../../index.html')
}

function getSum(type,id)
{
  
  const userId = localStorage.getItem('userId')
  let total = 0
  firebase.firestore().collection('transactions')
  .where('userId','==',userId)
  .where('type','==',type)
  .get()
  .then(function(amount){
    amount.forEach(function(doc){
     data = parseInt(doc.data().amount)
     total+=data
     
  },
  
  )
   document.getElementById(id).innerHTML = total
  const exp = document.getElementById('total-exp').innerHTML
  const inc = document.getElementById('total-inc').innerHTML
 const remain = inc - exp
  document.getElementById('total').innerHTML = remain

 
}
)

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



function getTransactions2()
{
  const userId = localStorage.getItem('userId')
  const table = document.getElementsByTagName('tbody')[0,1]
 table.innerHTML = ''
  firebase.firestore().collection('transactions')
  .limitToLast(5)
  .orderBy('date','asc')
  .where('type' , '==','income')
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
      date.innerHTML =moment(data.date.toDate()).format("dddd, MMMM Do YYYY"); 
      
      row.appendChild(type)
      row.appendChild(amount)
      row.appendChild(category)
      row.appendChild(date)
      
      table.appendChild(row)

    })

  })
}

function getTransactions()
{
  const userId = localStorage.getItem('userId')
  const table1 = document.getElementsByTagName('tbody')[0]
 table1.innerHTML = ''
  firebase.firestore().collection('transactions')
  .limitToLast(5)
  .orderBy('date','asc')
  .where('type' , '==','expense')
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
      date.innerHTML =moment(data.date.toDate()).format("dddd, MMMM Do YYYY"); 
      
      row.appendChild(type)
      row.appendChild(amount)
      row.appendChild(category)
      row.appendChild(date)
      
      table1.appendChild(row)
     
      
 

    })


  })
}






    
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {

  
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'Income',
            // backgroundColor: 'rgba(21, 67, 140,.4)',
            borderColor: 'blue',
            data: []
        },{
          label: 'Expense',
          // backgroundColor: 'rgba(21, 67, 140,.4)',
          borderColor: 'red',
          data: []
      }
        
      ]
    },
    

    // Configuration options go here
    options: {}
    
})

function getChart()


{
  const userId = localStorage.getItem('userId')
  
  firebase.firestore().collection('transactions')
  .where('type','==','income')
  
  .where('userId','==',userId)
  
  .get() 
  .then(function(snaps){

    
    snaps.forEach(function(doc){
   
        
        a = doc.data().amount
        d =  moment(doc.data().date.toDate()).format(" MMMM ")
        
       
        console.log('this--->',d)
        chart.data.datasets[0].data.push(a)
        chart.data.labels.push(d)
        
    })
    
        chart.update();
    
    

  })

  

  
  
}
function getChart1()


{
  const userId = localStorage.getItem('userId')
  
  firebase.firestore().collection('transactions')
  .orderBy('date','asc')
  .where('type','==','expense')
  .where('userId','==',userId)
  
  .get() 
  .then(function(snaps){

    
    snaps.forEach(function(doc){
   
        
        a = doc.data().amount
        d =  moment(doc.data().date.toDate()).format(" MMMM ")
        
        chart.data.datasets[1].data.push(a)
        // chart.data.labels.push(d)
    })
  
        chart.update();
    
    

  })

  

  
  
}
