import { createCard, createElementParagraph } from "./functions.js";

// const columns = document.querySelector(".column");
const main = document.querySelector("#main");
const addCard = document.querySelector(".myInput");


let UserSaveTasks = JSON.parse(localStorage.getItem("savedTasks")); // local storage me se data ko fetch kar rahe hain savedTasks ko object me convert kar rahe hain
// console.log(UserSaveTasks);

if (!UserSaveTasks) {  
    UserSaveTasks = {}; // agr local storage me kuch bi store na ho tw empty object ko set kar do 
}


/* page referesh karny par value apni jaga par rahengi */
for (const myKey in UserSaveTasks) { // local storage se data ko display krwany ky liye forin loop ka use kiya

    const card_div = createCard(myKey); // jo div create ki thi usko ak variable me store krwaya hai
    const arrayOfTask = UserSaveTasks[myKey]; // local storage me se object ki value ko variable me store krawaya hai 

    for (let i = 0; i < arrayOfTask.length; i++) {
       const p = createElementParagraph(arrayOfTask[i]); // jo paragraph create kiya tha uss paragraph ke ander localStorage ki values ko rakh dia
       card_div.insertBefore(p, card_div.lastElementChild) // uss paragraph ko from se pehla print karwaya hai
    }

    main.insertBefore(card_div, addCard); // card ko button se pehle print krwa dia 
}


addCard.addEventListener("submit", (event) => {  // jb card par click ho 
    event.preventDefault();
    const currentForm = event.target;
    const User_cardTitle = event.target.elements[0].value; // User jo input me title enter karega wo card title hoga 

    if (!User_cardTitle) return ; // agr prompt user empty enter kary tw card nhi hoga
    const yourDiv = createCard(User_cardTitle); // jo div create ki thi usky ander user jo title input karega wo div ka title hoga
    UserSaveTasks[User_cardTitle] = [];
    localStorage.setItem("savedTasks", JSON.stringify(UserSaveTasks));
    
    main.insertBefore(yourDiv, addCard)  // card ko button se pehle print krwa dia 
    currentForm.reset();
})




/* Remove Column for user Xmark Button use */
const RemoveCard = document.querySelectorAll(".removeCard");
RemoveCard.forEach((cardRemove) => {
    cardRemove.addEventListener("click", (event) => {
          event.target.parentElement.parentElement.remove();
       
    })
})


/* remove paragraph Element for user delete button use */

let removeTask = document.querySelectorAll(".remove_Element");
removeTask.forEach((i) => {
    // console.log('i', i);
    i.addEventListener("click", (event) => {

       let storedObjects = JSON.parse(localStorage.getItem("savedTasks"));

       let objPropertyText = event.target.parentElement.innerText;
       let currentTask =  event.target.parentElement.remove();

       delete storedObjects[objPropertyText].currentTask;

       localStorage.setItem("savedTasks", JSON.stringify(storedObjects));

    
    })
 })


 

