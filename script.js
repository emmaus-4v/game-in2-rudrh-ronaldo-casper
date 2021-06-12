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
const LEVEL2 = 6;
const LEVEL3 = 7;
const LEVEL4 = 8;
const LEVEL5 = 9;
var spelStatus = MAINMENU;
var vorigeSpelStatus = MAINMENU;

var spelerX = 50; // x-positie van speler
var spelerY = 680; // y-positie van speler
var spelerSize = 50;

var kogelX = spelerX + 10;    // x-positie van kogel
var kogelY = spelerY;    // y-positie van kogel
var vijandKogelX = schietVijandX - 10;
var vijandKogelY = schietVijandY;

var platformX = 200;
var platformY = 555; 
var kleinePlatformX = 500;
var kleinePlatformY = 555;
var grotePlatformX =  700;
var grotePlatformY = 450;
var trapPlatformX = 1000;
var trapPlatformY = 555;

var vijandX = 250;   // x-positie van vijand
var vijandY = 680;   // y-positie van vijand
var kleineVijandX = 350;
var kleineVijandY = 692.5;
var groteVijandX = 700;
var groteVijandY = 600;
var balkVijandX = 1050;
var balkVijandY = 400;
var dierenVijandX = 1100;
var dierenVijandY = 660;
var schietVijandX = 900;
var schietVijandY = 680;

var groteVijandSize = 200;

var score = 100; // aantal behaalde punten

var springStatus = false;
var valStatus = false;
var sprongHoogte = 680;
var sprongSnelheid = 1;
var grondHoogte = 680;

var mouseWasClicked = false;
var mouseIsClicked = false;

var groteMeteorietX = Math.floor(Math.random() * 1280);
var groteMeteorietY = 0;
var kleineMeteorietX = spelerX;
var kleineMeteorietY = 0;
var meteorietX = Math.floor(Math.random() * 1280);
var meteorietY = 0;
var meteorietSize = Math.floor(Math.random() * 100) + 100;
var kleineMeteorietSize =  Math.floor(Math.random() * 50) + 50;
var groteMeteorietSize = Math.floor(Math.random() * 150) + 150;
    
/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  rect(20, 20, width - 2 * 20, height - 2 * 20);
  
};


var tekenKooi = function (){ 
    fill('yellow');
    rect(550, 0, 100, 100)
}

