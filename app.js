// target issueInputForm
document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

// fetchIssue Function
function fetchIssues() {
    // Localstorage data store issues variables
    let issues = JSON.parse(localStorage.getItem("codingIssues"));
    let issuesList = document.getElementById("issueList");
    
    issuesList.innerHTML = ``;

    for(let i = 0; i < issues.length; i++) {
        let id = issues[i].id;
        let subject = issues[i].subject;
        let description = issues[i].description;
        let language = issues[i].language;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;
        let statusColor = status === "Closed" ? 'badge bg-primary' : 'badge bg-secondary';
        let issueGif = status === "Closed" ? 'd-none' : 'open-issue';

        // Creating html issuesList
        issuesList.innerHTML += 
        `<div class="jubotron-custom cus-border mt-3 px-md-4 py-md-4 px-3 py-3">
           <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="text-muted cus-text-sm"> Issue ID: ${id} </h6>
                    <p><span class="${statusColor}">${status}</span></p>
                </div>
                <div>
                    <img src="./images/mario.gif" class="${issueGif}" alt="Running Gif">
                </div>
           </div>
            <h5 class="text-light">${subject}</h5>
            <p class="text-white my-3 cus-des-text">${description}</p>
            <div class="my-3">
                <span class="text-light me-1">💻 ${language}</span>
                <span class="text-light ms-1">👨‍💻 ${assignedTo}</span>
            </div>
            <button class="btn btn-warning me-1" onClick="setStatusClosed('${id}')">Close</button>
            <button class="btn btn-danger ms-1" onClick="deleteIssue('${id}')">Delete</button>
        </div>`;
    }
}

// saveIssue function 
function saveIssue(e) {
    // Storing form data spacific variables
    let issueId = chance.guid();
    let issueSubject = document.getElementById("issueSubjInput").value;
    let issueDes = document.getElementById("issueDescInput").value;
    let issueLanguage = document.getElementById("issueLanguageInput").value;
    let issueAssignedTo = document.getElementById("issueAssignedToInput").value;
    let issueStatus = "Open";

    // Assign issue Object
    let issue = {
        id: issueId,
        subject: issueSubject,
        description: issueDes,
        language: issueLanguage,
        assignedTo: issueAssignedTo,
        status: issueStatus,
    };

    // Adding issue in Localstorage
    if (localStorage.getItem("codingIssues") === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem("codingIssues", JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem("codingIssues"));
        issues.push(issue);
        localStorage.setItem("codingIssues", JSON.stringify(issues));
    }

    document.getElementById("issueInputForm").reset();

    // calling fetchIssues function
    fetchIssues();

    e.preventDefault();
}

// setStatusClosed Function
function setStatusClosed(id) {
    let issues = JSON.parse(localStorage.getItem("codingIssues"));
    for(let i = 0; i < issues.length; i++) {
        if(issues[i].id === id) {
            issues[i].status = "Closed";
        }
    }

    // Close issue in Localstorage
    localStorage.setItem("codingIssues", JSON.stringify(issues));

    // calling fetchIssues Function
    fetchIssues();
}

// deleteIssue function
function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem("codingIssues"));
    for(let i = 0; i < issues.length; i++) {
        if(issues[i].id === id) {
            issues.splice(i, 1);
        }
    }

    // filter method delete
    // let filterIssue = issues.filter(function(value, i) {
    //     return value.id !== id;
    // })

    // Delete issue in Localstorage
    localStorage.setItem("codingIssues", JSON.stringify(issues));

    // calling fetchIssues function
    fetchIssues();
}