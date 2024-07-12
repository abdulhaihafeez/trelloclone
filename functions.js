let UserSaveTasks = JSON.parse(localStorage.getItem("savedTasks")); // local storage me se data ko fetch kar rahe hain savedTasks ko object me convert kar rahe hain
// console.log(savedTasks);

if (!UserSaveTasks) {  
    UserSaveTasks = {}; // agr local storage me kuch bi store na ho tw empty object ko set kar do 
}

let theElementRaised = null;

const addTask = (event) => {
    event.preventDefault();

    //    console.log(event);
       const currentForm = event.target; // current form element
       const myInput = currentForm.elements[0]; // input written
       let inputValue = currentForm.elements[0].value; // value written in form's input 
       const parentElement = currentForm.parentElement; // parent of form i.e div.column

    if (!inputValue) {
        myInput.className = "addTask1"; // agr user input empty enter kary tw input ka border red ho jaega
    }else{
        myInput.className = "addTask"; // agr user input empty enter kary tw input ka border red ho jaega 
        const paragraph_Element = createElementParagraph(inputValue); // paragraph create element function call

        parentElement.insertBefore(paragraph_Element, currentForm);  // paragraph added in column before the form
        
        const h5Value = parentElement.children[0].innerText; // card ky title ka text is variable me store kiya hai 
        
        if (!Array.isArray(UserSaveTasks[h5Value])) {
            UserSaveTasks[h5Value] = []; // agar array nahi hai tw empty array set krwa do because undefined me .push nho ho sakta error ayega 
        }
        
        UserSaveTasks[h5Value].push(inputValue);
        localStorage.setItem("savedTasks", JSON.stringify(UserSaveTasks)); // local storage me data ko save kara hai
        
        currentForm.reset(); // clearing form
    }
}


const handleDragOver = (event) => {
    event.preventDefault();
        console.log('DragOver', event.target);
    if (event.target.className === "column") {
        event.target.classList.add("column_dropAble");
    }
};


const HandleDragLeave = (event) => {
    event.preventDefault();
    // console.log('dragLeave', event.target);
    if (event.target.className.includes("column")) {
        event.target.classList.remove("column_dropAble");
    }
};


const HandleDrop = (event) => {
    let DropTicketInColumn = event.target; // jis element par drop kiya ja raha ho
    let form = DropTicketInColumn.lastElementChild;

        const condition1 = DropTicketInColumn.className.includes("column");
        const condition2 = DropTicketInColumn.className.includes("columnTitle");
        const condition3 = DropTicketInColumn.className.includes("taskTicket");
        const condition4 = DropTicketInColumn.className.includes("addTask");

        // jis task ko hum drap & drop krwa rahe hain jis column me drop krwaenga wo local storage me bi ussi column me save ho rahe hain 
        function localStorageSave(){
            const movedFrom = theElementRaised.parentElement.firstChild.innerText;

            // after shifting the ticket we will update local-storage as well 
            const movedTo = theElementRaised.parentElement.firstChild.innerText;
            // console.log(`MovedFrom ${movedFrom} to MovedTo ${movedTo}`);
            
            UserSaveTasks[movedFrom] = UserSaveTasks[movedFrom].filter(
                (task) => task !== theElementRaised.innerText
              );
            !Array.isArray(UserSaveTasks[movedTo]) ? (UserSaveTasks[movedTo] === theElementRaised.innerText) : UserSaveTasks[movedTo].push(theElementRaised.innerText);
            
            localStorage.setItem("savedTasks", JSON.stringify(UserSaveTasks));

        }

        if (condition1) {
            DropTicketInColumn.insertBefore(theElementRaised, form);
            localStorageSave(); // function call
        }

        if (condition2) {
            DropTicketInColumn.insertBefore(theElementRaised, form);
            localStorageSave(); // function call
        }

        if (condition3) {
            DropTicketInColumn.parentElement.insertBefore(theElementRaised, form);
            localStorageSave(); // function call
        }

        if (condition4) {
            DropTicketInColumn.parentElement.parentElement.insertBefore(theElementRaised, form);
            localStorageSave(); // function call
        }
};
export const createCard = (cardsTitle) => {

    // <div class="column">
    //     <h5>Work Todo <i class="fa-solid fa-xmark"></i></h5>
    //      <p>task 1</p>
    //         <p>task 2 <i class="fa-solid fa-trash"></i></p>
    //         <p>task 3</p> 
    //     <form>
    //       <input type="text" placeholder="add task" class="add_task" />
    //     </form>
    //   </div>

    const myDiv = document.createElement("div")
    myDiv.setAttribute("class", "column");
    // console.log(myDiv);

    const h6 = document.createElement("h6");
    h6.setAttribute("class","columnTitle");
    const h6Text = document.createTextNode(cardsTitle);

    const XMarkIcon = document.createElement("i");
    XMarkIcon.classList.add("fa-solid");
    XMarkIcon.classList.add("fa-xmark");
    XMarkIcon.classList.add("removeCard")

    const myForm = document.createElement("form");

    const myInput = document.createElement("input");
    myInput.setAttribute("type","text");
    myInput.setAttribute("placeholder","add task");
    myInput.setAttribute("class","addTask");

    h6.appendChild(h6Text);
    h6.appendChild(XMarkIcon);
    myDiv.appendChild(h6);
    myForm.appendChild(myInput);
    myDiv.appendChild(myForm);

    myDiv.addEventListener("dragover", handleDragOver);
    myDiv.addEventListener("dragleave", HandleDragLeave);
    myDiv.addEventListener("drop", HandleDrop)

    myForm.addEventListener("submit", addTask);

    return myDiv;
    
}


/* create elements in javascript */
export const createElementParagraph = (inputValue) => {
    const paragraph_Element = document.createElement("p");
    paragraph_Element.setAttribute("class", "taskTicket")
    const paragraph_Text = document.createTextNode(inputValue);
    paragraph_Element.appendChild(paragraph_Text);
    paragraph_Element.setAttribute("draggable", "true")

    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa-solid');
    trashIcon.classList.add("fa-trash");
    trashIcon.classList.add('remove_Element');
    paragraph_Element.appendChild(trashIcon);

    paragraph_Element.addEventListener("mousedown", (event) => {
        theElementRaised = event.target; // wo element jo utha hoa hai
    })

    return paragraph_Element;
}