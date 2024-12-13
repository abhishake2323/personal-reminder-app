
var sampleRecord = { id: -1, reminderNote: "Sample note", remindingTime: getRespectiveDate(), isSent: false, isDismissed: false };

if (localStorage.getItem("localDb") === null) {
    var localDb = [];
    localStorage.setItem("localDb", JSON.stringify(localDb));
}


function createNewTask() {
    let newTaskText = document.getElementById("newTaskText").value;
    let whenTime = document.getElementById("whenTime").value;

    if( newTaskText.length <=2 || whenTime.length===0){
        alert("Please fill both Notes and time before saving.")
    }

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
        task.isDismissed = false;
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

if (todayBtn !== null) {
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



    document.addEventListener("keyup", function (event) {
        if (event.key  === 13) {
            createNewTask();
        }
    });
}

function fillScheduled() {

    var tableTarget = document.getElementsByClassName('sch-records')[0];
    var preparedRecord = document.getElementsByClassName('sch-tr')[0];
    if (tableTarget !== undefined) {
        var localDb = localStorage.getItem('localDb');

        localDb = JSON.parse(localDb);

        tableTarget.children[1].innerHTML = "";

        localDb.forEach(item => {
            if (item.isSent === false) {
                let newRec = preparedRecord.cloneNode(true);
                newRec.children[3].classList.remove("d-none")
                newRec.children[0].innerHTML = item.id;
                newRec.children[1].innerHTML = item.reminderNote;
                newRec.children[2].innerHTML = new Date(item.remindingTime).toLocaleString();

                tableTarget.children[1].append(newRec)
            }

        });
    }


}
function fillCompletedTasks() {
    var tableTarget = document.getElementsByClassName('cmp-records')[0];
    var preparedRecord = document.getElementsByClassName('cmp-tr')[0];
    if (tableTarget !== undefined) {
        var localDb = localStorage.getItem('localDb');

        localDb = JSON.parse(localDb);
        tableTarget.children[1].innerHTML = "";

        localDb.forEach(item => {
            if (item.isSent === true) {
                let newRec = preparedRecord.cloneNode(true);
                newRec.children[0].innerHTML = item.id;
                newRec.children[1].innerHTML = item.reminderNote;
                newRec.children[2].innerHTML = new Date(item.remindingTime).toLocaleString();

                tableTarget.children[1].append(newRec)
            }

        });
    }


}


function getUpcomingRecord() {
    var localDb = localStorage.getItem('localDb');

    localDb = JSON.parse(localDb);

    return localDb.filter((x) => x.isSent === false && x.isDismissed == false)

}

function validateTimers() {
    var localDb = localStorage.getItem('localDb');

    localDb = JSON.parse(localDb);


    const currentTs = new Date().getTime()


    localDb.forEach(item => {
        var capturedTs = new Date(item.remindingTime).getTime();
        if (capturedTs < currentTs) {
            item.isSent = true;

        }


    });

    localDb.sort((a, b) => new Date(a.remindingTime).getTime() - new Date(b.remindingTime).getTime());

    localStorage.setItem("localDb", JSON.stringify(localDb));

}




 function checkTimeAndSendNotif( ) {

    var currentTs = new Date().getTime();  
    var latestRecord = getUpcomingRecord()
    if (latestRecord.length>0){
        latestRecord =latestRecord[0]
    

    var timeLeft = new Date(latestRecord.remindingTime).getTime() - currentTs;
   
    // console.s(timeLeft/1000/60);

    if (timeLeft>=0 && timeLeft <=1000 ) {
        if (confirm(latestRecord.reminderNote)) {
              playafterAsecond();
            alert("Notification dismissed");
            console.log("Notif sent")
    
        }
    }
}
;

}

// // setTimeout(sendNotifcation,timeLeft,latestRecord)
setInterval(checkTimeAndSendNotif,500);
setInterval(fillCompletedTasks, 1000, false);
setInterval(fillScheduled, 1000, false);
setInterval(validateTimers, 1000);
 

 

snoozeBtns = document.querySelectorAll(".sch-snooze > button")

document.querySelectorAll(".sch-snooze > button")[0].parentElement.parentElement
 
// function playafterAsecond(){
       
//     var source = "/audio/mixkit-access-allowed-tone-2869.wav"
//     var audio = new Audio();
//     // no event listener needed here
//     audio.src = source;
//     audio.autoplay = true;
//           return audio

        
// }
 