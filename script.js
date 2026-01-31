const dropDownNav = document.getElementById("dropDownNav");
const downloadBtn = document.querySelector("#download");
const editProfileBtn = document.querySelector("#Edit");
var profileName = document.getElementById("Name");
var profileInfo = document.getElementById("profile-info");
const dropDownItem = document.getElementById("dropdownItem");
const serviceBtn = document.getElementById("service");
const recentWorkBtn = document.getElementById("recent-work");
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
const defaultBio = "I am a professional creative design and app Developer. I am working in a multi national company as a UI/UX Designer."

editProfileBtn.addEventListener("click", () => {
    let name = prompt("Enter Your FullName:", "Andrew Ben");
    if (!name || name.trim() === "") {
        alert("Name cannot be empty!");
        return;
    }
    let Bio = prompt("Enter Your Bio Description:", defaultBio);
    if (!Bio || Bio.trim() === "") {
        alert("Bio Description cannot be empty!");
        return;
    }
    let defaultImage = "images/default.png";
    localStorage.setItem("name", name)
    localStorage.setItem("Bio", Bio)
    localStorage.setItem("defaultImage", defaultImage)

    profileName.innerHTML = name;
    profileInfo.innerHTML = Bio;
    profileImage.src = defaultImage;
});
const savedName = localStorage.getItem("name");
const savedBio = localStorage.getItem("Bio");
const savedDefaultImage = localStorage.getItem("defaultImage");
if (savedName) {
    profileName.innerHTML = savedName;
    profileInfo.innerHTML = savedBio;
    profileImage.src = savedDefaultImage;
};


// Work process and Best Expertise Section
const bigCircleIds = document.querySelectorAll(".big-circle");
const smallCircleIds = document.querySelectorAll(".small-circle");
const iconIds = document.querySelectorAll(".icon");
const workProcess = document.getElementById("work-process");
const workProcessContent = ["Research", "Layout", "System Design", "Documentation"]

const bgColor = "bg-gray-200";
const bgColorOnHover = "bg-zinc-900";
bigCircleIds.forEach((bigCircleId, index) => {

    // When Mouse is on it
    bigCircleId.addEventListener("mouseenter", () => {
        if (bigCircleIds[index].classList.contains(bgColor)) {
            bigCircleIds[index].classList.replace(bgColor, "bg-red-700");
        }
        else {
            bigCircleIds[index].classList.replace(bgColorOnHover, "bg-red-700");
        }
        smallCircleIds[index].classList.replace("border-red-400", "border-white");
        iconIds[index].classList.replace("text-red-700", "text-white");
        workProcess.innerHTML = workProcessContent[index];
    });

    // when mouse isn't on it
    bigCircleId.addEventListener("mouseleave", () => {
        if (bigCircleIds[index].classList.contains("bg-red-700") && !serviceContainer.classList.contains("bg-black")) {
            bigCircleIds[index].classList.replace("bg-red-700", bgColor);
        }
        else {
            bigCircleIds[index].classList.replace("bg-red-700", bgColorOnHover);
        }

        smallCircleIds[index].classList.replace("border-white", "border-red-400");
        iconIds[index].classList.replace("text-white", "text-red-700");
        workProcess.innerHTML = "Icon Processes";
    });
});


// Get a service and Delete button functionality
const getServiceIds = document.querySelectorAll("#get-button");
const deleteBtns = document.querySelectorAll("#delete-button");

getServiceIds.forEach((getServiceId) => {
    getServiceId.addEventListener("click", () => {
        alert("Item or information not available,pls check back later")
    });
});


const deletedItems = JSON.parse(localStorage.getItem("deletedItems") || "[]");
deleteBtns.forEach((deleteBtn, index) => {
    const grandParentDiv = deleteBtn.parentElement.parentElement.parentElement;
    grandParentDiv.dataset.id = index;

    if (deletedItems.includes(String(index))) {
        grandParentDiv.remove();
    }

    deleteBtn.addEventListener("click", (e) => {
        const card = e.target.parentElement.parentElement.parentElement
        const itemId = card.dataset.id;
        card.remove();

        const currentDeleted = JSON.parse(localStorage.getItem("deletedItems") || "[]");
        currentDeleted.push(itemId);

        localStorage.setItem("deletedItems", JSON.stringify(currentDeleted));

        console.log("deleted item id:", itemId);
        console.log("All deleted items:", currentDeleted);
    });
});

