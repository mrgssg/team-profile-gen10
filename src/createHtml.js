// create a card for employee
function createCard(employee) {
    return `<div class="card">
        <div class="card-title">
            <div class="name">${employee.getName()}</div>
            ${addTitle(employee.getRole())}
        </div>
        <div class="card-content">
            <div class="card-element">
                ID: ${employee.getId()}
            </div>
            <div class="card-element">
                Email: <a href='mailto:${employee.getEmail()}'>${employee.getEmail()}</a>
        </div>
            ${addSpecialAttrs(employee)}
        </div>
        </div>`
}

// add the correct title, attributes and icons for each employee
function addTitle(role) {

    if (role === 'Manager') {
        return `<div class="title"><i class="fa fa-mug-hot"></i> ${role}</div>`
    }
    else if (role === 'Engineer') {
        return `<div class="title"><i class="fa fa-glasses"></i> ${role}</div>`
    }
    else {
        return `<div class="title"><i class="fa fa-user-graduate"></i> ${role}</div>`
    }
}

function addSpecialAttrs(employee) {

    if (employee.getRole() === 'Manager') {
        return `<div class="card-element">Office number: ${employee.getOffice()}</div>`
    } 
    else if (employee.getRole() === 'Engineer') {
        return `<div class="card-element">
            Github: <a href='https://github.com/${employee.getGithub()}' target='_blank'>${employee.getGithub()}</a>
        </div>`
    }
    else {
        return `<div class="card-element">School: ${employee.getSchool()}</div>`
    }
}

// create the cards for the team
function createCards(team) {
    let cards = '';
    team.forEach(employee => {
        cards += createCard(employee);
    });
    return cards;
}

function createHtml(team) {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Meet the Team</title>
            <link rel="stylesheet" href="./style.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        </head>
        <body>
            <div class="header">Meet the Team</div>
            <div class="row">
                <div class="col"></div>
                <div class="cards">
                ${createCards(team)}
                </div>
                <div class="col"></div>
            </div>
        </body>
    </html>`
}

module.exports = createHtml;
