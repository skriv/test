


let colors = ['#FF94D0', '#FF518F', '#FF004B','#FFDC00', '#FF9D1D', '#FF5A48','#00F3A1', '#02D1A1', '#01AFA0','#43BAFF', '#0098FF', '#0176FF', '#8B8B8B', '#4A4A4A', '#262626'];
let colors1 = document.getElementById("colors1");
let colors2 = document.getElementById("colors2");

for (let i=0;i<colors.length;i++){
    let color = document.createElement("div");
    color.classList.add("color");
    color.style.background = colors[i];
    let color2 = color.cloneNode();

    color.addEventListener("mousedown", function(){
        c1 = colors[i];
    })
    colors1.appendChild(color);

    
    color2.addEventListener("mousedown", function(){
        c2 = colors[i];
    })
    colors2.appendChild(color2);
}