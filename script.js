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
const submitBtn = document.getElementById("submit");


// Function for non-functional button
function nonFunctionalBtn() {
    alert("Item or information not available,pls check back later")
}

// NonFunctional buttons
downloadBtn.addEventListener("click", nonFunctionalBtn);
serviceBtn.addEventListener("click", nonFunctionalBtn);
recentWorkBtn.addEventListener("click", nonFunctionalBtn);
getInTouchBtn.addEventListener("click", nonFunctionalBtn);
submitBtn.addEventListener("click", nonFunctionalBtn);

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
const skillsContainer = document.getElementById("service-container"); // Update this ID

addBtn.addEventListener("click", () => {
    const skillName = prompt("Enter Skill/Service Name:");
    if (!skillName || skillName.trim() === "") {
        alert("Name cannot be empty!");
        return;
    }

    const skillStatement = prompt("Enter Description:");
    if (!skillStatement || skillStatement.trim() === "") {
        alert("Description cannot be empty!");
        return;
    }

    // Get count of ADDED skills only
    const addedSkills = JSON.parse(localStorage.getItem("addedSkills") || "[]");
    const nextId = "added-" + addedSkills.length; // ← PREFIX with "added-"

    // Create card
    const skillCard = document.createElement("div");
    skillCard.className = "skill-card flex flex-col jusify-center items-center bg-gray-200 px-4 py-4 gap-y-2 rounded-lg"; // Your classes
    skillCard.dataset.id = nextId; // Will be "added-0", "added-1", etc.

    // Icon
    const icon = document.createElement("div");
    icon.className = "h-8 text-red-700 border-2";
    icon.textContent = "⚙️";

    // Name
    const name = document.createElement("h3");
    name.className = "text-xl font-bold";
    name.textContent = skillName.trim();

    // Statement
    const statement = document.createElement("p");
    statement.className = "text-center text-gray-600";
    statement.textContent = skillStatement.trim();

    // Get Service button
    const getServiceBtn = document.createElement("button");
    getServiceBtn.className = "py-2 px-4 font-bold border-red-400 border-1 rounded-full hover:bg-black hover:text-white transition ease-out duration-500 cursor-pointer";
    getServiceBtn.textContent = "Get the service";
    getServiceBtn.addEventListener("click", () => {
        alert("Item or information not available, pls check back later");
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-button py-2 px-4 font-bold border-red-400 border-1 rounded-full hover:bg-black hover:text-white transition ease-out duration-500 cursor-pointer";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", (e) => {
        const card = e.target.closest(".skill-card");
        const itemId = card.dataset.id;

        // Check if it's an added skill
        if (itemId.startsWith("added-")) {
            // Remove from addedSkills array
            const skills = JSON.parse(localStorage.getItem("addedSkills") || "[]");
            const index = parseInt(itemId.replace("added-", ""));
            skills.splice(index, 1);
            localStorage.setItem("addedSkills", JSON.stringify(skills));

            // Remove from page
            card.remove();

            // Reload to fix indices
            location.reload();
        } else {
            // Original skill - use deletedItems approach
            card.remove();

            const currentDeleted = JSON.parse(localStorage.getItem("deletedItems") || "[]");
            currentDeleted.push(itemId);
            localStorage.setItem("deletedItems", JSON.stringify(currentDeleted));
        }
    });

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "flex flex-col gap-y-2";
    buttonDiv.appendChild(getServiceBtn);
    buttonDiv.appendChild(deleteBtn);

    // Assemble the card
    skillCard.appendChild(icon);
    skillCard.appendChild(name);
    skillCard.appendChild(statement);
    skillCard.appendChild(buttonDiv);

    skillsContainer.appendChild(skillCard);

    // Save to localStorage
    addedSkills.push({
        name: skillName.trim(),
        statement: skillStatement.trim()
    });
    localStorage.setItem("addedSkills", JSON.stringify(addedSkills));

    alert("Skill added successfully!");
});

// ========================================
// LOAD ADDED SKILLS ON PAGE LOAD
// ========================================

function loadAddedSkills() {
    const addedSkills = JSON.parse(localStorage.getItem("addedSkills") || "[]");
    const skillsContainer = document.getElementById("services-container"); // Update this ID

    addedSkills.forEach((skill, index) => {
        const skillCard = document.createElement("div");
        skillCard.className = "skill-card flex flex-col jusify-center items-center bg-gray-200 px-4 py-4 gap-y-2 rounded-lg";
        skillCard.dataset.id = "added-" + index; // ← PREFIX

        // Icon
        const icon = document.createElement("div");
        icon.className = "h-8 text-red-700 border-2";
        icon.textContent = "⚙️";

        // Name
        const name = document.createElement("h3");
        name.className = "text-xl font-bold";
        name.textContent = skill.name;

        // Statement
        const statement = document.createElement("p");
        statement.className = "text-center text-gray-600";
        statement.textContent = skill.statement;

        // Get Service button
        const getServiceBtn = document.createElement("button");
        getServiceBtn.className = "py-2 px-4 font-bold border-red-400 border-1 rounded-full hover:bg-black hover:text-white transition ease-out duration-500 cursor-pointer2";
        getServiceBtn.textContent = "Get the service";
        getServiceBtn.addEventListener("click", () => {
            alert("Item or information not available, pls check back later");
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-button py-2 px-4 font-bold border-red-400 border-1 rounded-full hover:bg-black hover:text-white transition ease-out duration-500 cursor-pointerl";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", (e) => {
            const card = e.target.closest(".skill-card");
            const itemId = card.dataset.id;

            if (itemId.startsWith("added-")) {
                const skills = JSON.parse(localStorage.getItem("addedSkills") || "[]");
                const idx = parseInt(itemId.replace("added-", ""));
                skills.splice(idx, 1);
                localStorage.setItem("addedSkills", JSON.stringify(skills));

                card.remove();
                location.reload(); // Reload to fix indices
            }
        });

        // Assemble
        skillCard.appendChild(icon);
        skillCard.appendChild(name);
        skillCard.appendChild(statement);
        skillCard.appendChild(getServiceBtn);
        skillCard.appendChild(deleteBtn);

        skillsContainer.appendChild(skillCard);
    });
}

// Call on page load
loadAddedSkills();


// Year of Present
var Year = document.getElementById("year");
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
Year.innerHTML = currentYear;