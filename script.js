/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const MAINMENU = 1;
const LEVELMENU = 2;
const GAMEOVER = 3;
const WIN = 4;
const LEVEL1 = 5;
const LEVEL2= 6;
var spelStatus = MAINMENU;

var spelerX = 50; // x-positie van speler
var spelerY = 680; // y-positie van speler

var kogelX = 60;    // x-positie van kogel
var kogelY = 680;    // y-positie van kogel

var platformX = 200;
var platformY = 555; 
var platformen = 3;

var vijandX = 250;   // x-positie van vijand
var vijandY = 680;   // y-positie van vijand
var kleineVijandX = 350;
var kleineVijandY = 692.5;
var groteVijandX = 700;
var groteVijandY = 600;

var groteVijandSize = 200;

var score = 100; // aantal behaalde punten

var springStatus = false;
var valStatus = false;
var sprongHoogte = 680;
var sprongSnelheid = 1;
var grondHoogte = 680;

var mouseWasClicked = false;
var mouseIsClicked = false;

var spelerFoto = 0;
    
/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill("white");
  rect(20, 20, width - 2 * 20, height - 2 * 20);
  
};


/*
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function() {
   fill('green');
   ellipse(vijandX, vijandY, 50, 50);
   ellipse(kleineVijandX, kleineVijandY, 25, 25);
   ellipse(groteVijandX, groteVijandY, groteVijandSize, groteVijandSize);
};


/*
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function() {
   fill('black');
   ellipse(kogelX, kogelY, 10, 10);
};


/*
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function() {
    ellipse(spelerX, spelerY, 50, 50)
};

/*
 * Tekent de platformen
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenPlatform = function() {
   for( var i = 0; i <= platformen; i++) {
    fill('red');
    rect(platformX + 250 * i, platformY, 200, 20);
   }
}

/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {

     if (spelerX > vijandX && vijandY > 25) {
        vijandX += 2.5;
    } else if ( spelerX < vijandX && vijandY > 25) {
        vijandX -= 2.5;
    } else if(vijandY < 20) {
            vijandX = vijandX;
        }

     if (spelerX > kleineVijandX && kleineVijandY > 12.5) {
        kleineVijandX += 4;
    } else if (spelerX < kleineVijandX && kleineVijandY > 12.5) {
      kleineVijandX -= 4;
    } else if(kleineVijandY < 20) {
          kleineVijandX = kleineVijandX;
        }

         if (spelerX > groteVijandX && groteVijandY > 100) {
        groteVijandX += 1;
    } else if (spelerX < groteVijandX && groteVijandY > 100) {
      groteVijandX -= 1;
    } else if(groteVijandY < 20) {
          groteVijandX = groteVijandX;
        }


    };


/**
 * Updatet globale variabelen met positie van kogel of bal
 */


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */

 var checkMouseIsClicked = function() {
    if(mouseIsPressed && mouseIsClicked === false && mouseWasClicked === false) {
        mouseIsClicked = true;

    } else if (mouseIsPressed) {
        mouseIsClicked = false;
        mouseWasClicked = true;

    } else {
        mouseIsClicked = false;
        mouseWasClicked = false;

    }
}

var beweegSpeler = function()  {
     if (keyIsDown(68) || keyIsDown(39)) {
        spelerX+= 5;
     } 
     if (keyIsDown(65) && spelerX > 50 || keyIsDown(37) && spelerX > 50) {
        spelerX-= 5;
     } 
     if (springStatus === false) {
         sprongHoogte = spelerY - 200;
     }
     if (keyIsDown(32) && springStatus === false && valStatus === false || keyIsDown(38) && springStatus === false && valStatus === false) {
         springStatus = true
     }
     if (springStatus === true) {
         spelerY = spelerY - Math.pow(sprongSnelheid, 2);
         sprongSnelheid = sprongSnelheid + 0.0000008;
     }
     if (spelerY <= sprongHoogte || (spelerY < grondHoogte && springStatus === false)) {
         valStatus = true;
         springStatus = false;
     }
     if (valStatus === true && spelerY < grondHoogte) {
         spelerY = spelerY + Math.pow(sprongSnelheid, 2);
         sprongSnelheid = sprongSnelheid + 0.0000008;
     }
     if (spelerY >= grondHoogte) {
         valStatus = false;
         sprongSnelheid = 3;
         spelerY = grondHoogte;
     }

};


