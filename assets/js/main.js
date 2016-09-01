/*
    Miniport by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    skel
        .breakpoints({
            desktop: '(min-width: 737px)',
            tablet: '(min-width: 737px) and (max-width: 1200px)',
            mobile: '(max-width: 736px)'
        })
        .viewport({
            breakpoints: {
                tablet: {
                    width: 1080
                }
            }
        });

    $(function() {

        var $window = $(window),
            $body = $('body');

        // Disable animations/transitions until the page has loaded.
            $body.addClass('is-loading');

            $window.on('load', function() {
                $body.removeClass('is-loading');
            });

        // Fix: Placeholder polyfill.
            $('form').placeholder();

        // Prioritize "important" elements on mobile.
            skel.on('+mobile -mobile', function() {
                $.prioritize(
                    '.important\\28 mobile\\29',
                    skel.breakpoint('mobile').active
                );
            });

        // CSS polyfills (IE<9).
            if (skel.vars.IEVersion < 9)
                $(':last-child').addClass('last-child');

        // Scrolly.
            $window.load(function() {

                var x = parseInt($('.wrapper').first().css('padding-top')) - 15;

                $('#nav a, .scrolly').scrolly({
                    speed: 1000,
                    offset: x
                });

            });

    });

})(jQuery);

// forked from MICKey's "線がカクカクうねうね" http://jsdo.it/MICKey/A9c4
var canvas,ctx,bal,bai,timer;

function init(){
    clearTimeout(timer);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    bai=(canvas.width>canvas.height)?canvas.height:canvas.width;
    bai=bai/200;
}

window.addEventListener('resize', function(){
    clearTimeout(timer);timer=setTimeout(init,200);}, false);

(function(){
    var a,b;
    canvas = document.getElementsByTagName('canvas')[0];
    ctx = canvas.getContext('2d');
    canvas.width=canvas.height=400;
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    bal=[];
    for(a=0;a<1500;a++){
        b={};
        b.x=Math.random()*Math.PI*2;
      
        b.y=Math.random();
        b.z=Math.random()*0.9+0.1;
        b.t=(Math.random()*3)|0;
        b.h=(Math.random()<0.5);
        b.c=(Math.random()*360)|0;
        bal.push(b);
    }
  init();
    aaa();
})();

function aaa(){
    var a,b,c,s,x,y,x1,y1,tx,ty;
    ctx.fillStyle="rgba(0,0,0,0.02)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
  
  tx=canvas.width/2;
  ty=canvas.height/2;
    for(a=0;a<bal.length;a++){
        b=bal[a];
        s=1.1-b.z;
        if(b.t==2){
            if(b.h){
                b.z+=0.004;
                if(b.z>1)b.h=!b.h;
            }else{
                b.z-=0.004;
                if(b.z<0.1)b.h=!b.h;
            }
        }else if(b.t==1){
            if(b.h){
                b.x+=0.02*s;
            }else{
                b.x-=0.02*s;
            }
        }else{
            b.y=(b.y+0.006*s)%1;
        }
        
        if(Math.random()<0.2){
            b.t=(Math.random()*3)|0;
            b.h=(Math.random()<0.5);
        }
        
        x=b.x;
        y=b.y*b.y+0.01;
        x1=Math.cos(x)*y*500*b.z*bai;
        y1=Math.sin(x)*y*500*b.z*bai;
        if(x1<-tx*bai || y1<-ty*bai || x1>tx*bai || y1>ty*bai)continue;
        c=((1-y)*50)|0;
        c+=50;
        ctx.fillStyle="hsla("+b.c+",90%,"+c+"%,1)";
        ctx.beginPath();
        ctx.arc(x1+tx,y1+ty,y*3*bai,0,Math.PI*2,0);
        ctx.fill();
    }
    requestAnimationFrame(aaa);
}