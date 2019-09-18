//////////////////////////////////////////////// мобильное меню

let buttonBurger = document.querySelector('.button-burger');
let fullscreen = document.querySelector('.fullscreen');
let bodystyle = document.querySelector('.body');
buttonBurger.addEventListener('click', function() { fullscreen.style.right = '0' });
let fullscreenExit = document.querySelector('.fullscreen__close');
fullscreenExit.addEventListener('click', function() { fullscreen.style.right = '-100%' });
fullscreenExit.addEventListener('click', function() { document.getElementsByTagName("body")[0].style.overflow="auto"; });
buttonBurger.addEventListener('click', function() { document.getElementsByTagName("body")[0].style.overflow="hidden";});

////////////////////////////////////////// Меню ( горизонтальный аккордеон)

let menu = document.querySelector('.options');
let optionsItem = document.querySelectorAll('.options__item');
let optionsItemLength = optionsItem.length;

menu.addEventListener('click', function(e) {
   for (let i = 0; i < optionsItemLength; i++) {
      optionsItem[i].classList.remove('options__item--active');
   }
});

for (let i = 0; i < optionsItemLength; i++) {
      optionsItem[i].addEventListener('click', function(e) {
         e.stopPropagation();
         e.preventDefault();

         if (optionsItem[i].classList.contains('options__item--active')) {
            optionsItem[i].classList.remove('options__item--active')
         } else { 
            for (let i=0; i < optionsItemLength; i++) { 
               optionsItem[i].classList.remove('options__item--active');
            }                     
            optionsItem[i].classList.add('options__item--active')
         }
      })
   }

//////////////////////////////////////// меню вертикальное 

let accordeonItem = document.querySelectorAll('.accordeon__item');
let accordeonItemLenght = accordeonItem.length;

for (let i = 0; i < accordeonItemLenght; i++) {
   accordeonItem[i].addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();

      if (accordeonItem[i].classList.contains('accordeon__item--active')) {
         accordeonItem[i].classList.remove('accordeon__item--active')
      } else {
         for (let i=0; i < accordeonItemLenght; i++) { 
            accordeonItem[i].classList.remove('accordeon__item--active');
         }
         accordeonItem[i].classList.add('accordeon__item--active')
      }
   })
}

////////////////////////////////////// слайдер бургеров (jQuery)

let contentList = $('.burgers__block-menu');
let contentItem = $('.burgers__block-item');
let duration = 500;

      var moveSlide = function (container, slideNum) {
         let contenItemActive = $('.burgers__block-item--active');
         let reqItem = contentItem.eq(slideNum);
         let reqIndex = reqItem.index();
         
         if (reqItem.length) {
            contentList.animate({'left' : -reqIndex * 100 + '%'
            }, duration, function() {
               contenItemActive.removeClass('burgers__block-item--active');
               reqItem.addClass('burgers__block-item--active');
            });
         }
      }

      $('.burgers__scroll').on('click', function(e){
         e.preventDefault();

         var   $this = $(this), 
               container = $this.closest('.container__burgers'),
               items = $(contentItem, container),
               contenItemActive = items.filter('.burgers__block-item--active'),
               nextItem = contenItemActive.next(),
               prevItem = contenItemActive.prev(),
               existedItem, edgeItem, reqItem;

         if   ($this.hasClass('burgers__scroll-right')) { // вперед
               existedItem = contenItemActive.next();
               edgeItem = items.first();
         } 
         
         if   ($this.hasClass('burgers__scroll-left')) {
               existedItem = contenItemActive.prev();
               edgeItem = items.last();

         }

         reqItem = existedItem.length ? existedItem.index() : edgeItem.index();
         

         moveSlide(container, reqItem);
      });

/* Слайдер на ваниле
let scrollLeft = document.querySelector('.burgers__scroll-left');
let scrollRight = document.querySelector('.burgers__scroll-right');
let contentList = document.querySelector('.burgers__block-menu');


scrollRight.addEventListener('click', function(e) { 
   e.preventDefault(), contentList.appendChild(contentList.firstElementChild) 
});

scrollLeft.addEventListener('click', function(e) { 
   e.preventDefault(), contentList.insertBefore(contentList.lastElementChild, contentList.firstElementChild) });
   */

/////////////////////////////////////////////// Скролл

