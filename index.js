let form=document.getElementById("form");
let no = document.getElementById("no");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let name = document.getElementById("name")


form.addEventListener('submit' , (e) => {
    e.preventDefault();
    console.log("button")
    formValidation();

})

let formValidation = () => {
    if(no.value  === '' || name.value ===''){
        msg.innerHTML="Fill the required details ";
    }
    else{
        acceptData();
    }
}

let data =[];

let acceptData = () => {
    data.push({
        name: name.value,
        no : no.value,
    });
    console.log(data)
    localStorage.setItem("data", JSON.stringify(data));
    console.log(localStorage)
    createTasks();
}

let createTasks = () => {
    tasks.innerHTML ="";
    data.map((x,y)=> {
        return   tasks.innerHTML += ` 
        <div id =${y}>
        <span>${x.name}</span>  
        <p>${x.no}</p>    
        <span class="options">
            <i onclick= "editForm(this)" class="fa-solid fa-pen-to-square"></i>
            <i onclick= "deleteForm(this);createTasks()" class="fa-solid fa-trash"></i>
        </span>
    </div>`;
    })  
 resetForm();

}

let deleteForm = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1)
    localStorage.setItem("data", JSON.stringify(data));
}

let editForm = (e) => {
    no.value = e.parentElement.previousElementSibling.innerHTML;
    name.value = e.parentElement.previousElementSibling.previousElementSibling.innerHTML;
    e.parentElement.parentElement.remove();
    deleteForm(e);
}

let resetForm = () => {
    name.value="";
    no.value=""  
}

(()=> {
    data = JSON.parse(localStorage.getItem("data")) || [] ;
    createTasks();
    console.log(data);
}) ();