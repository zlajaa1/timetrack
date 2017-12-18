var State = function(){
    this.tasks    = [];
    this.elStart  = document.getElementById('btnStart');
    this.elFinish = document.getElementById('btnFinish');
    this.elClose  = document.getElementById('btnClose');
    this.elAdd    = document.getElementById('btnAdd');
    this.list     = document.getElementById('taskList');
    this.input    = document.getElementById('input');

    var startDay = function(){
        //Dodaj u view
        this.writeList('Happy coding')
        //Dodaj u listu i storage
        this.updateTasks('Happy coding');
        //pokreni tajmer
        this.startTimer();
        //zameni dugmice
        this.elStart.classList.remove('visible');
        this.elFinish.classList.add('visible');
    };

    var endDay = function(){
        // open new window with counted times
    };

    var addTask = function(){
        this.input.classList.add('visible');
        this.input.focus();
    };

    var keyUp = function(e){
        if( e.keyCode === 13 ){
            this.writeList(this.input.value);
            this.updateTasks(this.input.value);
            this.input.classList.remove('visible');
            this.input.value = '';
            this.input.blur();
        }
    };

    var blurInput = function(){
        this.input.classList.remove('visible');
        this.input.value = '';
        this.input.blur();
    };

    //Assign listeners
    this.elStart.addEventListener('click', startDay.bind(this));
    this.elFinish.addEventListener('click', endDay.bind(this));
    this.elAdd.addEventListener('click', addTask.bind(this));
    this.input.addEventListener('keyup', keyUp.bind(this));
    this.input.addEventListener('blur', blurInput.bind(this));
    
};

// State init
State.prototype.init = function(){
    // 1. read from local storage if there is no create 'track' storage
    if( localStorage.getItem('track') === null){
        localStorage.setItem('track', this.tasks);
        //Show start btn
        this.elStart.classList.add('visible');
    }else{
        this.elFinish.classList.add('visible');
        var ls = JSON.parse(localStorage.getItem('track'));
        for(i=0; i<ls.length; i++){
            this.tasks.push({
              task: ls[i].task,
              time: ls[i].time
            });
            this.writeList(ls[i].task, ls[i].time);
          }
    }
};

// Timer
State.prototype.timer = function(timerTask){
    var startTimer = function(){
        setInterval(start, 1000);
    }
    var stopTimer = function(){
        clearInterval(startTimer);
    };
}

// Update list
State.prototype.writeList = function(text){
    var li = document.createElement('LI');
    li.innerHTML = '<span class="date">'+this.date() +'</span><span class="task">'+ text + '</span><span class="tracking"></span><span class="progress"></span>';
    this.list.appendChild(li);
}

// Date method
State.prototype.date = function(){
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if( minutes.toString().length < 2){
      minutes = '0' + minutes;
    }
    return hours + ':' + minutes;
};

// Update tasks
State.prototype.updateTasks = function(text){
    this.tasks.push({task: text, time: this.date()});
    localStorage.setItem('track', JSON.stringify(this.tasks));
};

//Init test
window.addEventListener('load', function(){
    var state = new State();
    state.init();
    console.log(state)
});
