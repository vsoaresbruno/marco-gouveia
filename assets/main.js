
const slider = tns({
    container: '.testimonials-slider',
    items: 1,
    controlsText: ["",""],
    navAsThumbnails: true,
    navPosition: "bottom",
    edgePadding: 15,
    responsive: {
      640: {
        edgePadding: 20,
        gutter: 20,
        items: 2
      },
      700: {
        gutter: 30
      },
      900: {
        items: 3
      }
    }
  });

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

let ctaPurchase
if(params.ctaPurchase) ctaPurchase = params.ctaPurchase.toLowerCase();

if(ctaPurchase === 'true'){
    const purchaseContent = document.querySelectorAll(".js-cta-purchase");
    const templatePurchase = 
    '<a href="https://pay.hotmart.com/D77065045R?bid=1672657946345" class="form__submit">Vivamus a vulpOtate!</a>' +
    '<h1 class="paragraph paragraph--cta">Assina por apenas 17,49€ por mês!</h1>';

    changeLogo()
    purchaseContent.forEach(function(content) {
        content.innerHTML = templatePurchase;
        if (content.classList.contains('js-cta-purchase--black')){
            content.children[1].classList.add('paragraph--black');
        }
    });
    
} else {
    const scrollBtn = document.querySelectorAll(".js-devices");
    scrollBtn.forEach(function(btn) {
        btn.removeAttribute('href')
        btn.classList.add('scrollTo');

        if(btn.classList.contains('scrollTo')){
            btn.addEventListener("click", function() {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });
        }
    });
}

function changeLogo(){
    const logo = document.querySelector(".logo");
    logo.classList.remove('logo');
    logo.classList.add('logo-community');
    console.log(logo)
}

// This code loads the IFrame Player API code asynchronously.
const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$("#js-header-videoContainer").hide();

let player;
$("#js-header-video").click(function(){
    if($("#js-header-videoContainer").is("div")) {
        $(this).hide();
        $("#js-header-videoContainer").show()

        player = new YT.Player('player', {
            height: '100%',
            width: '100%',
            playerVars: { 'controls': 1, 'autohide': 1, autoplay: 1},
            videoId: 'SkpRMlsVgsw',
            events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
            }
        });
    }
    else {
        player.autohide = 1;
        player.playVideo();
    }
    // when video ends
    function onPlayerReady(event) {
        event.target.playVideo();
        event.target.setVolume(30);
    } 
    
    function onPlayerStateChange(event) {        
        if(event.data === 0) {            
            $("#player").remove(); 
            $("#js-header-videoContainer").append('<div id ="player" width="100%" height="100%" align="left" style="margin-right:30px;"></div>');
            $("#js-header-videoContainer").hide()
            $("#js-header-video").show();
        }
    }
});