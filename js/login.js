let noPhone = document.createElement('meta');
noPhone.setAttribute('name', 'format-detection');
noPhone.setAttribute('content', 'telephone=no')

document.querySelector('head').prepend(noPhone);
$(document).ready(function(){

    var ifLogged = false
    var clicked = 0;
    let profIcon = $('#profile');
    if (!ifLogged) showSubmenu();

    function showSubmenu() {
        function stopDefAction(evt) {
            evt.preventDefault();
        }
        profIcon.on('click', stopDefAction, false);

        profIcon.on('click',function () {
            if (clicked == 0) {
                $('#sub_menu').slideDown(500);
                clicked = 1;

            } else {
                $('#sub_menu').slideUp(500);
                clicked = 0;
            }
         });

    }


});

// stranding Lights

document.addEventListener("DOMContentLoaded", function(event) {
    //add "noLights" class on ny element to prevent lights animation
    let stop = document.getElementsByClassName('noLights');
    if (stop.length>0) {
        console.log(stop)
        return false
    }
    function randomPosition(e) {
        e.style.transform = ("translate(" + Math.floor(Math.random()*80) + "vh," + Math.floor(Math.random()*40) + "vw)");
    }

    let body  = document.querySelectorAll('body');
    for (let i=1; i<4; i++){
        let addFigure = document.createElement('div');
        addFigure.setAttribute('id', 'figure'+ i);
        body[0].appendChild(addFigure);
    }

    let figure1 = document.getElementById('figure1');
    let figure2 = document.getElementById('figure2');
    let figure3 = document.getElementById('figure3');
toStrand();
setTimeout(toStrand, 200);
setInterval(toStrand, 3000);
    function toStrand() {
            randomPosition(figure1);
            randomPosition(figure2);
            randomPosition(figure3);
    }
});