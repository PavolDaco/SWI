///  zdroj kodu: https://jsfiddle.net/makzan/ZpZFE/
// vymyzavanie zo Storage je robene vlstnou tvorbou
function appendTaskToList(val) {  // funkcia na pridavanie ulohy do list-u uloh
    $('#todolist').append("<li>" + val + "  <button class='done-btn' id='done-btn'>Hotovo</button>  <button class='cancel-btn w3-btn w3-red w3-text-shadow' id='cancel-btn'>Zrušiť</button></li>");
}                                                                                      
                    
if (localStorage['tasks']) {   // ak localStorage ma 'tasks'
    var tasks = JSON.parse(localStorage.getItem('tasks'));  // vloz tasks zo Sotrage do tasks
}
else {  // ak localStorage NEma 'tasks'
    var tasks = [];   // pole tasks je prazdne
}

for(var i = 0; i < tasks.length; i++ ) {   
    appendTaskToList(tasks[i]);    // pridaj do listu vsetky ulohy z pola tasks
}

var addTask = function(){
    var val = $('#name').val();  // ziskaj hodnotu z #name input-u
    tasks.push(val);  // pridaj ulohu do pola tasks
    
    localStorage.setItem("tasks", JSON.stringify(tasks)); // uloz do Storage

    appendTaskToList(val);    // pridaj ulohu do listu uloh
    $('#name').val("").focus(); // vymaz input policko
}

$('#add-btn').click(addTask);   // ak sa klikne button Pridaj
$('#name').keyup(function(e){   // ak sa prestane pisat
    if (e.keyCode === 13) {    // 13 = Enter
        addTask();
    }
});
   
$('body').on('click', '.done-btn', function() {  // ak kliknute na done
  $(this).parent('li').addClass('done');    // pridaj do Classy ...done
});    

$(document).delegate('.cancel-btn', 'click', function() {    // vymazanie z obrazovky aj zo Storage  
    $(this).parent('li').fadeOut();                     // vymaz z obrazovky
    var nameOfTask =  $(this).parent('li').clone().children().remove().end().text().trim();  // zisti "meno" rusenej ulohy
    var index = tasks.indexOf(nameOfTask.toString());       // zisti index ulohy
    tasks.splice(index,1);                              // vymaz z pola tasks (uloh)
    localStorage["tasks"] = JSON.stringify(tasks);      // uloz do Storage
});    