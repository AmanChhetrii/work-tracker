let input = document.getElementById("form")
let cancel = document.getElementById("cancel")
let new_note = document.getElementById("new_note")
let task_added = document.getElementById("task_added")
let add_task = document.getElementById("add_task")
let Non_empty = document.getElementById("Non_empty")
let taskDone = document.getElementById("taskDone")

const gifFiles = [
    "task done gifs/baby-scream-yeah-ezgif.com-video-to-gif-converter.gif",
    // "task done gifs/bro-hai.gif",
    "task done gifs/carry-minati-ajey-nagar-ezgif.com-video-to-gif-converter.gif",
    "task done gifs/feeling-proud-akhandanand-tripathi-ezgif.com-video-to-gif-converter.gif",
    "task done gifs/jetha-dance-ezgif.com-video-to-gif-converter.gif",
    "task done gifs/leonardo-dicaprio-clapping-ezgif.com-video-to-gif-converter.gif",
    "task done gifs/nouns-dao-ezgif.com-video-to-gif-converter.gif",
    "task done gifs/loki-clapping-ezgif.com-video-to-gif-converter.gif",
    "task done gifs/shabaash-titu-mama-ezgif.com-video-to-gif-converter.gif",
    "task done gifs/tom-and-jerry-jerry-mouse-ezgif.com-video-to-gif-converter.gif",
    "task done gifs/waah-amir-ezgif.com-video-to-gif-converter.gif"
];
const allTasksdone="task done gifs/sgn-we-did-it-ezgif.com-video-to-gif-converter.gif";
//function for gifs
function taskGifs() {
    let random=Math.random()*10;
    random=Math.floor(random);
    taskDone.parentElement.style.display="flex"
    taskDone.innerHTML=`<img src="${gifFiles[random]}" alt="Your GIF Description" height="500px" width="500px">`;  
}

//this array will store keys of items which we are displaying at the time of adding 
let dynamicallyStored=[];
//this key will store key of last entered item +1 (i.e. key at which next element will be present )

var key;
var remTasks=0;
//setting key=0 and item = key of last entered item +1
//key=-1 stores no of tasks remaining
if (localStorage.getItem(0)==null) {
    localStorage.setItem(0,1);
    localStorage.setItem(-1,0);
}
//-1 index pe remaining tasks ki value padi hai no matter what the condition is 
remTasks=localStorage.getItem(-1);



document.getElementById("add_item").addEventListener("click", function () {
    this.classList.add("clicked");
    //resizing the textarea everytime(even if page is not reloaded)
    new_note.value = ""
    resizeTextarea()
    setTimeout(() => {
        input.style.display = "flex";
        this.classList.remove("clicked");
        //this will put cursir automatically in text area
        new_note.focus();
    }, 400);
});

//to add value to an index
function addTaskToPage(index,value){
    document.getElementById("Empty_todo").style.display="none"
            document.getElementById("Non_empty").innerHTML+=
            `<p class=" ${index} p-3 my-3 bg-gray-700 rounded-lg lg:rounded-xl shadow-sm lg:shadow-md flex items-center"><input type="radio" class="custom-radio mx-2" id="${index}">
            <label for="${index}" class="ml-2">${value}</label>
        </p>`
        // `<p class="p-3 my-3 bg-gray-700 rounded-lg shadow-sm lg:shadow-md flex items-center">
        //      <input type="radio" class="w-6 h-6 text-blue-600 bg-gray-100 border-gray-800 focus:ring-gray-700 dark:focus:ring-red-900 dark:ring-offset-gray-800 focus:ring-8 rounded-full dark:bg-gray-700 dark:border-gray-600 border-8" id="${index}">
        //      <label for="${index}" class="ml-2">${value}</label>
        //  </p>
        //  `
        }

//submit form function 
function submitForm(){
    
        input.style.display = "none";
        task_added.style.display = "flex";
        add_task.classList.remove("clicked");
        task_added.classList.remove("hidden")
        //add task
        key=localStorage.getItem(0);
        remTasks=localStorage.getItem(-1);
        localStorage.setItem(key++,new_note.value )
        localStorage.setItem(0,key)
        localStorage.setItem(-1,++remTasks)
        addTaskToPage(key-1,new_note.value)
        dynamicallyStored.push(key-1);
   
}

