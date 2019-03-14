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
