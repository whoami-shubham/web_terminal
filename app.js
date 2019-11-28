document.getElementById("form").addEventListener("submit", executeCommand);
var command = document.getElementById("command");
var content = document.querySelector(".content");
var params;
var options = {
    portfolio: "https://whoamishubham.github.io",
    blog: "https://whoami-shubham.github.io",
    github: "https://github.com/whoami-shubham",
    linkedin: "https://linkedin.com/in/whoamishubham"
}


function executeCommand() {
    event.preventDefault();
    if (command.value.trim().length > 0) {
        params = command.value.trim().split(" ");
        insertElement(params);
    }
    command.value = "";
}


function insertElement(params) {
    var element = document.createElement("span");

    if ((params.length > 1 && params[0] === "clear") || (AvailableCommands[params[0]]===undefined) || (params.length > 2) || (params.length == 2 && options[params[1]]===undefined) || (params.length==1 && AvailableCommands[params[0]]==="") ) {
        element.className = "error left";
        element.innerHTML = AvailableCommands[params[0]]===""?`${params[0]} command expects 1 more argument.`:"command not found <br/> Type `help' to see the list of commands";
        content.appendChild(element);
        console.log(params)
    }
    else {

        if (params[0] === "clear") {
            clearScreen();
            return;
        }

        if (params.length == 1) {
            if (AvailableCommands[params[0]]) {
                element.className = params[0] != "help" ? "sucess left" : "help left";
                element.innerHTML = AvailableCommands[params[0]];
            }
            content.appendChild(element);
        }
        if (params.length == 2) {
            if (params[0] === "cd") {
                location.href = options[params[1]];
            }
            else if(params[0]==="cat"){
                element.className ="sucess left";
                element.innerHTML = AvailableCommands[params[1]];
                content.appendChild(element);
            }
        }
    }
    updateScroll();
}

function updateScroll() {
    content.scrollTop = content.scrollHeight;
}

var AvailableCommands = {
    ls: " portfolio &nbsp;&nbsp;&nbsp;&nbsp; blog &nbsp;&nbsp;&nbsp;&nbsp; github &nbsp;&nbsp;&nbsp;&nbsp; linkedin",
    help: "Web_Terminal, &nbsp; version 1.0.0 <br/><br/> Available Commands <br/> 1. ls <br/> 2. pwd <br/> 3. clear <br/> 4. cd <br/> 5. cat <br/> 6. help",
    pwd: "<a href='https://whoami-shubham.github.io/web_terminal'>~/web_terminal</a>",
    portfolio: `<a href=${options.portfolio} title='click to Follow link'>whoamishubham.github.io</a>`,
    blog: `<a href=${options.blog} title='click to Follow link'>~/shubham</a>`,
    github: `<a href=${options.github} title='click to Follow link'>@whoami-shubham</a>`,
    linkedin: `<a href=${options.linkedin} title='click to Follow link'>@whoamishubham</a>`,
    cd:"",
    cat:"",
    clear:"clear screen"

}

function clearScreen() {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}