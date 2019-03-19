$(function(){
    SetBodyHeight();
    window.addEventListener('resize',  SetBodyHeight);
});

function SetBodyHeight(){
    var window_height = window.innerHeight;
    if(window_height > document.body.offsetHeight)
    {
        document.body.style.minHeight = window_height+"px";
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