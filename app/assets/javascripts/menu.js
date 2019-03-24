
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
    user_functions.forEach(user_function => {
        SetMenuItem(user_function.site_function);
    });
}

function SetMenuItem(site_function){
    var li = document.createElement('li');
    li.className = "menu-list-item";
    li.id = 'menu-item-'+site_function.id;
    var a = document.createElement('a');
    a.href = '/'+site_function.url;
    a.text = site_function.name;
    li.appendChild(a);

    var ul = document.getElementById('menu-list');
    ul.appendChild(li);
}

function UnsetMenuItem(site_function) {
    var ul = document.getElementById('menu-list');
    var li = document.getElementById('menu-item-'+site_function.id)
    ul.removeChild(li);
}
