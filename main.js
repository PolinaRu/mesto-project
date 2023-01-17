(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}e.d({},{x:()=>k});var n={baseUrl:"https://nomoreparties.co/v1/".concat("plus-cohort-18"),headers:{authorization:"5b45f221-72d7-4784-b785-08afdc8a8197","Content-Type":"application/json"}},r=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(e.inactiveButtonClass)):(n.disabled=!0,n.classList.add(e.inactiveButtonClass))},o=document.querySelector("#add-Element"),c=document.querySelector("#nameEl"),a=document.querySelector("#linkEl"),i=document.querySelector(".profile__name"),u=document.querySelector(".profile__about"),l=document.querySelector(".profile__avatar"),s=document.querySelector("#edit-Profile"),d=document.querySelector("#edit-Avatar"),m=document.querySelector("#name"),f=document.querySelector("#about"),p=document.querySelector("#linkAva"),v=document.querySelector(".profile__edit"),h=document.querySelector(".profile__add-button");function y(e){"Escape"===e.key&&S(document.querySelector(".popup_opend"))}function _(e){e.target.classList.contains("popup_opend")&&S(e.target)}function b(e){e.classList.add("popup_opend"),document.addEventListener("keydown",y),document.addEventListener("mousedown",_)}function S(e){e.classList.remove("popup_opend"),document.removeEventListener("keydown",y),document.removeEventListener("mousedown",_)}function g(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...";t.textContent=e?r:n}function E(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";t.preventDefault();var r=t.submitter,o=r.textContent;g(!0,r,o,n),e().then((function(){t.target.reset()})).catch((function(e){console.error(e)})).finally((function(){g(!1,r,o)}))}v.addEventListener("click",(function(){m.value=i.textContent,f.value=u.textContent,b(s)})),h.addEventListener("click",(function(){b(o)})),l.addEventListener("click",(function(){b(d)}));var k,q=document.querySelector("#card-template").content,C=document.querySelector(".elements"),L=document.querySelector(".img-popup"),x=L.querySelector(".img-popup__background"),A=L.querySelector(".img-popup__name");function O(e){var r=q.querySelector(".element").cloneNode(!0),o=r.querySelector(".element__image"),c=r.querySelector(".element__like"),a=r.querySelector(".element__drop");return r.querySelector(".element__name").textContent=e.name,r.querySelector(".element__likes-count").textContent=e.likes.length,o.style.backgroundImage="url(".concat(e.link,")"),o.setAttribute("alt","".concat(e.name)),c.addEventListener("click",(function(r){!function(e,r){r.target.classList.contains("element__like_active")?function(e){return fetch("".concat(n.baseUrl,"/cards/likes/").concat(e._id),{method:"DELETE",headers:n.headers}).then(t)}(e).then((function(e){r.target.nextElementSibling.textContent=e.likes.length,r.target.classList.remove("element__like_active")})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(n.baseUrl,"/cards/likes/").concat(e._id),{method:"PUT",headers:n.headers}).then(t)}(e).then((function(e){r.target.nextElementSibling.textContent=e.likes.length,r.target.classList.add("element__like_active")})).catch((function(e){console.log(e)}))}(e,r)})),e.likes.some((function(e){return e._id===k}))&&c.classList.add("element__like_active"),k==e.owner._id?a.addEventListener("click",(function(r){(function(e){return fetch("".concat(n.baseUrl,"/cards/").concat(e._id),{method:"DELETE",headers:n.headers}).then(t)})(e).then((function(){return r.target.closest(".element").remove()}))})):a.style.display="none",o.addEventListener("click",(function(t){var n,r;n=e.name,r=e.link,A.textContent=n,x.style.backgroundImage="url(".concat(r,")"),x.setAttribute("alt","".concat(n)),b(L)})),r}function U(e){!function(e){C.prepend(e)}(O(e))}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}document.querySelector("#delete-Element");var w,P=document.forms["form-Profile"],T=document.forms["form-Element"],B=document.forms["form-Avatar"];document.querySelectorAll(".popup__close-button").forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return S(t)}))})),P.addEventListener("submit",(function(e){E((function(){return(e={name:m.value,about:f.value},fetch("".concat(n.baseUrl,"/users/me"),{method:"PATCH",headers:n.headers,body:JSON.stringify({name:e.name,about:e.about})}).then(t)).then((function(e){i.textContent=e.name,u.textContent=e.about,S(s)})).catch((function(e){console.error(e)}));var e}),e)})),B.addEventListener("submit",(function(e){E((function(){return(e={link:p.value},fetch("".concat(n.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:n.headers,body:JSON.stringify({avatar:e.link})}).then(t)).then((function(e){l.setAttribute("style","background-image: url(".concat(e.avatar,");")),S(d)})).catch((function(e){console.error(e)}));var e}),e)})),T.addEventListener("submit",(function(e){E((function(){return(e={name:c.value,link:a.value},fetch("".concat(n.baseUrl,"/cards"),{method:"POST",headers:n.headers,body:JSON.stringify({name:e.name,link:e.link})}).then(t)).then((function(e){U(e),S(o)})).catch((function(e){console.error(e)}));var e}),e)})),w={formSelector:".popup__form",inputSelector:".popup__text-input",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_disabled",inputErrorClass:"popup__text-input_type_error",errorClass:"popup__span-error_active",errorSpan:".popup__span-error"},Array.from(document.querySelectorAll(w.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);n.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,n){n.validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?function(e,t,n){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.remove(e.inputErrorClass),r.classList.remove(e.errorClass),r.textContent=""}(e,t,n):function(e,t,n,r){var o=t.querySelector(".".concat(n.id,"-error"));n.classList.add(e.inputErrorClass),o.textContent=r,o.classList.add(e.errorClass)}(e,t,n,n.validationMessage)}(e,t,c),r(e,n,o)}))})),r(e,n,o),t.addEventListener("reset",(function(){!function(e,t){Array.from(t.querySelectorAll(e.errorSpan)).forEach((function(e){e.textContent=""}))}(e,t),setTimeout((function(){r(e,n,o)}),0)}))}(w,e)})),Promise.all([fetch("".concat(n.baseUrl,"/users/me"),{headers:n.headers}).then(t),fetch("".concat(n.baseUrl,"/cards"),{headers:n.headers}).then(t)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?j(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];i.textContent=o.name,u.textContent=o.about,l.setAttribute("style","background-image: url(".concat(o.avatar,");")),k=o._id,c.forEach((function(e){U(e)}))})).catch((function(e){console.error(e)}))})();