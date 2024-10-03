window.onload = () => {
    localStorage.clear(); // Clear all entries from localStorage
};
let userform =document.getElementById("user-form");
const retriveEntries=()=>{
    let entries=localStorage.getItem("user-entries");
    if(entries)
    {
        entries=JSON.parse(entries);
    }
    else{
    entries=[];
    }
    return entries;
}
const displayEntries=()=>{
    const entries=retriveEntries();
    const tableEntries=entries.map((entry)=>{
        const namecell=`<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailcell=`<td class='border px-4 py-2'>${entry.email}</td>`;
        const dobcell=`<td class='border px-4 py-2'>${entry.password}</td>`;
        const passwordcell=`<td class='border px-4 py-2'>${entry.dob}</td>`;
        const termscell=`<td class='border px-4 py-2'>${entry.terms}</td>`; 
        const row =`<tr>${namecell} ${emailcell} ${dobcell} ${passwordcell} ${termscell}</tr>`;
        return row;
    }).join("\n");
    const table =`<table class="table-auto w-full"><tr>
    <th class="px-4 py-2">Name</th>
     <th class="px-4 py-2">email</th>
      <th class="px-4 py-2">password</th>
       <th class="px-4 py-2">dob</th>
        <th class="px-4 py-2">terms</th>
        </tr>${tableEntries}</table>`;
        let detials=document.getElementById("user-entries");
        detials.innerHTML=table;
}
let userEntries=retriveEntries();
const saveuserform=(event)=>{
    event.preventDefault();
    const name =document.getElementById("name").value;
    const email =document.getElementById("email").value; 
    const dob =document.getElementById("dob").value;
    const password =document.getElementById("password").value;
    const terms=document.getElementById("terms").checked;
    const entry={
        name,
        email,
        dob,
        password,
        terms
    }
    if (isValidAge(dob)) {
        userEntries.push(entry);
        localStorage.setItem("user-entries", JSON.stringify(userEntries));
        displayEntries(); // Update the table after saving
    }
}

function isValidAge(dob) {
    const birthDate = new Date(dob);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    // Adjust if the birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    // Return true if age is between 18 and 55
    return age >= 18 && age <= 55;
}

// Handling form submission
userform.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting

    const dobInput = document.getElementById('dob').value; // Get the input value (date of birth)
    const resultElement = document.getElementById('result'); // The element to show result

    // Check if the age is valid
    if (isValidAge(dobInput)) {
        resultElement.textContent = "Age is valid (between 18 and 55).";
        resultElement.style.color = "green"; // Set the text color to green if valid
     saveuserform(event);
        
    } else {
        resultElement.textContent = "Age is not valid (must be between 18 and 55).";
        resultElement.style.color = "red"; // Set the text color to red if invalid
    }
});

//userform.addEventListener("submit",saveuserform);
displayEntries();
