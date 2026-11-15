const notes=JSON.parse(localStorage.getItem('notesList'))||[]


const addNoteBtn=document.querySelector('#js-add-note-btn');
addNoteBtn.addEventListener('click',(event)=>{
    addNotes();
});

const deleteBtn=document.querySelector('.js-notes-display');
deleteBtn.addEventListener('click',(event)=>{
    if(event.target.className==='js-delete-btn'){
        deleteTask(Number(event.target.dataset.index));
    }
})

const continer=document.querySelector('#js-add-note-btn');
continer.addEventListener('click',(event)=>{
    if(event.target.className==='js-edit-btn'){
        
    }
});


function deleteTask(index){
    notes.splice(index,1);
    displayCount();
    displayNotes();
}

function addNotes(){
    const title=document.querySelector("#js-notes-title");
    const description=document.querySelector("#js-notes-data");
    const type=document.querySelector("#js-notes-category");


    notes.push({
        title:title.value,
        description:description.value,
        category:type.value
    });

    title.value='';
    description.value='';

    localStorage.setItem('notesList',JSON.stringify(notes));

    displayNotes();
    displayCount();
}

function displayNotes(){
    let notesList='';
    const showNotes=document.querySelector('.js-notes-display');

    notes.forEach((note)=>{
        const index=notes.indexOf(note);
        notesList+=`
            <div class="note-card">
                <div class="display-notes-data">
                    <h2>${note.title}</h2>
                    <p>${note.description}</p>
                    <p>${note.category}</p>
                </div>
                <div class="edit-section" hidden>
                    <input type="text" name="js-edit-text" id="js-edit-text">
                    <button id="js-submit-btn" data-index="${index}">Submit</button>
                </div>
                <div class="changes-btns">
                    <button class="js-edit-btn data-index="${index}">Edit</button>
                    <button class="js-delete-btn" data-index="${index}">Delete</button>
                </div>
            </div>
        `
    });

    showNotes.innerHTML=notesList;

}

function displayCount(){
    const showTotalCount=document.querySelector("#js-total-notes");
    const showStudyCount=document.querySelector("#js-total-study-notes");
    const totalNotes=notes.length;
    let studyNotes=0;

    notes.forEach((note)=>{
        if(note.category==='study'){
            studyNotes++;
        }
    });

    showStudyCount.innerHTML=studyNotes;
    showTotalCount.innerHTML=totalNotes;
}



document.addEventListener("DOMContentLoaded",()=>{
    displayCount();
    displayNotes();
});