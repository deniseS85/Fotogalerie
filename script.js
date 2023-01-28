let arrayImages = ['img/image1.jpeg','img/image2.jpeg','img/image3.jpeg','img/image4.jpeg','img/image5.jpeg','img/image6.jpeg','img/image7.jpeg','img/image8.jpeg','img/image9.jpeg','img/image10.jpeg','img/image11.jpeg','img/image12.jpeg','img/image13.jpeg','img/image14.jpeg','img/image15.jpeg','img/image16.jpeg','img/image17.jpeg','img/image18.jpeg','img/image19.jpeg','img/image20.jpeg','img/image21.jpeg','img/image22.jpeg','img/image23.jpeg','img/image24.jpeg','img/image25.jpeg','img/image26.jpeg','img/image27.jpeg','img/image28.jpeg','img/image29.jpeg','img/image30.jpeg','img/image31.jpeg','img/image32.jpeg','img/image33.jpeg','img/image34.jpeg','img/image35.jpeg','img/image36.jpeg'];

let currentnumber = 0;
let timer;
let timer_on = 0;
let currentindex;

// Fotos werden vom Array geladen und im imageContainer angezeigt
function showImages() {
    let imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML += '';

    for (let i = 0; i < arrayImages.length; i++) {
        imageContainer.innerHTML += /*html*/ `
            <img class="images" loading="lazy" src="${arrayImages[i]}" onclick="selectImage(${i})">
        `;
    }
}

// Bei Klick öffnet sich ein neues Div ("fullSize")
function selectImage(i) {
    
    let imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML += '';
    currentindex = i;

    imageContainer.innerHTML += /*html*/ `
    <div class="fullSize" id="fullSize">
        <div class="menu">
            <div class="numbertext">${i+1}/${arrayImages.length}</div>
            <div class="slideshowButton">
                <div onclick="startSlideshow()" id="startSlide" class="startSlide">Start Diashow</div>
                <div onclick="breakSlideshow()" id="stopSlide" class="stopSlide">Stop Diashow</div>
            </div>
            <span class="close" onclick="closeImage(); stopSlideshow()">&times;</span>
        </div>
            <div class="mySlides transition">
                <img src="${arrayImages[i]}" class="imageFull">
            </div>
                <div class="arrows">
                    <a class="prev" id="prev" onclick="prevImg(${i-1})">&#10094;</a>
                    <a class="next" id="next" onclick="nextImg(${i+1})">&#10095;</a>
                </div>
    </div>`;
}

       /*  <div class="fullSize" id="fullSize">
            <span class="close" onclick="closeImage(); stopSlideshow()">&times;</span>
            <div>
                <div class="mySlides transition">
                    <div class="numbertext">${i+1}/${arrayImages.length}</div>
                    <div onclick="startSlideshow()" id="startSlide" class="startSlide">Start Diashow</div>
                    <div onclick="breakSlideshow()" id="stopSlide" class="stopSlide">Stop Diashow</div>
                    <img src="${arrayImages[i]}" class="imageFull">
                </div>
                <a class="prev" id="prev" onclick="prevImg(${i-1})">&#10094;</a>
                <a class="next" id="next" onclick="nextImg(${i+1})">&#10095;</a>
            </div>
        </div>
    `;
 */

// Div "Fullsize" wird entfernt
function closeImage() {
    document.getElementById('fullSize').remove();
}

// Parameter = i-1, if-Abrage wahr, dann wird das vorherige Bild geladen
function prevImg(i) {
    if (i == -1) {
        i = arrayImages.length - 1;
    } else {
        document.getElementById('fullSize').innerHTML = `<img src="${arrayImages[i]}" class="imageFull">`;
    }
    selectImage(i);
    closeImage();
}

// Parameter i+1, if-Abfrage wahr, dann wird das nächste Bild geladen 
function nextImg(i) {
    if (i == arrayImages.length) {
        i = arrayImages.length - arrayImages.length;
    } else {
        document.getElementById('fullSize').innerHTML = `<img src="${arrayImages[i]}" class="imageFull"`;
    }

    selectImage(i);
    closeImage();
}

// Bei Diashow werden die Pfeile ausgeblendet
function noShowprevNext() {
    document.getElementById('prev').style.display = 'none';
    document.getElementById('next').style.display = 'none';
}

// Start-Div und Stop-Div werden visuell inaktiv
function activeButtonStart() {
    document.getElementById('startSlide').style.opacity = '50%';
    document.getElementById('startSlide').style.pointerEvents = 'none'; 

    document.getElementById('stopSlide').style.opacity = '100%';
    document.getElementById('stopSlide').style.pointerEvents = 'auto'; 
}

function activeButtonStop() {
    document.getElementById('startSlide').style.opacity = '100%';
    document.getElementById('startSlide').style.pointerEvents = 'auto'; 

    document.getElementById('stopSlide').style.opacity = '50%';
    document.getElementById('stopSlide').style.pointerEvents = 'none'; 
}

function slideshow() {
    selectImage(currentnumber);
    currentnumber ++;

    timer = setTimeout(slideshow, 3000);

    if (currentnumber == arrayImages.length) {
        currentnumber = 0;
    }
    closeImage();
    noShowprevNext();
    activeButtonStart();
}

function startSlideshow() {
    if (!timer_on) {
        timer_on = 1;
    }
    slideshow();  
}

function breakSlideshow() {
    clearTimeout(timer);
    timer_on = 0;
    activeButtonStop();
}

function stopSlideshow() {
    clearTimeout(timer);
    currentnumber = 0;
}

// Keyboard-Tasten
document.addEventListener('keydown', function (e) {
    switch (e.key) {
      case 'ArrowLeft':
        prevImg(currentindex-1);
        break;
      case 'ArrowRight':
        nextImg(currentindex+1);
        break;
      case 'Enter':
        startSlideshow();
        break;
      case ' ':
        breakSlideshow();
        break;
      case 'Escape':
        closeImage(); 
        stopSlideshow();
        break;
    }
});