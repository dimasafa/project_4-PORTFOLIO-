window.addEventListener('DOMContentLoaded', function() {

    
    // POST Contact form
    const formContact = document.querySelector('.contact__form');

    const message = {
        loading: 'loading...',
        success: 'alles ok!',
        failure: 'Etwas schief gegangen'
        };

    const postContactData = async (url, data) => {
        let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
        });
        return await res.json();
    }
    
    
    function bindPostContact(form) {
        form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.appendChild(statusMessage);
    
        const formData = new FormData(form);
    
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
    
        postContactData('http://localhost:3000/kontakte', json)
        .then(data => {
            console.log(data);
            statusMessage.textContent = message.success;
            statusMessage.remove();
        }).catch (() => {
            statusMessage.textContent = message.failure;
        }).finally (() => {
            form.reset();
        });
        });
    }
    
    bindPostContact(formContact);

    // POST subscribe in footer

    const formSubscribe = document.querySelector('.subscribe__form');


    function bindPostSubscribe(form) {
        form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.appendChild(statusMessage);
    
        const formData = new FormData(form);
    
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
    
        postContactData('http://localhost:3000/subscribe', json)
        .then(data => {
            console.log(data);
            statusMessage.textContent = message.success;
            statusMessage.remove();
        }).catch (() => {
            statusMessage.textContent = message.failure;
        }).finally (() => {
            form.reset();
        });
        });
    }
    
    bindPostSubscribe(formSubscribe);
    
     // hamburger-menu
 
     const hamburger = document.querySelector('.menu__hamburger');
     const hamMenu = document.querySelectorAll('.menu__hamburger__menu__nav');
     const parentMobMenu = document.querySelector('.menu__hamburger__menu');
     const menuClose = document.querySelector('.menu__hamburger__close-symbol');
 /*     const overlay = document.querySelector('.menu__overlay'); */
 
     function closeMenu() {
         parentMobMenu.style.opacity = '0';
         setTimeout(() => {
           parentMobMenu.style.display = 'none';
         }, 500);
         hamburger.style.display = 'block';
     }
 
     function openMenu() {
         parentMobMenu.style.display = 'block';
         setTimeout(() => {
             parentMobMenu.style.opacity = '1';
           }, 100);
         hamburger.style.display = 'none';
         
     }
 
     hamburger.addEventListener('click', openMenu);
     menuClose.addEventListener('click', closeMenu);
 
     parentMobMenu.addEventListener('click', (e) => {
         const target = e.target;
 
         if(target && target.classList.contains('.menu__hamburger__menu__nav')) {
             hamMenu.forEach((item) => {
                 if(target === item) {
                     closeMenu();
                 }
             });
         }
     });

     // Map

    const map = document.querySelector('.contact__googlekarte');
    const overlay = document.querySelector('.contact__overlay');
    const mapLink = document.querySelector('.contact__map');

    mapLink.addEventListener('click', function(e) {
    e.preventDefault();
    map.classList.add('active');
    overlay.classList.add('active');
    });

    overlay.addEventListener('click', function() {
    map.classList.remove('active');
    overlay.classList.remove('active');
    });
    
    })