// Adding a skill/Service button
const addBtn = document.getElementById("add-button");
const skillsContainer = document.getElementById("service-container");

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


    const icon = document.createElement("div");
    icon.className = "h-8 text-red-700 border-2";
    icon.textContent = "⚙️";


    const name = document.createElement("h3");
    name.className = "text-xl font-bold";
    name.textContent = skillName.trim();


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

            const skills = JSON.parse(localStorage.getItem("addedSkills") || "[]");
            const index = parseInt(itemId.replace("added-", ""));
            skills.splice(index, 1);
            localStorage.setItem("addedSkills", JSON.stringify(skills));


            card.remove();
            location.reload();
        } else {
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


// LOAD ADDED SKILLS WHEN PAGE LOAD

function loadAddedSkills() {
    const addedSkills = JSON.parse(localStorage.getItem("addedSkills") || "[]");
    const skillsContainer = document.getElementById("service-container");

    addedSkills.forEach((skill, index) => {
        const skillCard = document.createElement("div");
        skillCard.className = "skill-card flex flex-col jusify-center items-center bg-gray-200 px-4 py-4 gap-y-2 rounded-lg";
        skillCard.dataset.id = "added-" + index;


        const icon = document.createElement("div");
        icon.className = "h-8 text-red-700 border-2";
        icon.textContent = "⚙️";

        const name = document.createElement("h3");
        name.className = "text-xl font-bold";
        name.textContent = skill.name;

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
                location.reload();
            }
        });

        const buttonDiv = document.createElement("div");
        buttonDiv.className = "flex flex-col gap-y-2";
        buttonDiv.appendChild(getServiceBtn);
        buttonDiv.appendChild(deleteBtn);

        skillCard.appendChild(icon);
        skillCard.appendChild(name);
        skillCard.appendChild(statement);
        skillCard.appendChild(buttonDiv);

        skillsContainer.appendChild(skillCard);
    });
};


loadAddedSkills();


// Dark and Light Mode Functionality
const lightMode = document.getElementById("light-mode");
const darkMode = document.getElementById("dark-mode");
const navContainer = document.getElementById("nav-container");
const serviceContainer = document.getElementById("Service");
const homeContainer = document.getElementById("Home");
const headContainers = document.querySelectorAll("#heading");
const skillContainers = document.querySelectorAll("#skill-container");
const projectContainer = document.getElementById("Project");
const testimonialContainer = document.getElementById("Testimonials");
const testimonialText = document.getElementById("testimonial-text");
const emptyDiv = document.getElementById("empty-space");
const contactContainer = document.getElementById("Contact");
const footerContainer = document.getElementById("footer");
const toggleMode = null


lightMode.addEventListener("click", () => {
    var toggleMode = "on";
    localStorage.setItem("toggleMode", toggleMode);
    lightMode.classList.replace("flex", "hidden");
    darkMode.classList.replace("hidden", "flex");
    navContainer.classList.replace("bg-white", "bg-black");
    serviceContainer.classList.replace("bg-white", "bg-black");
    homeContainer.classList.replace("bg-gray-200", "bg-zinc-900");
    profileName.classList.replace("text-black", "text-white");
    profileImage.classList.replace("bg-gray-300", "bg-black");
    headContainers.forEach((headContainer) => {
        headContainer.classList.add("text-white");
    });
    bigCircleIds.forEach((bigCircleId) => {
        bigCircleId.classList.replace("bg-gray-200", "bg-zinc-900");
    });
    skillContainers.forEach((skillContainer) => {
        skillContainer.classList.replace("bg-gray-200", "bg-zinc-900");
    });
    getServiceIds.forEach((getServiceId) => {
        getServiceId.classList.add("text-white");
        getServiceId.classList.replace("hover:bg-black", "hover:bg-white");
        getServiceId.classList.replace("hover:text-white", "hover:text-black");
    });
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.classList.add("text-white");
        deleteBtn.classList.replace("hover:bg-black", "hover:bg-white");
        deleteBtn.classList.replace("hover:text-white", "hover:text-black");
    });
    addBtn.classList.add("text-white");
    addBtn.classList.replace("hover:text-white", "hover:text-black");
    projectContainer.classList.add("bg-black");
    testimonialContainer.classList.replace("bg-gray-200", "bg-zinc-900");
    testimonialText.classList.add("text-white");
    contactContainer.classList.replace("bg-gray-200", "bg-zinc-900");
    emptyDiv.classList.replace("bg-white", "bg-black");
    footerContainer.classList.replace("bg-white", "bg-black");
});

