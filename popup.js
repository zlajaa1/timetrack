//GLOBALS
var date = new Date();
var wrapper = document.getElementsByClassName('wrapper');
var input = document.getElementById('input');
var list = document.getElementById('loged-list');
var btn = document.getElementById('submitItem');
var finishBtn = document.getElementById('finish');
var started = false;
var trackArray = [];

// Update task array and local storage
var pushTask = function(task, time){
  var obj = {
    'task': task,
    'time': time
  }
  trackArray.push(obj);
  localStorage.setItem('track', JSON.stringify(trackArray));
}

// Write into list
var writeList = function(text, time){
  var li = document.createElement('LI');
  li.innerHTML = time +' '+ text;
  list.appendChild(li);
}

// Get and parse time
var time = function(){
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if( minutes.toString().length < 2){
    minutes = '0' + minutes;
  }
  return hours + ':' + minutes;
}

// Handle adding event
btn.addEventListener('click', function(){
  if(!started){
    input.style.display = 'inline-block';
    this.innerText = 'Add new';
    this.classList.add('small');
    started = true;
    finishBtn.style.display = 'block';
    wrapper[0].classList.add('started');
    pushTask('Arive', time());
    writeList('Rock star is hot!!!', time());
    
  }else{
    writeList(input.value, time());
    pushTask(input.value, time());
  }
});

finishBtn.addEventListener('click', function(){
  writeList('Beer time!!!', time());
  myWindow=window.open('','','width=400,height=700');
  myWindow.document.write(
      "<p style='text-align: center; font-size: 20px;'>Workday done hero, get some beer!!!</p>" + 
      "<ol>" +list.innerHTML+"</ol>");
  list.remove();
  localStorage.removeItem('track');
});

window.addEventListener('load', function(){
  var storageState = localStorage.getItem('track');
  pStorage = JSON.parse(storageState);
  if(pStorage){
    input.style.display = 'inline-block';
    btn.innerText = 'Add new';
    btn.classList.add('small');
    wrapper[0].classList.add('started');
    finishBtn.style.display = 'block';
    started = true;
    
    for(i=0; i<pStorage.length; i++){
      trackArray.push({
        task: pStorage[i].task,
        time: pStorage[i].time
      });
      writeList(pStorage[i].task, pStorage[i].time);
    }
  }
})
