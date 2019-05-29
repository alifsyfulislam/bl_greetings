var adContainer = document.querySelector('.ad_container');
var saveNotes = document.querySelector('.save_btn');
var shareNotes = document.querySelector('.share_btn');
var notes = document.querySelector('.description');
var placeholder = document.querySelector('.description::placeholder');
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');
var socioBox = document.querySelector('.socio_box');

var canvas = document.getElementById('canvas');

var images = [ 'images/img1.jpg', 'images/img2.jpg', 'images/img3.jpg'];

var shareImage = ['temp/temp1.jpg','temp/temp2.jpg','temp/temp3.jpg'];
var greetings = "";
var currentSlide = 0;



var slideIndex = 0;
var lastIndex = images.length;
showSlides(slideIndex);



function checkPos(val){
	if(val==2){
		notes.classList.add('description_note');
	}
	else{
		notes.classList.remove('description_note');
	}
	setTimeout(function() {
		notes.style.left= val ==0 ? "80px" : "100px";
	}, 200);
    setTimeout(function() {
		notes.style.left= val ==1 ? "80px" : "100px";
	}, 200);
    setTimeout(function() {
		notes.style.top= val ==2 ? "31px" : "5px";
	}, 200);
}


function plusSlides(n) {
    if (n<0){
        showSlides(slideIndex -= n)
    }
    else if (n<lastIndex) {
        showSlides(slideIndex += n);
    }
}
function showSlides(n) {
    currentSlide=n;
    if (n<lastIndex){
        adContainer.style.backgroundImage ='url(' + images[n] + ')';
        checkPos(n);
    }
    else {
        slideIndex = 0;
        adContainer.style.backgroundImage ='url(' + images[0] + ')';
        checkPos(0);
    }
}

function saveMessage() {
    // saveNotes.style.display = 'none';
    shareNotes.style.display = 'block';
    prev.style.display = 'block';
    next.style.display = 'block';
    socioBox.style.display = 'none';
    greetings = notes.value;
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
}

function shareMessage() {
    shareNotes.style.display = 'none';
    prev.style.display = 'none';
    next.style.display = 'none';
    socioBox.style.display = 'block';


    var img = new Image();
    // img.crossOrigin = "Anonymous";
    img.src = shareImage[slideIndex];

    if (slideIndex==0) {
        img.onload = function () {
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            ctx.rect(225, 5, 165, 100);
            ctx.font = "14px KongshoMJ";
            ctx.translate(0, 0);
            wrapText(ctx, greetings, 240, 25, 170, 24);
        }
    }else if (slideIndex==1) {
        img.onload = function () {
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            ctx.rect(225, 5, 165, 100);
            ctx.font = "14px KongshoMJ";
            ctx.translate(0, 0);
            wrapText(ctx, greetings, 200, 25, 170, 24);
        }
    } else if (slideIndex==2) {
        img.onload = function () {
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            ctx.rect(225, 5, 165, 100);
            ctx.font = "14px KongshoMJ";
            ctx.translate(0, 0);
            wrapText(ctx, greetings, 200, 60, 170, 24);
        }
    }

    setTimeout(savePng,1e3);

}

function noteRewrite() {
    shareNotes.style.display= 'block';
    prev.style.display = 'block';
    next.style.display = 'block';
    socioBox.style.display = 'none';
}


function savePng(){
  var canvasImg = document.getElementById('canvas')
  var dataURL = canvasImg.toDataURL();
  var quotes = [greetings, currentSlide]; 

    $.ajax({
            type: "POST",
            url: '//srpp.cubex.tech/jarvis/berger/language/database/script.php',
            data: {  
                imgBase64: dataURL,  
                quotes: quotes
            },
            success: function(data) {
                  fb_image +=data; 
                  console.log(data);
            },
            error: function(e) {
                console.log("error "+e)
            }
    }).done(function(o) {
      // console.log(o);
      // $(".thanks_share").fadeIn(1e3);
      // $(".fbsharelink").click(function(e){
      // fb_share(fb_image,'hello');
    // });
    });
}










