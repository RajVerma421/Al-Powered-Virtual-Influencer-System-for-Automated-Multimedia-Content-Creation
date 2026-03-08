function showPage(pageId){

let pages = document.querySelectorAll(".page");

pages.forEach(function(page){
page.classList.add("hidden");
});

document.getElementById(pageId).classList.remove("hidden");

}