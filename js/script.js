
var sampleRecord = { id: -1, reminderNote: "Sample note", remindingTime: getRespectiveDate(), isSent: false };

if (localStorage.getItem("localDb") === null) {
    var localDb = [];
    localStorage.setItem("localDb", JSON.stringify(localDb));
}


function createNewTask() {
    let newTaskText = document.getElementById("newTaskText").value;
    let whenTime = document.getElementById("whenTime").value;
    let localDb = localStorage.getItem('localDb');

    localDb = JSON.parse(localDb);
    totalRecords = localDb.length;



    let capturedTs = new Date(whenTime).getTime();
    let currentTs = new Date().getTime()

    if (capturedTs > currentTs) {
        const task = Object.create(sampleRecord)
        task.id = totalRecords + 1;
        task.reminderNote = newTaskText;
        task.remindingTime = whenTime;
        task.isSent = false;
        localDb.push(task);
        localStorage.setItem("localDb", JSON.stringify(localDb));
        alert("Created!")
        fillScheduled();

    }
    else {
        alert("Can't create a reminder in the past!")
    }

}

function getRespectiveDate(type) {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    if (type === "today") {
        today.setHours(today.getHours() + 1);
    }
    else if (type == undefined) {

    }
    else {
        today.setDate(today.getDate() + 1);
    }
    day = today.getDate();
    month = today.getMonth();
    year = today.getFullYear();
    hours = today.getHours();
    minutes = today.getMinutes();
    return today.toISOString().slice(0, -8)//`${year}-${month}-${day}T${hours}:${minutes}`
}



var todayBtn = document.getElementById("todayBtn");
var tomBtn = document.getElementById("tomBtn");
var createBtn = document.getElementById("createBtn");

if( todayBtn!==null) { 
todayBtn.addEventListener("click", function () {
    document.getElementById("whenTime").value = getRespectiveDate("today");
    document.getElementById("whenTime").select()
});

tomBtn.addEventListener("click", function () {
    document.getElementById("whenTime").value = getRespectiveDate("_");
    document.getElementById("whenTime").select()
});

createBtn.addEventListener("click", function () {
    createNewTask();
});
}

function fillScheduled() {

    var tableTarget  = document.getElementsByClassName('sch-records')[0];
    var preparedRecord  = document.getElementsByClassName('sch-tr')[0];
    if(tableTarget!==undefined){ 
    var localDb = localStorage.getItem('localDb');

    localDb =  JSON.parse(localDb);
    tableTarget.children[1].innerHTML="";
    localDb.forEach(item => {
        if(item.isSent ===false ) { 
        let newRec = preparedRecord.cloneNode(true);
        newRec.children[0].innerHTML=item.id;
        newRec.children[1].innerHTML=item.reminderNote;
        newRec.children[2].innerHTML=new Date(item.remindingTime).toLocaleString();
        
        tableTarget.children[1].append(newRec)}

    });
    }


}
function fillCompletedTasks() {
    var tableTarget  = document.getElementsByClassName('cmp-records')[0];
    var preparedRecord  = document.getElementsByClassName('cmp-tr')[0];
    if(tableTarget!==undefined){ 
        var localDb = localStorage.getItem('localDb');

        localDb =  JSON.parse(localDb);
        tableTarget.children[1].innerHTML="";
    
        localDb.forEach(item => {
            if(item.isSent ===true ) { 
            let newRec = preparedRecord.cloneNode(true);
            newRec.children[0].innerHTML=item.id;
            newRec.children[1].innerHTML=item.reminderNote;
            newRec.children[2].innerHTML=new Date(item.remindingTime).toLocaleString();
            
            tableTarget.children[1].append(newRec)}
    
        });
    }
    

}


function sendReminder(){

    
}

function validateTimers(){
    var localDb = localStorage.getItem('localDb');

    localDb =  JSON.parse(localDb);

    
    const currentTs = new Date().getTime()


    localDb.forEach(item => {
        var capturedTs = new Date(item.remindingTime).getTime();
        if (capturedTs < currentTs) {
            item.isSent=true;

        }


    });

    localStorage.setItem("localDb", JSON.stringify(localDb));
   
}

setInterval(fillCompletedTasks, 1000);
setInterval(fillScheduled, 1000);
setInterval(validateTimers, 1000);