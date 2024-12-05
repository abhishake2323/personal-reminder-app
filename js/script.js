
const sampleRecord = {id:-1,reminderNote:"Sample note",remindingTime: getRespectiveDate(),isSent:false};

if(localStorage.getItem("localDb")===null){ 
    var localDb= [  ];
    localStorage.setItem("localDb",JSON.stringify(localDb));
}


function createNewTask() {
    let newTaskText = document.getElementById("newTaskText").value;
    let whenTime = document.getElementById("whenTime").value;
    let localDb = localStorage.getItem('localDb');

    localDb = JSON.parse(localDb);
    totalRecords =localDb.length;

    const task = Object.create(sampleRecord)
    task.id = totalRecords+1;
    task.reminderNote = newTaskText;
    task.remindingTime = whenTime;
    task.isSent=false;
    localDb.push(task);
    localStorage.setItem("localDb",JSON.stringify(localDb));
    alert("Created!")

}

function getRespectiveDate(type) {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    if (type === "today") {
        today.setHours(today.getHours() + 1);
    }
    else if( type==undefined) {
          
    }
    else{
        today.setDate(today.getDate() + 1);
    }
    day = today.getDate();
    month = today.getMonth();
    year = today.getFullYear();
    hours = today.getHours();
    minutes = today.getMinutes();
    return today.toISOString().slice(0, -8)//`${year}-${month}-${day}T${hours}:${minutes}`
}



const todayBtn = document.getElementById("todayBtn");
const tomBtn = document.getElementById("tomBtn");
const createBtn = document.getElementById("createBtn");


todayBtn.addEventListener("click", function () {
    document.getElementById("whenTime").value = getRespectiveDate("today");
    document.getElementById("whenTime").select()
});

tomBtn.addEventListener("click", function () {
    document.getElementById("whenTime").value = getRespectiveDate("_");
    document.getElementById("whenTime").select()
});

createBtn.addEventListener("click", function(){
    createNewTask();
});


function fillUpcomingTasks(){

    
}
function fillCompletedTasks(){
let localDb = localStorage.getItem('localDb');
localDb = []//JSON.parse(localDb);

localDb.forEach(element => {
    
});

    
}