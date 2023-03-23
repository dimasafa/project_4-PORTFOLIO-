'use strict';

window.addEventListener('DOMContentLoaded', function() {

/* // Feedback

    const feedbackBtn = document.querySelector('.feedback__btn');
    const feedbackBtnLeft = document.querySelector('.feedback__btn-left');
    const feedbackBtnRight = document.querySelector('.feedback__btn-right');
    const feedbackText = document.querySelectorAll('.feedback__text');
    const feedbackName = document.querySelectorAll('.feedback__name');

    const feedbackParent = document.querySelector('.feedback__content');

    function feedbackHide() {

        feedbackParent.forEach(item => {
            item.classList.remove('feedback__text-active');
        });
    }

    function feedbackShow(i=0) {

        feedbackParent[i].classList.add('feedback__text-active');
    }

    feedbackShow();
    feedbackHide();

    feedbackBtnLeft.addEventListener('click', function(event) {
        const target = event.target;

        if(target.classList.contains('feedback__btn-left')) {

            feedbackParent.forEach((item, i) => {
                    feedbackHide();
                    feedbackShow(i);
            }); 
        }
    })
 */

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


    // scroll

    const scrollLink = document.querySelector('.promo__scroll__img');
    if (scrollLink) {
      scrollLink.addEventListener('click', (e) => {
        e.preventDefault();

        const targetElement = document.getElementById('scrollPlace'); 
        targetElement.scrollIntoView({ behavior: 'smooth' }); 
    });
    }

    // modal

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const close = document.querySelector('[data-close]');

    const modal = document.querySelector('.modal');

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.style.display = "block";
        setTimeout(() => {
            modal.style.opacity = '1';
          }, 100);
        document.body.style.overflow = 'hidden';
    }

    close.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closeModal();
        }
    });

    // calendar jquary 

    $(function() {
        $('.modal__check-in').datepicker();
        $('.modal__check-out').datepicker();
      });

    
    // Feedback from db.json

    const linksBtn = document.querySelector('.feedback__btn-left');
    const rechtssBtn = document.querySelector('.feedback__btn-right');

    let currId = 1;

    class HappyClient {
        constructor(text, name, parentSelector, id) {
          this.text = text;
          this.name = name;
          this.parentSelector = parentSelector;
          this.id = id;
          this.parent = document.querySelector(parentSelector);
        }
      
        render(currId) {
          if (this.id === currId) {
            const element = document.createElement('div');
            element.innerHTML = `
              <div class="feedback__content">
                <div class="feedback__text-active">${this.text}</div>
                <div class="feedback__name-active">${this.name}</div>
              </div>
            `;
            this.parent.append(element);
          }
        }
      }

      async function getResource(url) {
        let res = await fetch(url);
    
        return await res.json();
    }

    getResource('http://localhost:3000/feedbacks')
    .then(data => {
        data.forEach(({text, name, id}) => {
        const happyClient = new HappyClient(text, name, ".feedback__wrapper", id);
        happyClient.render(currId);
        });
    })
    .catch(error => {
        console.error(error);
    });

    rechtssBtn.addEventListener('click', () => {
        const currDiv = document.querySelector('.feedback__content');
        currDiv.remove();
    
        currId += 1;
        getResource('http://localhost:3000/feedbacks')
            .then(data => {
                data.forEach(({text, name, id}) => {
                    const maxId = data.reduce((max, { id }) => Math.max(max, id), 0);
                    if (currId > maxId) {
                        currId = 1;
                    }
                    const happyClient = new HappyClient(text, name, ".feedback__wrapper", id);
                    happyClient.render(currId);
                });
            })
            .catch(error => {
                console.error(error);
            });
    });

    linksBtn.addEventListener('click', () => {
        const currDiv = document.querySelector('.feedback__content');
        currDiv.remove();
    
        currId -= 1;
        getResource('http://localhost:3000/feedbacks')
            .then(data => {
                data.forEach(({text, name, id}) => {
                    const maxId = data.reduce((max, { id }) => Math.max(max, id), 0);
                    if (currId < 1) {
                        currId = maxId;
                    }
                    const happyClient = new HappyClient(text, name, ".feedback__wrapper", id);
                    happyClient.render(currId);
                });
            })
            .catch(error => {
                console.error(error);
            });
    });

    // POST modal form

    const modalForm = document.querySelector('#modalForm form');
    const checkIn = modalForm.querySelector('.modal__check-in');
    const checkOut = modalForm.querySelector('.modal__check-out');
    
    const message = {
      loading: 'loading...',
      success: 'alles ok!',
      failure: 'Etwas schief gegangen'
    };
    
    const postData = async (url, data) => {
      let res = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      });
      return await res.json();
    }
    
    function bindPostData(form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.appendChild(statusMessage);
    
        const formData = new FormData(form);
        formData.set('checkIn', checkIn.value);
        formData.set('checkOut', checkOut.value);
    
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
    
        postData('http://localhost:3000/reserve', json)
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
    
    checkIn.addEventListener('change', updateFormData);
    checkOut.addEventListener('change', updateFormData);
    
    function updateFormData() {
      const formData = new FormData(modalForm);
      formData.set('checkIn', checkIn.value);
      formData.set('checkOut', checkOut.value);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // сохраните обновленные данные в объект FormData
    }
    
    bindPostData(modalForm);

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
    
        postData('http://localhost:3000/subscribe', json)
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

    // Slider rooms

// Slider - single room

let laptop = document.querySelectorAll('.rooms__img');
let pointe = document.querySelectorAll('.rooms__slider');
let pointeParent = document.querySelector('.rooms__sliderBox');

function hideSlide() {


    laptop.forEach(item => {

        item.classList.remove('rooms__img-active');
        item.classList.remove('rooms__img');
        item.classList.add('rooms__img');
    })


    pointe.forEach(item => {

        item.classList.remove('rooms__slider-active');
        item.classList.remove('rooms__slider');
        item.classList.add('rooms__slider');

    });
}

function showSlide(i=0) {

    laptop[i].classList.remove('rooms__img');
    laptop[i].classList.add('rooms__img-active');

    pointe[i].classList.remove('rooms__slider');
    pointe[i].classList.add('rooms__slider-active');
}

hideSlide();
showSlide();

pointeParent.addEventListener('click', function(event) {
    const target = event.target;

    if(target && target.classList.contains('rooms__slider')) {
        pointe.forEach((item, i) => {
            if(target === item) {
                hideSlide();
                showSlide(i);
            }
        });
    }
});

// Slider - double room

  let doubleImg = document.querySelectorAll('.rooms__img_1');
  let doublepointe = document.querySelectorAll('.rooms__slider_1');
  let doublepointeParent = document.querySelector('.rooms__sliderBox_1');

  function hideSlideDouble() {


    doubleImg.forEach(item => {

          item.classList.remove('rooms__img_1-active');
          item.classList.remove('rooms__img_1');
          item.classList.add('rooms__img_1');
      })


      doublepointe.forEach(item => {

          item.classList.remove('rooms__slider_1-active');
          item.classList.remove('rooms__slider_1');
          item.classList.add('rooms__slider_1');

      });
  }

  function showSlideDouble(i=0) {

    doubleImg[i].classList.remove('rooms__img_1');
    doubleImg[i].classList.add('rooms__img_1-active');

    doublepointe[i].classList.remove('rooms__slider_1');
    doublepointe[i].classList.add('rooms__slider_1-active');
  }

  hideSlideDouble();
  showSlideDouble();

  doublepointeParent.addEventListener('click', function(event) {
      const target = event.target;

      if(target && target.classList.contains('rooms__slider_1')) {
        doublepointe.forEach((item, i) => {
              if(target === item) {
                hideSlideDouble();
                showSlideDouble(i);
              }
          });
      }
  });

  //Slider twin room

  // Slider - double room

  let twinImg = document.querySelectorAll('.rooms__img_2');
  let twinpointe = document.querySelectorAll('.rooms__slider_2');
  let twinpointeParent = document.querySelector('.rooms__sliderBox_2');

  function hideSlideTwin() {


    twinImg.forEach(item => {

          item.classList.remove('rooms__img_2-active');
          item.classList.remove('rooms__img_2');
          item.classList.add('rooms__img_2');
      })


      twinpointe.forEach(item => {

          item.classList.remove('rooms__slider_2-active');
          item.classList.remove('rooms__slider_2');
          item.classList.add('rooms__slider_2');

      });
  }

  function showSlideTwin(i=0) {

    twinImg[i].classList.remove('rooms__img_2');
    twinImg[i].classList.add('rooms__img_2-active');

    twinpointe[i].classList.remove('rooms__slider_2');
    twinpointe[i].classList.add('rooms__slider_2-active');
  }

  hideSlideTwin();
  showSlideTwin();

  twinpointeParent.addEventListener('click', function(event) {
      const target = event.target;

      if(target && target.classList.contains('rooms__slider_2')) {
        twinpointe.forEach((item, i) => {
              if(target === item) {
                hideSlideTwin();
                showSlideTwin(i);
              }
          });
      }
  });

  
})


