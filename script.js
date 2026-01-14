const dropDownNav=document.getElementById("dropDownNav");
const downloadBtn=document.querySelector("#download");
const editProfileBtn=document.querySelector("#Edit");
var profileName=document.getElementById("Name");
var profileInfo = document.getElementById("profile-info");
const dropDownItem= document.getElementById("dropdownItem");
const serviceBtn=document.getElementById("service");
const recentWorkBtn=document.getElementById("recent-work");
const profileImage = document.getElementById("profile-image");
const getInTouchBtn = document.getElementById("get-in-touchBtn");


// Function for non-functional button
function nonFunctionalBtn() {
    alert("Item or information not available,pls check back later")
}

// NonFunctional buttons
downloadBtn.addEventListener("click", nonFunctionalBtn);
serviceBtn.addEventListener("click", nonFunctionalBtn);
recentWorkBtn.addEventListener("click", nonFunctionalBtn);
getInTouchBtn.addEventListener("click", nonFunctionalBtn);


// Functional Button
const defaultBio ="I am a professional creative design and app Developer. I am working in a multi national company as a UI/UX Designer."

editProfileBtn.addEventListener("click", () => {
    let name=prompt("Enter Your FullName:","Andrew Ben");
    let Bio=prompt("Enter Your Bio Description:",defaultBio);
    let defaultImage="images/default.png";
    localStorage.setItem("name", name)
    localStorage.setItem("Bio", Bio)
    localStorage.setItem("defaultImage",defaultImage)

    profileName.innerHTML=name;
    profileInfo.innerHTML=Bio;
    profileImage.src=defaultImage; 
});
const savedName = localStorage.getItem("name");
const savedBio = localStorage.getItem("Bio");
const savedDefaultImage = localStorage.getItem("defaultImage");
if (savedName){
profileName.innerHTML = savedName;
profileInfo.innerHTML = savedBio;
profileImage.src = savedDefaultImage;
};


// Work process and Best Expertise Section
const bigCircleIds = document.querySelectorAll(".big-circle");
const smallCircleIds = document.querySelectorAll(".small-circle");
const iconIds = document.querySelectorAll(".icon");
const workProcess = document.getElementById("work-process");
const workProcessContent = ["Research","Layout","System Design","Documentation"]


bigCircleIds.forEach((bigCircleId,index) =>{

    // When Mouse is on it
    bigCircleId.addEventListener("mouseenter", () =>{
        bigCircleIds[index].classList.replace("bg-gray-200","bg-red-700");
        smallCircleIds[index].classList.replace("border-red-400", "border-white");
        iconIds[index].classList.replace("text-red-700", "text-white");
        workProcess.innerHTML= workProcessContent[index];
    });

    // when mouse isn't on it
    bigCircleId.addEventListener("mouseleave", () => {
        bigCircleIds[index].classList.replace("bg-red-700","bg-gray-200");
        smallCircleIds[index].classList.replace("border-white","border-red-400");   
        iconIds[index].classList.replace("text-white","text-red-700");
        workProcess.innerHTML = "Icon Processes";
    });
});


// Get a service and Delete button functionality
const getServiceIds = document.querySelectorAll("#get-button");
const deleteBtns = document.querySelectorAll("#delete-button");

getServiceIds.forEach((getServiceId) =>{
    getServiceId.addEventListener("click", () =>{
        alert("Item or information not available,pls check back later")
    });
});


const deletedItems=JSON.parse(localStorage.getItem("deletedItems") || "[]");
deleteBtns.forEach((deleteBtn,index) =>{
    const grandParentDiv =deleteBtn.parentElement.parentElement.parentElement;
    grandParentDiv.dataset.id = index;

    if (deletedItems.includes(String(index))){
        grandParentDiv.remove();
    }

    deleteBtn.addEventListener("click", (e) => {
        const card=e.target.parentElement.parentElement.parentElement
        const itemId = card.dataset.id;
        card.remove();

        const currentDeleted = JSON.parse(localStorage.getItem("deletedItems") || "[]");
        currentDeleted.push(itemId);

        localStorage.setItem("deletedItems",JSON.stringify(currentDeleted));

        console.log("deleted item id:",itemId);
        console.log("All deleted items:", currentDeleted);
    });
});

// Adding a skill/Service button

const addBtn = document.getElementById("add-button");
addBtn.addEventListener("click",() =>{
    
});









