const dropDownNav=document.getElementById("dropDownNav");
const downloadBtn=document.querySelector("#download");
const editProfileBtn=document.querySelector("#Edit");
var profileName=document.getElementById("Name");
var profileInfo = document.getElementById("profile-info");
const dropDownItem= document.getElementById("dropdownItem");
const serviceBtn=document.getElementById("service");
const recentWorkBtn=document.getElementById("recent-work");
const profileImage = document.getElementById("profile-image");


// Function for non-functional button
function nonFunctionalBtn() {
    alert("Item or information not available,pls check back later")
}

// NonFunctional buttons
downloadBtn.addEventListener("click", nonFunctionalBtn);
serviceBtn.addEventListener("click", nonFunctionalBtn);
recentWorkBtn.addEventListener("click", nonFunctionalBtn);


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


