
function CreateMenu() {
    if(logged_in){
        var menu_icon = document.getElementById("menu-icon");
        menu_icon.addEventListener('click', ToggleMenu);
    
        $.ajax({
            url: '/api/user_functions/',
            type: 'GET',
            success: (user_functions) => {
                //console.log(user_functions);
                SetMenu(user_functions);
            },
            error : (xhr, error, status) => {
                console.log(xhr, error, status);
            }
        });
    }
}

function ToggleMenu(e){
    e.preventDefault();
    var menu = document.getElementById("menu-list");
    var open = menu.dataset.open;

    var dimension = "";
    if(open == "true"){
        dimension = "0";
        open = "false";
    } else{
        dimension = "auto";
        open = "true";
    }
    menu.style.width = dimension;
    menu.style.height = dimension;
    menu.dataset.open = open;
}

function SetMenu(user_functions) {
    UnsetAllMenu();
    SetHomeMenu();
    user_functions.forEach(user_function => {
        SetMenuItem(user_function.site_function);
    });
}

function UnsetAllMenu() {
    var ul = document.getElementById('menu-list');
    while(ul.firstChild){
        ul.removeChild(ul.firstChild);
    }
}
function SetHomeMenu() {
    var li = document.createElement('li');
    li.className = "menu-list-item";
    li.id = 'menu-item-home';
    var a = document.createElement('a');
    var i = document.createElement('i');
    i.classList.add('fa');
    i.classList.add('fa-home');
    a.appendChild(i);

    a.href = '/';
    var span = document.createElement('span');
    span.textContent = ' Home ';
    a.appendChild(span);

    var ul = document.getElementById('menu-list');
    li.appendChild(a);
    ul.appendChild(li);
}

function SetMenuItem(site_function){
    var li = document.createElement('li');
    li.className = "menu-list-item";
    li.id = 'menu-item-'+site_function.id;
    var a = document.createElement('a');
    a.href = '/'+site_function.url;
    var span = document.createElement('span');
    span.textContent = site_function.name;
    a.appendChild(span);
    li.appendChild(a);

    var ul = document.getElementById('menu-list');
    ul.appendChild(li);
}

function UnsetMenuItem(site_function) {
    var ul = document.getElementById('menu-list');
    var li = document.getElementById('menu-item-'+site_function.id)
    ul.removeChild(li);
}