/* Скролл 1 вариант не доделанный
$(document).ready(function(){

   let screen = 0;
   let container = $('.maincontent');
   let pages = $('.section');
   let inscroll = false;

   $('.section:first-child').addClass('active');

   $('body').on('mousewheel', function(e){

      let activePage = pages.filter('.active')

      if (!inscroll) {
         inscroll = true;

         if (e.deltaY > 0) {

            if (activePage.prev().length) {
               screen--;
            }
         } else {

            if (activePage.next().length) {
               screen++;
            }

         }
   }
   
      let position = (-screen * 100) + '%';
      console.log(position);
      

      pages.eq(screen).addClass('active').siblings().removeClass('active');
      container.css('top', position);

      setTimeout(function(){
         inscroll = false;
      },1300);
   });
});

*/
const sections = $('.section');
const display = $('.maincontent');
let inscroll = false;

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const countPosition = sectionsEq => {
   return `${sectionsEq * -100}%`;
}

const switchActiveClass = (elems, elemEq) => {
   elems
      .eq(elemEq)
      .addClass('active')
      .siblings()
      .removeClass('active')
}

const unBlockScroll = () => {
   const transitionDuration = 1000;

   const touchScrollInertionTime = 300;
   setTimeout(() => {
      inscroll = false
   }, transitionDuration + touchScrollInertionTime);
}

const performTransition = sectionEq => {
   if (inscroll) return;

      inscroll = true;
      const position = countPosition(sectionEq);
      const switchFixedfMenuActiveClass = () => 
         switchActiveClass($('.scrolls__item'), sectionEq);
      
      switchFixedfMenuActiveClass();

      switchActiveClass(sections, sectionEq);
   
      display.css({
         transform: `translateY(${position})`
      });

      unBlockScroll();
}

const scrollViewport = directions => {
   const activeSection = sections.filter('.active');
   const nextSection = activeSection.next();
   const prevSection = activeSection.prev();

   if(directions === 'next' && nextSection.length) {
      performTransition(nextSection.index());
   }

   if (directions === 'prev' && prevSection.length) {
      performTransition(prevSection.index());
   }

}



$(document).on('wheel', function(e) {
   let deltaY = e.originalEvent.deltaY;

   if (deltaY < 0) {
      scrollViewport('prev');
   }

   if (deltaY > 0) {
      scrollViewport('next');
   }
});

$(document).on('keydown', e => {
   const tagName = e.target.tagName.toLowerCase();
   const userTypingInInputs = tagName === 'input' || tagName === 'textarea';

   if (userTypingInInputs) return;
      
   switch(e.keyCode) {
      case 38:
         scrollViewport('prev');
         break;
      case 40:
         scrollViewport('next');
         break;
   }
});

$('[data-scroll-to]').on('click', e => {
   e.preventDefault();

   const target = parseInt($(e.currentTarget).attr('data-scroll-to'));

   performTransition(target);
});


if (isMobile) {
   window.addEventListener(
      'touchmove',
       e => {
         e.preventDefault();
      },
      { passive: false}
   );
   
   
   $('body').swipe({
   
      swipe: (event, direction) => {
         let scrollDirection;
   
         if (direction === 'up') scrollDirection = 'next';
         if (direction === 'down') scrollDirection = 'prev';
   
         scrollViewport(scrollDirection);
      }
   });
}


/////////////////////////////////////////////// модалки

let reviews = document.querySelector('.reviews');
let reviewsTitle = document.querySelector('.reviews__title');
let popupTitle = document.querySelector('.popup__title');
let reviewsText = document.querySelector('.reviews__text');
let overlay = document.querySelector('.overlay');
let popupText = document.querySelector('.popup__text');
let popupClose = document.querySelector('.popup__close');

reviews.addEventListener('click', function (e) {
   e.preventDefault();
   let elem = e.target;

   if (elem.tagName === 'A') {
      let modalText = reviewsText.innerHTML;
      let modalTitle = reviewsTitle.innerHTML;

      popupText.innerHTML = modalText;
      popupTitle.innerHTML = modalTitle;
      overlay.style.display = 'block';
      document.getElementsByTagName("body")[0].style.overflow="hidden"; 
   }

   document.addEventListener('keyup', function (e) {
      let keyName = e.key;
      
      if(keyName === 'Escape') {
         overlay.style.display = 'none';
         document.getElementsByTagName("body")[0].style.overflow="auto"; 
      }
   })
});

