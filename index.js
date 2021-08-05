//  Declaration of variables
let myNotes = []
let oldNotes = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")

const deleteBtn = document.querySelector(".btn--delete")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myNotes"))

//To-Do
if(leadsFromLocalStorage) {
    myNotes = leadsFromLocalStorage
    render(myNotes)
}

//Renders the notes and adds to the DOM
function render(notes) {
    let listItems = ""
    for (let i=0; i < notes.length; i++) {
        // listItems += "<li><a target='_blank' href='" + myNotes[i] + "'>" + myNotes[i] + "<a/></li>"
        listItems += `
        <li>
            <a target='_blank' href='${notes[i]}'>
            ${notes[i]}
            <a/>
        </li>`

        //Alternate Method
        // const li = document.createElement("li")
        // li.textContent = notes[i]
        // ulEl.append(li)
    }
    ulEl.innerHTML = listItems
}

//Saving notes
inputBtn.addEventListener("click", function() {
    myNotes.push(inputEl.value)
    inputEl.value = ''

    localStorage.setItem("myNotes", JSON.stringify(myNotes))
    render(myNotes)
})

//Saving tabs
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myNotes.push(tabs[0].url)
        localStorage.setItem("myNotes", JSON.stringify(myNotes))
        render(myNotes)
    }) 
})

//Deleting notes
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myNotes = []
    render(myNotes)
    console.log("Delete button working")
})

//Local Storage
// localStorage.setItem("myNotes", "https://medium.com/")
// localStorage.getItem("myNotes")
// localStorage.clear()