/*
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function() {
   fill('black');
   ellipse(kogelX, kogelY, 10, 10);
   ellipse(vijandKogelX, vijandKogelY, 10, 10);
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
   rect(balkVijandX, balkVijandY, 150, 35);
   ellipse(dierenVijandX, dierenVijandY, 50, 50);
   ellipse(dierenVijandX - 25, dierenVijandY + 25, 30, 30);
   ellipse(dierenVijandX - 50, dierenVijandY + 25, 30, 30);
   ellipse(dierenVijandX + 25, dierenVijandY + 25, 30, 30);
   ellipse(dierenVijandX + 50, dierenVijandY + 25, 30, 30);
   ellipse(dierenVijandX, dierenVijandY + 25, 30, 30);
   ellipse(schietVijandX, schietVijandY, 50, 50);
  
};

/*
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function() {
    ellipse(spelerX, spelerY, spelerSize, spelerSize);
};

/*
 * Tekent de platformen
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenPlatform = function() {
    fill('red');
    rect(platformX, platformY, 200, 20);
    rect(kleinePlatformX, kleinePlatformY, 140, 20);
    rect(grotePlatformX, grotePlatformY, 250, 20);
    rect(trapPlatformX, trapPlatformY, 200, 20);
}

var tekenLava = function() {
    fill('orange');
    rect(225, 700, 830, 20);
}

var tekenZwarteGat = function() {
    fill('brown');
    rect(225, 700, 830, 20);
}

var tekenMeteoriet = function() {
    fill('brown')
    ellipse(meteorietX, meteorietY, meteorietSize, meteorietSize);
    ellipse(kleineMeteorietX, kleineMeteorietY, kleineMeteorietSize, kleineMeteorietSize);
    ellipse(groteMeteorietX, groteMeteorietY, groteMeteorietSize, groteMeteorietSize);
    
}

/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {

     if (spelerX > vijandX && vijandY > 100) {
        vijandX += 2.5;
    } else if ( spelerX < vijandX && vijandY > 100) {
        vijandX -= 2.5;
    } else if(vijandY < 100) {
            vijandX = vijandX;
        }

     if (spelerX > kleineVijandX && kleineVijandY > 100) {
        kleineVijandX += 4;
    } else if (spelerX < kleineVijandX && kleineVijandY > 100) {
      kleineVijandX -= 4;
    } else if(kleineVijandY < 100) {
          kleineVijandX = kleineVijandX;
        }

         if (spelerX > groteVijandX && groteVijandY > 100) {
        groteVijandX += 1;
    } else if (spelerX < groteVijandX && groteVijandY > 100) {
      groteVijandX -= 1;
    } else if(groteVijandY < 100) {
          groteVijandX = groteVijandX;
        }
        
         if (spelerX > balkVijandX && balkVijandY > 100 && spelerX < balkVijandX + 150 && spelerY > balkVijandY) {
        balkVijandY += 10;
    } else if (spelerX > balkVijandX && balkVijandY > 100 && spelerX < balkVijandX + 150 && spelerY < balkVijandY) {
        balkVijandY -= 10;
    } else if(balkVijandY < 100) {
          balkVijandX = balkVijandX;
        }
     
        if (spelerX > dierenVijandX + 25 && dierenVijandY > 100) {
        dierenVijandX += 2.5;
    } else if ( spelerX < dierenVijandX - 25 && dierenVijandY > 100) {
        dierenVijandX -= 2.5;
    } else if(dierenVijandY < 100) {
            dierenVijandX = vijandX;
        } 
        
        if (spelerX > schietVijandX && schietVijandY > 100) {
        schietVijandX += 2.5;
    } else if ( spelerX < schietVijandX && schietVijandY > 100) {
        schietVijandX -= 2.5;
    } else if(vijandY < 100) {
            schietVijandX = schietVijandX;
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
var beweegMeteoriet = function () {
  meteorietY += 5;
  if (meteorietY > 820) {
      meteorietY = 0
      meteorietX = Math.floor(Math.random() * 1280);
      meteorietSize = Math.floor(Math.random() * 100) + 100;

  } 
  kleineMeteorietY += 10;
  if (kleineMeteorietY > 820) {
      kleineMeteorietY = 0
      kleineMeteorietX = spelerX;
      kleineMeteorietSize = Math.floor(Math.random() * 50) + 50;
  } 

   groteMeteorietY += 3;
  if (groteMeteorietY > 1020) {
      groteMeteorietY = 0
      groteMeteorietX = Math.floor(Math.random() * 1280);
      groteMeteorietSize = Math.floor(Math.random() * 150) + 150;
  }
}

var raakMetoriet = function () {
    if(meteorietX <= spelerX + meteorietSize / 2 && meteorietY + meteorietSize / 2 >= spelerY && meteorietX >= spelerX - meteorietSize / 2 && meteorietY - meteorietSize / 2 < spelerY){
            score -= 500;
    } if(kleineMeteorietX <= spelerX + kleineMeteorietSize / 2 && kleineMeteorietY + kleineMeteorietSize / 2 >= spelerY && kleineMeteorietX >= spelerX - kleineMeteorietSize / 2 && kleineMeteorietY - kleineMeteorietSize / 2 < spelerY){
            score -= 500;
    } if(groteMeteorietX <= spelerX + groteMeteorietSize / 2 && groteMeteorietY + groteMeteorietSize / 2 >= spelerY && groteMeteorietX >= spelerX - groteMeteorietSize / 2 && groteMeteorietY - groteMeteorietSize / 2 < spelerY){
            score -= 500;
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
         spelerY = spelerY - Math.pow(sprongSnelheid + 0.05, 2);
         sprongSnelheid = sprongSnelheid + 0.00000005;
     }
     if (spelerY <= sprongHoogte || (spelerY < grondHoogte && springStatus === false)) {
         valStatus = true;
         springStatus = false;
     }
     if (valStatus === true && spelerY < grondHoogte) {
         spelerY = spelerY + Math.pow(sprongSnelheid - 0.5, 2);
         sprongSnelheid = sprongSnelheid + 0.000000008;
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

var tekenGameOverScherm = function() {
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
}

var tekenUitlegScherm = function() {
    background(255,255,255)
    textSize(50)
    fill(0,0,0)
    text('Gebruik',30,100,100,200)
    text('Of gebruik linker- en rechterpijltje om te bewegen',480,80,800,200)
    text('Druk op spatiebar of op pijl-omhoog om te springen',30,200,2000,400)
    text('Ontwijk de vijanden', 30, 275, 800, 500 )
    text('Druk op de muis om te schieten', 30, 350, 800, 600)
    text('Elimineer vijanden om punten te verdienen', 30, 425, 2000, 700)
    text('Als je geraakt wordt verlies je punten', 30, 500, 2000, 1000)
    text('Als je nul punten hebt, ga je game over ', 30, 575, 2000, 1000)
    fill(0,0,0)
    rect(35, 15, 70, 70 )
    fill(255,0,0)
    textSize(75)
    text('X', 45, 10, 50, 75) 
}

var tekenWinScherm = function() {
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
}


/** 
  Zoekt uit of de vijand is geraakt
  @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {  
  if (kogelX >= vijandX - 25 && kogelX <= vijandX + 25 && kogelY >= vijandY - 25 && kogelY <= vijandY + 25 && mouseIsPressed) {
     score = score + 20; // wanneer een vijand geraakt is wordt er 20 aan de score toegevoegd
     vijandX = 600;
     vijandY = 75;
 } else if (kogelX >= kleineVijandX - 12.5 && kogelX <= kleineVijandX + 12.5 && kogelY >= kleineVijandY - 12.5 && kogelY <= kleineVijandY + 12.5 && mouseIsPressed) {
     score = score + 20;
     kleineVijandX = 600;
     kleineVijandY = 87.5;
 } else if (kogelX >= groteVijandX - (groteVijandSize / 2) && kogelX <= groteVijandX + (groteVijandSize / 2) && kogelY >= groteVijandY - (groteVijandSize / 2) && kogelY <= groteVijandY + (groteVijandSize / 2) && mouseIsPressed) {
     score = score + 1;
     groteVijandSize -= 5;
     groteVijandY += 2.5;
 } else if (groteVijandSize < 25) {
     groteVijandX = 600
     groteVijandY = 92.5; 
 } if (kogelX >= dierenVijandX - 25 && kogelX <= dierenVijandX + 75 && kogelY >= dierenVijandY - 75 && kogelY <= dierenVijandY + 75 && mouseIsPressed) {
     score = score + 20; 
     dierenVijandX = 600;
     dierenVijandY = 75;
 } if (kogelX >= balkVijandX && kogelX <= balkVijandX + 150 && kogelY >= balkVijandY && kogelY <= balkVijandY + 35  && mouseIsPressed) {
     score = score + 20;
     balkVijandX = 525;
     balkVijandY = 87.5;
    }  if (kogelX >= schietVijandX - 25 && kogelX <= schietVijandX + 25 && kogelY >= schietVijandY - 25 && kogelY <= schietVijandY + 25 && mouseIsPressed) {
     score = score + 20; // wanneer een vijand geraakt is wordt er 20 aan de score toegevoegd
     schietVijandX = 600;
     schietVijandY = 75;
     vijandKogelX = 600
     vijandKogelY = 75
    } else {
    return false; 
}

};

var checkPlatformGeraakt = function() {
    if(spelerX <= platformX + 210 && spelerX >= platformX && spelerY <= platformY) {
        spelerX >= platformX;
        spelerX <= platformX + 200;
        grondHoogte = platformY - 20;
    } else if(spelerX <= kleinePlatformX + 150 && spelerX >= kleinePlatformX && spelerY <= kleinePlatformY) {
        spelerX >= kleinePlatformX;
        spelerX <= kleinePlatformX + 140;
        grondHoogte = kleinePlatformY - 20;
    }  else if(spelerX <= grotePlatformX + 260 && spelerX >= grotePlatformX && spelerY <= grotePlatformY) {
        spelerX >= grotePlatformX;
        spelerX <= grotePlatformX + 250;
        grondHoogte = grotePlatformY - 20;
    }  else if(spelerX <= trapPlatformX + 105 && spelerX >= trapPlatformX && spelerY <= trapPlatformY) {
        spelerX >= trapPlatformX;
        spelerX <= trapPlatformX + 200;
        grondHoogte = trapPlatformY - 20;
    } else if(spelerX >= trapPlatformX + 105 && spelerY <= trapPlatformY) {
        trapPlatformX = -100;
        trapPlatformY = -100;
        grondHoogte = 680;
    } else if (grondHoogte >= 680) {
        trapPlatformX = 1000;
        trapPlatformY = 555;
    } else {
        grondHoogte = 680
    }
    
}

var beweegKogel = function() {
if (mouseIsPressed && mouseX > spelerX && kogelX < spelerX + 100) {
    kogelX += 8;
    } else if (mouseIsPressed && mouseX < spelerX && kogelX > spelerX - 100) {
        kogelX -= 8;
       } else {
        kogelX = spelerX;
        kogelY = spelerY;
    };

    if(spelerX <= schietVijandX && vijandKogelX >= schietVijandX - 70 && vijandKogelY > 100) {
        vijandKogelX -= 12;
        vijandKogelX = vijandKogelX;
    } else if(spelerX >= schietVijandX && vijandKogelX <= schietVijandX + 70 && vijandKogelY > 100) {
        vijandKogelX += 12;
        vijandKogelX = vijandKogelX;
    } else if(vijandKogelX >= schietVijandX - 70 || vijandKogelX <= schietVijandX + 70 && vijandKogelY > 100) {
        vijandKogelX = schietVijandX - 10;
    }
};

/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
        if(spelerX < 0){
            score -= 500;

        }
        
        if(vijandX <= spelerX + 50 && vijandY === spelerY && vijandX >= spelerX - 50 && vijandY === spelerY){
            score -= 500;
        }  else if(kleineVijandX <= spelerX + 25 && kleineVijandY === spelerY + 12.5 && kleineVijandX >= spelerX - 25 && kleineVijandY === spelerY + 12.5){
            score -= 500;
        }  else if(groteVijandX <= spelerX + groteVijandSize / 2 && groteVijandY + groteVijandSize / 2 >= spelerY && groteVijandX >= spelerX - groteVijandSize / 2 && groteVijandY - groteVijandSize / 2 < spelerY){
            score -= 500;
        } else if(dierenVijandX <= spelerX + 90 && dierenVijandY + 45 >= spelerY && dierenVijandX  >= spelerX - 90 && dierenVijandY - 25 < spelerY){
            score -= 500;
        } if(schietVijandX <= spelerX + 50 && schietVijandY === spelerY && schietVijandX >= spelerX - 50 && schietVijandY === spelerY){
            score -= 500;
        } if(balkVijandX + 200 >= spelerX && balkVijandY <= spelerY && balkVijandX <= spelerX && balkVijandY + 20 >= spelerY){
            score -= 500;
        }  if (vijandKogelX >= spelerX - 25 && vijandKogelX <= spelerX + 25 && vijandKogelY >= spelerY - 25 && vijandKogelY <= spelerY + 25) {
            score -= 10;
        } else {
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


var gameReset = function() {
    spelerX = 50; // x-positie van speler
    spelerY = 680; // y-positie van speler
    spelerSize = 50;
    kogelX = spelerX + 10;    // x-positie van kogel
    kogelY = spelerY;    // y-positie van kogel
    vijandX = 250;   // x-positie van vijand
    vijandY = 680;   // y-positie van vijand
    kleineVijandX = 350;
    kleineVijandY = 692.5;
    groteVijandX = 700;
    groteVijandY = 600;
    balkVijandX = 1050;
    balkVijandY = 400;
    dierenVijandX = 1100;
    dierenVijandY = 660;
    schietVijandX = 900;
    schietVijandY = 680;
    vijandKogelX = schietVijandX - 10;
    vijandKogelY = schietVijandY;
    groteVijandSize = 200;
    meteorietY = 0;
    kleineMeteorietY = 0;
    groteMeteorietY = 0;
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
    beweegMeteoriet();
    setup();  
    tekenVeld();
    tekenKooi();
    tekenPlatform();
    tekenMeteoriet();
    tekenKogel();
    tekenVijand();
    tekenSpeler();
    tekenScore();
    raakMetoriet();
    checkVijandGeraakt();
    checkSpelerGeraakt();
    checkPlatformGeraakt();
    if (checkGameOver()) {
        vorigeSpelStatus = spelStatus
        spelStatus = GAMEOVER
        
      }
    if (checkWin()) {
          vorigeSpelStatus = spelStatus
          spelStatus = WIN
      }
}

var gameSetupLevel3 = function() {
    checkMouseIsClicked();
    beweegVijand();
    beweegKogel();
    beweegMeteoriet();
    setup();  
    tekenVeld();
    tekenKooi();
    tekenPlatform();
    tekenMeteoriet();
    tekenKogel();
    tekenVijand();
    tekenSpeler();
    tekenScore();
    raakMetoriet();
    checkVijandGeraakt();
    checkSpelerGeraakt();
    checkPlatformGeraakt();
    if (checkGameOver()) {
        vorigeSpelStatus = spelStatus
        spelStatus = GAMEOVER
        
      }
    if (checkWin()) {
          vorigeSpelStatus = spelStatus
          spelStatus = WIN
      }
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
      
      break;

      case GAMEOVER: 
        tekenGameOverScherm()
        if(mouseX > 200 && mouseX < 600 && mouseY > 450 && mouseY < 650 && mouseIsClicked){
        spelStatus = vorigeSpelStatus
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
          if(mouseX > 450 && mouseX < 850 && mouseY > 360 && mouseY < 410 && mouseIsClicked) {
                  spelStatus = LEVEL2
              }
          if(mouseX > 450 && mouseX < 850 && mouseY > 450 && mouseY < 520 && mouseIsClicked) {
                  spelStatus = LEVEL3
              }
          if(mouseX > 450 && mouseX < 850 && mouseY > 540 && mouseY < 610 && mouseIsClicked) {
                  spelStatus = LEVEL4
              }
          if(mouseX > 450 && mouseX < 850 && mouseY > 630 && mouseY < 700 && mouseIsClicked) {
                  spelStatus = LEVEL5
              }
          fill(0,0,0)
          textSize(60)
          text('Levels',560,200,600,250)

      break;

      case UITLEG:
         tekenUitlegScherm() 
          if(mouseX > 35 && mouseX < 105 && mouseY > 15 && mouseY < 85 && mouseIsClicked) {
              spelStatus = MAINMENU
          }
          for( var i = 0; i < 2; i++) {
           var toetsX= 225 + i * 125;
            fill(0,0,0)
            rect(toetsX,90,100,100)
           }
           fill(255,255,255)
           textSize(70)
           text('A',245,100,400,300)
           text('D',370,100,400,300)
          
      break;

     case WIN:
        tekenWinScherm()
        if(mouseX > 200 && mouseX < 600 && mouseY > 450 && mouseY < 650 && mouseIsClicked){
            if(vorigeSpelStatus === LEVEL1) {
                spelStatus = LEVEL2
            }
            if (vorigeSpelStatus === LEVEL2) {
                spelStatus = LEVEL3
            }
            if (vorigeSpelStatus === LEVEL3) {
                spelStatus = LEVEL4
            }
            if (vorigeSpelStatus === LEVEL4) {
                spelStatus = LEVEL5
            }
        gameReset()
     
        }
        if(mouseX > 700 && mouseX < 1100 && mouseY > 450 && mouseY < 650 && mouseIsClicked){
        spelStatus = MAINMENU
        gameReset();
        }
        
        break;

      case LEVEL2: 
         if(spelerY >= 680 && spelerX >= 200 && spelerX <= 1080) {
             score -= 500;
         }
         gameSetup();
         tekenLava();

         break;
      
      case LEVEL3: 
      if (keyIsDown(65) || keyIsDown(37)) {
        spelerX+= 5;
     } 
     if (keyIsDown(68) && spelerX > 50 || keyIsDown(39) && spelerX > 50) {
        spelerX-= 5;
     } 
     if (springStatus === false) {
         sprongHoogte = spelerY - 250;
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
         spelerY = spelerY + Math.pow(sprongSnelheid, 1);
         sprongSnelheid = sprongSnelheid - 0.0000008;
     }
     if (spelerY >= grondHoogte) {
         valStatus = false;
         sprongSnelheid = 3;
         spelerY = grondHoogte;
     }
         gameSetupLevel3();
         tekenZwarteGat();
           if(spelerY >= 670 && spelerX >= 200 && spelerX <= 1080) {
             spelerSize -= 0.5;
         } if (spelerSize <= 10) {
             score -= 500;
         }
         
        
         break;

      case LEVEL4: 
         gameSetup()

         break;

      case LEVEL5: 
         gameSetup()

         break;



  }
}