popupClose.addEventListener('click', function (e) {
   overlay.style.display = 'none';
   document.getElementsByTagName("body")[0].style.overflow="auto"; 
})

/////////////////////////////////////////// Форма

let myForm = document.querySelector('.form__elem');
let formButton = document.querySelector('.form__btn');
let formOverlay = document.querySelector('.form__overlay');
let formClose = document.querySelector('.form__close');
let formPopup = document.querySelector('.popup');
let popupTextForm = document.querySelector('.popup__text-form');
let formNumber = document.querySelectorAll('.input-number');
let formNumberl = formNumber.length;
let formError = document.querySelectorAll('.error');

 
   for (let i = 0; i < formNumberl; i++)
   formNumber[i].addEventListener('keydown', function(e) {
      
   let isDigit = false;
   let isControl = false;
   let isBackspace = false;

   if (e.key >= 0 || e.key <= 9) {
      isDigit = true;
   }

   if (e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
      isControl = true;
   }

   if (e.key == 'Backspace') {
      isBackspace = true;
   }

   if (!isDigit && !isControl && !isBackspace) {
      e.preventDefault();
   }
});


formButton.addEventListener('click', function(e) {
   e.preventDefault();

   if (validateForm(myForm)) {
      let data = new FormData;
         data.append("name", myForm.elements.name.value);
         data.append("phone", myForm.elements.phone.value);
         data.append("comment", myForm.elements.comment.value);
         data.append("to", "my@gmail.com");

         const xhr = new XMLHttpRequest();
         xhr.responseType = 'json';
         xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
         xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
         xhr.send(data);
         xhr.addEventListener('load', function () {
            if (xhr.response.status) {

               formOverlay.style.display = 'block';
               popupTextForm.innerHTML = "Сообщение отправленно";
         } else {
               formOverlay.style.display = 'block';
               popupTextForm.innerHTML = "Отправить письмо не удалось, повторите запрос позже";
         }
         }); 
      }
   });

function validateForm(form) {

   let valid = true;

   if (!validateField(form.elements.name)) {
      valid = false;
   }

   if (!validateField(form.elements.phone)) {
      valid = false;
   }

   if (!validateField(form.elements.comment)) {
      valid = false;
   }

   return valid;
}

function validateField(field) {
     if (!field.checkValidity()) {
      formOverlay.style.display = 'block';
      popupTextForm.innerHTML = ['Заполните обязательные поля "Имя", "Телефон", "Комментарий"'];
      document.getElementsByTagName("body")[0].style.overflow="hidden";

      return false;
     } else {
      popupTextForm.innerHTML = '';
      return true;
     }
}

formClose.addEventListener('click', function (e) {
   formOverlay.style.display = 'none';
   document.getElementsByTagName("body")[0].style.overflow="auto";
});


//// Карты

ymaps.ready(init);

var placemarks = [
   {
      latitude: 59.89,
      longitude: 30.42,
      hintContent: '<di{v class="map__hint">ул. Бабушкина, д. 12</div>',
      balloonContent: [
         '<div class="map__ballon">',
         'Самыe вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д.19',
         '</div>'
      ]
   },

   {
      latitude: 59.88,
      longitude: 30.32,
      hintContent: '<di{v class="map__hint">ул. Заставская, д. 21к1</div>',
      balloonContent: [
         '<div class="map__ballon">',
         'Самыe вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д.19',
         '</div>'
      ]
   },

   {
      latitude: 59.90,
      longitude: 30.32,
      hintContent: '<di{v class="map__hint">ул. Киевская 6, д. 19</div>',
      balloonContent: [
         '<div class="map__ballon">',
         'Самыe вкусные бургеры у нас! Заходите по адресу: ул. Литераторов, д.19',
         '</div>'
      ]
   }
];

function init() {
   var map = new ymaps.Map('map', {
      center: [59.92, 30.31],
      zoom: 12,
      controls: ['zoomControl'],
      behaviors: ['drag']
   });

   placemarks.forEach(function(obj) {
      var placemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
         hintContent: obj.hintContent,
         balloonContent: obj.balloonContent.join('')
      },
      {
         iconLayout: 'default#image',
         iconImageHref: './img/map/map-marker.svg',
         iconImageSize: [46, 57],
         iconImageOffset: [-23, -57],
      });
      map.geoObjects.add(placemark);
   });
}

   
