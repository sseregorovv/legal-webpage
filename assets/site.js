const menuButton=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('.mobile-nav');
function closeMenu(){if(!menuButton||!mobileMenu)return;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Открыть меню');mobileMenu.hidden=true;}
menuButton?.addEventListener('click',()=>{const expanded=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!expanded));menuButton.setAttribute('aria-label',expanded?'Открыть меню':'Закрыть меню');mobileMenu.hidden=expanded;});
mobileMenu?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton?.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
window.matchMedia('(min-width: 641px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
document.querySelectorAll('.faq details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)document.querySelectorAll('.faq details').forEach(other=>{if(other!==detail)other.open=false;});}));