var tekenScore = function() {
    var tekenScore = round(score);
    fill(255,0,0) //maakt de tekst rood
    textSize(50) //bepaalt de grootte van de tekst
    text("Score:" + tekenScore, 30, 30, 25, 50); //zet de score op het beeld
    score = score - (1/50); //iedere seconde wordt er 1 score weggehaald
};


/** 
  Zoekt uit of de vijand is geraakt
  @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {  
  if (kogelX >= vijandX - 25 && kogelX <= vijandX + 25 && kogelY >= vijandY - 25 && kogelY <= vijandY + 25 && mouseIsPressed) {
     score = score + 20; // wanneer een vijand geraakt is wordt er 20 aan de score toegevoegd
     vijandX = 600;
     vijandY = 10;
 } else if (kogelX >= kleineVijandX - 12.5 && kogelX <= kleineVijandX + 12.5 && kogelY >= kleineVijandY - 12.5 && kogelY <= kleineVijandY + 12.5 && mouseIsPressed) {
     score = score + 20;
     kleineVijandX = 600;
     kleineVijandY = 10;
 } else if (kogelX >= groteVijandSize - 100 && kogelX <= groteVijandSize + 100 && kogelY >= groteVijandSize - 100 && kogelY <= groteVijandSize + 100 && mouseIsPressed) {
     score = score + 2;
     groteVijandSize = 5;
 } else if (groteVijandSize <= 10){
     groteVijandX = 600
     groteVijandY = 10; 
 } else {
    return false; 
}

};

var checkPlatformGeraakt = function() {
    if(spelerX <= platformX + 210 && spelerX >= platformX && spelerY <= platformY) {
        spelerX >= platformX;
        spelerX <= platformX + 200;
        grondHoogte = platformY - 20;
    } else {
        grondHoogte = 680
    }
    
}

var beweegKogel = function() {
if (mouseIsPressed && mouseX > spelerX && kogelX < spelerX + 100) {
    kogelX += 10;
    } else if (mouseIsPressed === true && mouseX < spelerX && kogelX > spelerX - 100) {
        kogelX -= 10;
       } else {
        kogelX = spelerX;
        kogelY = spelerY;
    };
};

/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
        
        if(vijandX <= spelerX + 50 && vijandY === spelerY && vijandX >= spelerX - 50 && vijandY === spelerY){
            score -= 500;
        }  else if(kleineVijandX <= spelerX + 25 && kleineVijandY === spelerY + 12.5 && kleineVijandX >= spelerX - 25 && kleineVijandY === spelerY + 12.5){
            score -= 500;
        }  else if(groteVijandX + 200 <= spelerX && groteVijandY - 100 === spelerY && groteVijandX - 200 >= spelerX && groteVijandY + 100 === spelerY){
            score -= 500;
        }
        else {
        return false;
    }

};




/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
  if(score <= 0) {
      return true;
  }  
  else {
      return false; 
  }
};

var checkWin = function() {
if(spelerX > 1280) {
 return true;
}
else {
    return false;
 }
};

function preload() {
    spelerFoto = loadImage('./images/speler.png');
}

var gameReset = function() {
    spelerX = 50; // x-positie van speler
    spelerY = 680; // y-positie van speler
    kogelX = 60;    // x-positie van kogel
    kogelY = 680;    // y-positie van kogel
    vijandX = 250;   // x-positie van vijand
    vijandY = 680;   // y-positie van vijand
    kleineVijandX = 350;
    kleineVijandY = 692.5;
    groteVijandX = 700;
    groteVijandY = 600;
    score = 100; // aantal behaalde punten
    springStatus = false;
    valStatus = false;
    sprongHoogte = 680;
    sprongSnelheid = 1;
    grondHoogte = 680;
}

var gameSetup = function() {
    checkMouseIsClicked();
    beweegVijand();
    beweegKogel();
    beweegSpeler();
    preload();
    setup();  
    tekenVeld();
    tekenPlatform();
    tekenVijand();
    tekenKogel();
    tekenSpeler();
    tekenScore();
    checkVijandGeraakt();
    checkSpelerGeraakt();
    checkPlatformGeraakt();
}




/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}



/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  checkMouseIsClicked()
  switch (spelStatus) {
    case LEVEL1:
      gameSetup()
      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      if (checkWin()) {
          spelStatus = WIN
      }
      break;

      case GAMEOVER: 
        fill(207, 53, 23);
        rect(100,100,1100,550); // maakt een rechthoek
        fill(23, 32, 207)
        rect(200,450,400,100) //maakt een knop om opnieuw te spelen
        rect(700,450,400,100)
        fill(255,255,255);
        textSize(100)
        text('Game Over',400,150,600,450); // Zet de tekst "game over" op de rechthoek
        textSize(30)
        text('Probeer Opnieuw',275,480,250,525);
        text('Terug naar hoofdmenu',750,480,850,600);
        if(mouseX > 200 && mouseX < 600 && mouseY > 450 && mouseY < 650 && mouseIsClicked){
        spelStatus = LEVEL1
        gameReset();
        }
        if(mouseX > 700 && mouseX < 1100 && mouseY > 450 && mouseY < 650 && mouseIsClicked){
        spelStatus = MAINMENU
        gameReset();
        }
        break;

     case MAINMENU:
         background(155,255,155);
         fill(0,0,0);
         textSize(100)
         text('[Game naam hier]',250,75,1000,300);
         fill(23, 32, 207)
         rect(375,400,500,100) // maakt een knop om een level te kiezen
         rect(375,550,500,100) // maakt een knop voor het uitlegscherm
         fill(255,255,255)
         textSize(40)
         text('Kies level',530,425,500,450)
         text('Uitleg',565,575,500,600)
         if(mouseX > 375 && mouseX < 875 && mouseY > 400 && mouseY < 500 && mouseIsClicked){ 
            spelStatus = LEVELMENU
         } 
         if(mouseX > 375 && mouseX < 875 && mouseY > 550 && mouseY < 750 && mouseIsClicked) {
            spelStatus = UITLEG 
         }
         break;
     
      case LEVELMENU:
          var knopY= 180;
          var i = 1;
          fill(94, 157, 219)
          rect(200,200,900,510)
          for(i = 1; i < 6; i++) {
              fill(217, 171, 46)
              rect(450,knopY + i * 90,400,70)
              fill(0,0,0)
              text('level ' + i, 550, knopY + i * 90,700,900 )
          }
          if(mouseX > 450 && mouseX < 850 && mouseY > knopY && mouseY < 340 && mouseIsClicked) {
                  spelStatus = LEVEL1
              }
          fill(0,0,0)
          textSize(60)
          text('Levels',560,200,600,250)

      break;

      case UITLEG:
          background(255,255,255)
          textSize(50)
          fill(0,0,0)
          text('Gebruik',30,100,100,200)
          text('Of gebruik linker- en rechterpijltje om te bewegen',480,80,800,200)
          text('Druk op spatiebar of op pijl-omhoog om te springen',30,250,2000,400)
          for( var i = 0; i < 2; i++) {
           var toetsX= 225 + i * 125;
            rect(toetsX,90,100,100)
           }
           fill(255,255,255)
           textSize(70)
           text('A',245,100,400,300)
           text('D',370,100,400,300)
          
      break;

     case WIN:
        fill(59, 156, 17);
        rect(100,100,1100,550); // maakt een rechthoek
        fill(23, 32, 207)
        rect(200,450,400,100) //maakt een knop om opnieuw te spelen
        rect(700,450,400,100)
        fill(255,255,255);
        textSize(100)
        text('Level Voltooid!',325,150,700,450); // Zet de tekst "level voltooid" op de rechthoek
        textSize(30)
        text('Volgend level',300,480,250,525);
        text('Terug naar hoofdmenu',750,480,850,600);
        if(mouseX > 200 && mouseX < 600 && mouseY > 450 && mouseY < 650 && mouseIsClicked){
        spelStatus = LEVEL1
        gameReset();
        }
        if(mouseX > 700 && mouseX < 1100 && mouseY > 450 && mouseY < 650 && mouseIsClicked){
        spelStatus = MAINMENU
        gameReset();
        }
        break;

      case LEVEL2: 
         gameSetup()

         break;

  }
}
