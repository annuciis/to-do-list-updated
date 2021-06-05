const add_button = document.getElementById("add-button");
const ul = document.getElementById("to-do");

//function to know, how many days are from the creating date or "Today", if it is created today
const daysFromToday = (date1, date2) => {

    if((date1.getUTCFullYear() == date2.getUTCFullYear()) && (date1.getUTCDate() == date2.getUTCDate()) && ((date1.getUTCMonth() + 1) == (date2.getUTCMonth() + 1))){ return "Šodien" }
    let ndays;
    let tv1 = date1.valueOf(); 
    let tv2 = date2.valueOf();
  
    ndays = (tv2 - tv1) / 1000 / 86400;
    ndays = Math.round(ndays - 0.5);

    return "Pirms" + ndays + "dienām";
}



//when user clicks on button to add new toDo element
add_button.addEventListener("click", () => {

    //creating the elements
    let li = document.createElement("li");
    let title_text_to_add = document.getElementById("title-new").value;
    let description_text_to_add = document.getElementById("description-new").value;
    let checkBox = document.createElement("input");
    let label1 = document.createElement("label");
    let label2 = document.createElement("label");
    let date_label = document.createElement("label");
    let editButton = document.createElement("button");



    
    //if description and title are filled or just title, then this happens
    if((title_text_to_add !== "" && description_text_to_add !== "") || (title_text_to_add !== "")) {

        let dateOfAdding = new Date();

        //defining the element properties
        li.className = "li-item"
        checkBox.type = "checkBox";
        checkBox.className ="checkbox-todo"
        editButton.innerText = "Labot";
        editButton.className = "edit-btn-todo btn btn-sm btn-secondary";
        editButton.dataset.target = "#editData";
        editButton.dataset.toggle = "modal";
        editButton.setAttribute('id','edit-button');


        //functions for Edit window
        const  editWindow=(evt)=> {
            //to save the current text for each toDo element
            document.getElementById("title-edit").value = label1.innerText;
            let savedTitle = label1.innerText;
            document.getElementById("description-edit").value = label2.innerText
            let savedDescription = label2.innerText

            evt.stopPropagation();

            //function, if user clicks on delete button
            document.getElementById('delete-button').onclick = () => {
            li.remove(evt.currentTarget)
            }

            //call function, if user save the text, after editing it in the "edit window"
            changeText() 

        }
        //this is where we define the function, which works, if we edit text and click save to submit
        const changeText = () =>{
        document.getElementById('save-button').onclick = () => {
            savedTitle = document.getElementById("title-edit").value
            label1.innerText = savedTitle
            savedDescription = document.getElementById("description-edit").value
            label2.innerText = savedDescription }
           
        }
            
        const editEvent = () =>{
                
            li.addEventListener('mouseup', editWindow) 
                 
        }

        editEvent()
            
        //continue to defining each object inside li and later adding them to ul to become visible
        label1.innerText = title_text_to_add;
        label1.className = "label1-todo"
        label2.innerText = description_text_to_add;
        label2.className = "label2-todo"
        date_label.className = "date-label-todo"
        date_label.innerHTML = daysFromToday(dateOfAdding, new Date())
        li.appendChild(checkBox);
        li.appendChild(label1);
        li.appendChild(label2);
        li.appendChild(date_label)
        li.appendChild(editButton);
        ul.appendChild(li);

        //when user will add new toDo case, then the input fields will be empty
        document.getElementById("title-new").value = ""
        document.getElementById("description-new").value = ""



    } else { //if the title field is not filled
        alert("Nav iespējams pievienot uzdevumu bez virsraksta. Mēģiniet vēlreiz!")
    }
    
})




