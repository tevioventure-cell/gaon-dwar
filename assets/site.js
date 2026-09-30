/* GaonDwar — shared site script: mobile menu, scroll reveal, khana grid animation */
(function(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* mobile menu */
  var bg=document.querySelector('.burger'), menu=document.getElementById('menu');
  if(bg&&menu){
    bg.addEventListener('click',function(){var o=menu.classList.toggle('open');bg.setAttribute('aria-expanded',o?'true':'false');});
    menu.addEventListener('click',function(e){if(e.target.tagName==='A'){menu.classList.remove('open');bg.setAttribute('aria-expanded','false');}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){menu.classList.remove('open');bg.setAttribute('aria-expanded','false');}});
  }

  /* khana grid: puja step ⇄ samagri, fast ripple + moving highlight */
  var ICON={
    cloth:'<path d="M4 6h16v12H4z"/><path d="M4 10h16M4 14h16"/>',
    vial:'<path d="M9 3h6M10 3v4l-3 5v7a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-7l-3-5V3"/><path d="M7.5 14h9"/>',
    kusha:'<path d="M12 21V11M12 11c-3-2-5-5-5-8M12 11c3-2 5-5 5-8M12 14c-2-1-4-3-4-6M12 14c2-1 4-3 4-6"/>',
    powder:'<path d="M5 14h14l-1.5 5h-11z"/><path d="M8 14c0-3 1.8-5 4-5s4 2 4 5"/>',
    card:'<rect x="6" y="3" width="12" height="18" rx="1.5"/><circle cx="12" cy="10" r="3"/><path d="M8 17h8"/>',
    stick:'<path d="M12 21V8"/><path d="M12 6c-1-1 1-2 0-3M14 7c0-1 1.5-1.5 1-3"/>',
    pouch:'<path d="M7 8h10l2 12H5z"/><path d="M9 8c0-2 1.3-4 3-4s3 2 3 4"/>',
    diya:'<path d="M3 13c2 4 5.5 6 9 6s7-2 9-6z"/><path d="M12 13c-1.5-1.5-1.5-4 0-6 1.5 2 1.5 4.5 0 6z"/>',
    home:'<path d="M4 20V10l8-6 8 6v10z"/><path d="M10 20v-5h4v5"/>'
  };
  var CELLS=[
    ['चौकी','cloth','वस्त्र','लाल · पीला · अंगवस्त्र'],
    ['कलश','vial','गंगाजल','हरिद्वार से · कलावा'],
    ['संकल्प','kusha','कुश पवित्री','दो पवित्री'],
    ['गणेश पूजन','powder','रोली · चंदन','तिलक के लिए'],
    ['आवाहन','card','भगवान का चित्र','पीछे आरती'],
    ['षोडशोपचार','stick','इत्र · जनेऊ','कन्नौज का इत्र · धूप'],
    ['हवन','pouch','हवन सामग्री','हाथरस · कंडे · समिधा'],
    ['आरती','diya','दीया','खुर्जा · बत्ती · कपूर'],
    ['प्रसाद','home','प्रसाद','आपके घर से']
  ];
  function svg(n){return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICON[n]+'</svg>';}
  [].forEach.call(document.querySelectorAll('[data-grid]'),function(box){
    var cap=box.parentNode.parentNode.querySelector('[data-cap]');
    var ks=CELLS.map(function(c,i){
      var d=document.createElement('div');d.className='k'+(i===8?' home':'');
      d.innerHTML='<div class="face a">'+svg(c[1])+'<div class="step">'+c[0]+'</div></div><div class="face b">'+svg(c[1])+'<div class="t">'+c[2]+'</div><div class="e">'+c[3]+'</div></div>';
      box.appendChild(d);return d;
    });
    if(reduce){if(cap)cap.innerHTML='<b>21 सामग्री</b> · एक डिब्बे में';return;}
    var alt=false, hi=-1, live=true;
    /* ripple: every khana swaps step ⇄ samagri, one after another, fast */
    setInterval(function(){
      if(!live)return;
      alt=!alt;
      ks.forEach(function(k,i){setTimeout(function(){k.classList.toggle('alt',alt);},i*70);});
    },1700);
    /* highlight walks the khane */
    setInterval(function(){
      if(!live)return;
      if(hi>=0)ks[hi].classList.remove('on');
      hi=(hi+1)%8;
      ks[hi].classList.add('on');
      if(cap)cap.innerHTML='<b>'+CELLS[hi][0]+'</b> · '+CELLS[hi][2];
    },850);
    /* pause when off screen */
    if('IntersectionObserver' in window){new IntersectionObserver(function(en){live=en[0].isIntersecting;}).observe(box);}
  });

  /* scroll reveal with a small stagger */
  var rv=[].slice.call(document.querySelectorAll('.rv'));
  if(reduce||!('IntersectionObserver' in window)){rv.forEach(function(e){e.classList.add('in');});return;}
  var io=new IntersectionObserver(function(en){
    var n=0;
    en.forEach(function(e){if(e.isIntersecting){var el=e.target;setTimeout(function(){el.classList.add('in');},(n++)*70);io.unobserve(el);}});
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  rv.forEach(function(e){io.observe(e);});
})();