//can use async await with place of set timeout 
add_task.addEventListener("click", function () {
    this.classList.add("clicked");
    if (new_note.value == "") {
        setTimeout(() => {
            document.getElementById("alert_notification_sound").play();
            alert("Please enter something..!!")
            this.classList.remove("clicked");
        }, 100);
    } else {
        setTimeout(() => {
            submitForm();
            document.getElementById("notification_sound").play();
        }, 500);
    }
});

// Add keydown event listener to the textarea
new_note.addEventListener("keydown", function (event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default behavior (adding a newline)
        if (new_note.value == "") {
            setTimeout(() => {
                document.getElementById("alert_notification_sound").play();
                alert("Please enter something..!!")
            }, 100);
        }
        else{
            setTimeout(() => {
                submitForm();
            document.getElementById("notification_sound").play();
            }, 500);
        }
    }
});

task_added.addEventListener("click", function () {
    this.classList.add("hidden");
    //remember to remove this class in add button on click
    setTimeout(() => {
        task_added.style.display = "none";
    }, 200);

});
cancel.addEventListener("click", function () {
    this.classList.add("cancel");
    setTimeout(() => {
        input.style.display = "none";
        this.classList.remove("cancel");
    }, 400);
});

//  const 
// document.body.addEventListener("click",function () {
//     task_added.style.display="none"
// })
//get dynamic textarea height
function resizeTextarea() {
    const textarea = document.getElementById("new_note");
    textarea.style.height = "53px";
    // Reset height to auto to calculate the actual scroll height
    textarea.style.height = textarea.scrollHeight == "0" ? "53px" : (textarea.scrollHeight) + "px"; // Set the height to the calculated scroll height

}

//idea
// local storage me 0 key pe last key ka index=1 store kara lo (initially 1)
//uske bad jab bhi input lo index++ pe value store karalo
// jab sab tasks clear ho jaye local storage ko clear krdo or 0 pe value 1 daal do 

//adding tasks to remaining tasks
// if(remTasks!=0) {
    for (let index = 1; index < localStorage.getItem(0); index++) {
        if (localStorage.getItem(index)!=null) {
            
            addTaskToPage(index,localStorage.getItem(index));
            // addTaskToPage(index,"Hello");
        }
    }

//logic for removing tasks/ task completion 

// JavaScript code to handle radio inputs with custom-radio class

