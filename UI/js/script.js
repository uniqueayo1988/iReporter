let sideNav = document.getElementById("mySidenav");
let btn = document.getElementById('btn');

let openNav = () => sideNav.style.width = "250px";
let closeNav = () => sideNav.style.width = "0";

btn.onclick = () => location.href = 'profile.html';