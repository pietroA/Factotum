$(function(){
    ApplyColors();
});

function ApplyColors() {
    var text_color = document.getElementById('text-selector');
    var bg_color = document.getElementById('bg-selector');

    var sample = document.getElementById('result');
    if(sample && bg_color && text_color){
        sample.style.color = text_color.value;
        sample.style.backgroundColor = bg_color.value;
    
        document.getElementById('bg-selected').textContent = bg_color.value;
        document.getElementById('text-selected').textContent = text_color.value;
    }
}