darkMode.addEventListener("click", () => {
    var toggleMode = "off";
    localStorage.setItem("toggleMode", toggleMode);
    darkMode.classList.replace("flex", "hidden");
    lightMode.classList.replace("hidden", "flex");
    navContainer.classList.replace("bg-black", "bg-white");
    serviceContainer.classList.replace("bg-black", "bg-white");
    homeContainer.classList.replace("bg-zinc-900", "bg-gray-200");
    profileName.classList.replace("text-white", "text-black");
    profileImage.classList.replace("bg-black", "bg-gray-300");
    headContainers.forEach((headContainer) => {
        headContainer.classList.remove("text-white");
    });
    bigCircleIds.forEach((bigCircleId) => {
        bigCircleId.classList.replace("bg-zinc-900", "bg-gray-200");
    });
    skillContainers.forEach((skillContainer) => {
        skillContainer.classList.replace("bg-zinc-900", "bg-gray-200");
    });
    getServiceIds.forEach((getServiceId) => {
        getServiceId.classList.remove("text-white");
        getServiceId.classList.replace("hover:bg-white", "hover:bg-black");
        getServiceId.classList.replace("hover:text-black", "hover:text-white");
    });
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.classList.remove("text-white");
        deleteBtn.classList.replace("hover:bg-white", "hover:bg-black");
        deleteBtn.classList.replace("hover:text-black", "hover:text-white");
    });
    addBtn.classList.remove("text-white");
    addBtn.classList.replace("hover:text-black", "hover:text-white");
    projectContainer.classList.remove("bg-black");
    testimonialContainer.classList.replace("bg-zinc-900", "bg-gray-200");
    testimonialText.classList.remove("text-white");
    contactContainer.classList.replace("bg-zinc-900", "bg-gray-200");
    emptyDiv.classList.replace("bg-black", "bg-white");
    footerContainer.classList.replace("bg-black", "bg-white");
});

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove("hidden");
    } else {
        backToTopBtn.classList.add("hidden");
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

var value = localStorage.getItem("toggleMode");
// Default to 'on' (Dark Mode) if no value is set
if (value === null || value === "on") {
    lightMode.classList.replace("flex", "hidden");
    darkMode.classList.replace("hidden", "flex");
    navContainer.classList.replace("bg-white", "bg-black");
    serviceContainer.classList.replace("bg-white", "bg-black");
    homeContainer.classList.replace("bg-gray-200", "bg-zinc-900");
    profileName.classList.replace("text-black", "text-white");
    profileImage.classList.replace("bg-gray-300", "bg-black");
    headContainers.forEach((headContainer) => {
        headContainer.classList.add("text-white");
    });
    bigCircleIds.forEach((bigCircleId) => {
        bigCircleId.classList.replace("bg-gray-200", "bg-zinc-900");
    });
    skillContainers.forEach((skillContainer) => {
        skillContainer.classList.replace("bg-gray-200", "bg-zinc-900");
    });
    getServiceIds.forEach((getServiceId) => {
        getServiceId.classList.add("text-white");
        getServiceId.classList.replace("hover:bg-black", "hover:bg-white");
        getServiceId.classList.replace("hover:text-white", "hover:text-black");
    });
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.classList.add("text-white");
        deleteBtn.classList.replace("hover:bg-black", "hover:bg-white");
        deleteBtn.classList.replace("hover:text-white", "hover:text-black");
    });
    addBtn.classList.add("text-white");
    addBtn.classList.replace("hover:text-white", "hover:text-black");
    projectContainer.classList.add("bg-black");
    testimonialContainer.classList.replace("bg-gray-200", "bg-zinc-900");
    testimonialText.classList.add("text-white");
    contactContainer.classList.replace("bg-gray-200", "bg-zinc-900");
    emptyDiv.classList.replace("bg-white", "bg-black");
    footerContainer.classList.replace("bg-white", "bg-black");
}
else {
    darkMode.classList.replace("flex", "hidden");
    lightMode.classList.replace("hidden", "flex");
    navContainer.classList.replace("bg-black", "bg-white");
    serviceContainer.classList.replace("bg-black", "bg-white");
    homeContainer.classList.replace("bg-zinc-900", "bg-gray-200");
    profileName.classList.replace("text-white", "text-black");
    profileImage.classList.replace("bg-black", "bg-gray-300");
    headContainers.forEach((headContainer) => {
        headContainer.classList.remove("text-white");
    });
    bigCircleIds.forEach((bigCircleId) => {
        bigCircleId.classList.replace("bg-zinc-900", "bg-gray-200");
    });
    skillContainers.forEach((skillContainer) => {
        skillContainer.classList.replace("bg-zinc-900", "bg-gray-200");
    });
    getServiceIds.forEach((getServiceId) => {
        getServiceId.classList.remove("text-white");
        getServiceId.classList.replace("hover:bg-white", "hover:bg-black");
        getServiceId.classList.replace("hover:text-black", "hover:text-white");
    });
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.classList.remove("text-white");
        deleteBtn.classList.replace("hover:bg-white", "hover:bg-black");
        deleteBtn.classList.replace("hover:text-black", "hover:text-white");
    });
    addBtn.classList.remove("text-white");
    addBtn.classList.replace("hover:text-black", "hover:text-white");
    projectContainer.classList.remove("bg-black");
    testimonialContainer.classList.replace("bg-zinc-900", "bg-gray-200");
    testimonialText.classList.remove("text-white");
    contactContainer.classList.replace("bg-zinc-900", "bg-gray-200");
    emptyDiv.classList.replace("bg-black", "bg-white");
    footerContainer.classList.replace("bg-black", "bg-white");
}

// Present Year
var Year = document.getElementById("year");
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
Year.innerHTML = currentYear;