//func to add value in completed tasks
function addTaskToCompleted(index){

            document.getElementById("Completed_tasks_outer").style.display="block";
            document.getElementById("CompletedTasks").innerHTML+=
            `<p class=" ${index} p-3 my-3 lg:px-8 sm:px-6 px-5 bg-gray-700 rounded-lg lg:rounded-xl shadow-sm lg:shadow-md flex items-center">
            ${localStorage.getItem(index)}
        </p>`}

        // document.addEventListener("DOMContentLoaded", function () {
        //     // Attach change event listener to the document and delegate it to '.custom-radio'
        //     document.addEventListener("change", function (event) {
        //         var target = event.target;
        
        //         // Check if the changed element has the 'custom-radio' class
        //         if (target.classList.contains("custom-radio")) {
        //             //adding fading efffect on parent node 
        //             var parentNode = target.parentElement;
        //             parentNode.classList+="fadeout";
        //             // Execute logic for handling the change event
        //             setTimeout(() => {
        //                 var parentNode = target.parentNode;
        //                 var radioID = target.id;
        //                 parentNode.style.display = "none";
        
        //                 // Add to completed tasks and delete its key
        //                 addTaskToCompleted(radioID);
        //                 localStorage.removeItem(radioID);
        
        //                 var noNotes = localStorage.getItem(-1);
        //                 localStorage.setItem(-1, noNotes - 1);
        //                 if (noNotes - 1 === 0) {
        //                     localStorage.setItem(0, 1);
        //                     taskDone.innerHTML=`<img src="${allTasksdone}" alt="Your GIF Description" height="500px" width="500px">`; 
        //                     // taskDone.parentElement.classList+="gifFadeOut"
        //                 }
        //                 else{
        //                     taskGifs();
        //                     // taskDone.parentElement.classList+="gifFadeOut"
        //                 }
        //                 taskDone.parentElement.style.display="flex"
        //                 document.getElementById("clickSound").play();
        //             }, 500);
        //             setTimeout(() => {
        //                 taskDone.parentElement.style.display="none"
        //                 if (localStorage.getItem(-1)==0) {
        //                    document.getElementById("Empty_todo").style.display="flex"
    
        //                 }
        //             }, 3000);
        //         }
        //     });
        // });

        document.addEventListener("DOMContentLoaded", function () {
            // Attach change event listener to the document and delegate it to '.custom-radio'
            document.addEventListener("change", function (event) {
                var target = event.target;
        
                // Check if the changed element has the 'custom-radio' class
                if (target.classList.contains("custom-radio")) {
                    // Execute logic for handling the change event
                    setTimeout(() => {
                        var parentNode = target.parentNode;
                        var radioID = target.id;
        
                        // Add the fadeout class to the parent node
                        parentNode.classList.add("fadeout");
        
                        // Add 'animationend' event listener to remove the element after the animation ends
                        parentNode.addEventListener("animationend", function () {
                            parentNode.style.display = "none";
        
                            // Add to completed tasks and delete its key
                            addTaskToCompleted(radioID);
                            localStorage.removeItem(radioID);
        
                            var noNotes = localStorage.getItem(-1);
                            localStorage.setItem(-1, noNotes - 1);
                            if (noNotes - 1 === 0) {
                                localStorage.setItem(0, 1);
                                taskDone.innerHTML = `<img src="${allTasksdone}" alt="Your GIF Description" height="500px" width="500px">`;
                                taskDone.parentElement.classList += "gifFadeOut";
                            } else {
                                taskGifs();
                                taskDone.parentElement.classList += "gifFadeOut";
                            }
                            taskDone.parentElement.style.display = "flex";
                            document.getElementById("clickSound").play();
                        });
                    }, 500);
                    setTimeout(() => {
                        taskDone.parentElement.style.display = "none";
                        if (localStorage.getItem(-1) == 0) {
                            document.getElementById("Empty_todo").style.display = "flex";
                        }
                    }, 3000);
                }
            });
        });
        

        // Function to play the sound effect
    // function playClickSound() {
    //     var clickSound = ;
    //     clickSound.play();
    // }

        // document.addEventListener("DOMContentLoaded", function () {
        //     // Attach change event listener to the document and delegate it to '.custom-radio'
        //     document.addEventListener("change", function (event) {
        //         var target = event.target;
        
        //         // Check if the changed element has the 'custom-radio' class
        //         if (target.classList.contains("custom-radio")) {
        //             // Execute logic for handling the change event
        //             setTimeout(() => {
        //                 var parentNode = target.parentNode;
        //                 var radioID = target.id;
        //                 parentNode.classList.add("gifFadeOut");
        
        //                 // Add 'animationend' event listener
        //                 parentNode.addEventListener("animationend", function () {
        //                     // Remove the element after the animation ends
        //                     parentNode.style.display = "none";
        
        //                     // Add to completed tasks and delete its key
        //                     addTaskToCompleted(radioID);
        //                     localStorage.removeItem(radioID);
        
        //                     var noNotes = localStorage.getItem(-1);
        //                     localStorage.setItem(-1, noNotes - 1);
        //                     if (noNotes - 1 === 0) {
        //                         localStorage.setItem(0, 1);
        //                         taskDone.parentElement.style.display = "flex";
        //                         taskDone.innerHTML = `<img src="${allTasksdone}" alt="Your GIF Description" height="500px" width="500px">`;
        //                     } else {
        //                         taskGifs();
        //                         taskDone.parentElement.style.display = "none";
        //                     }
        //                 });
        //             }, 500);
        //         }
        //     });
        // });
        


        //1.remove alert
        //2.add credits 
        //3.About us 