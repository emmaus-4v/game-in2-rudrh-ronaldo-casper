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

const UITLEG = 0; // variable voor uitleg om te bepalen wanneer die wordt geroepen
const MAINMENU = 1; // variable voor menu om te bepalen wanneer die wordt geroepen
const LEVELMENU = 2; // variable voor levels om te bepalen wanneer die wordt geroepen
const GAMEOVER = 3; // variable voor gameover om te bepalen wanneer die wordt geroepen
const WIN = 4; // variable voor winscherm om te bepalen wanneer die wordt geroepen
const LEVEL1 = 5; // variable voor level 1 om te bepalen wanneer die wordt geroepen
const LEVEL2 = 6; // variable voor level 2 om te bepalen wanneer die wordt geroepen
const LEVEL3 = 7; // variable voor level 3 om te bepalen wanneer die wordt geroepen
const LEVEL4 = 8; // variable voor level 4 om te bepalen wanneer die wordt geroepen
const LEVEL5 = 9; // variable voor level 5 om te bepalen wanneer die wordt geroepen
var spelStatus = MAINMENU;
var vorigeSpelStatus = MAINMENU; // onthoudt wat de vorige spelStatus was

var spelerX = 50; // x-positie van speler
var spelerY = 680; // y-positie van speler
var spelerSize = 50; // grootte van speler

var kogelX = spelerX + 10;    // x-positie van kogel
var kogelY = spelerY;    // y-positie van kogel
var vijandKogelX = schietVijandX - 10; // x-positie van vijandkogel
var vijandKogelY = schietVijandY; // y-positie van vijandkogel

var platformX = 1000; // x-positie van platform
var platformY = 555; // y-positie van platform
var kleinePlatformX = 500; // x-positie van kleine platform
var kleinePlatformY = 555; // y-positie van kleine platform
var grotePlatformX =  700; // x-positie van grote platform
var grotePlatformY = 450; // y-positie van grote platform
var trapPlatformX = 200; // x-positie van trap platform
var trapPlatformY = 555; // y-positie van trap platform

var vijandX = 250;   // x-positie van vijand
var vijandY = 680;   // y-positie van vijand
var kleineVijandX = 350; // x-positie van kleine vijand
var kleineVijandY = 692.5; // y-positie van kleine vijand
var groteVijandX = 700; // x-positie van grote vijand
var groteVijandY = 600; // y-positie van grote vijand
var balkVijandX = 1050; // x-positie van balk vijand
var balkVijandY = 400; // y-positie van balk vijand
var dierenVijandX = 1100; // x-positie van dieren vijand
var dierenVijandY = 660; // y-positie van dieren vijand
var schietVijandX = 900; // x-positie van schiet vijand
var schietVijandY = 680; // y-positie van schiet vijand
var vijandBaasX = 1200; // x-positie van baas vijand
var vijandBaasY =  530; // y-positie van baas vijand

var groteVijandSize = 200; // grootte van grote vijand
var vijandBaasSize = 350; // grootte van baas vijand
var baasSnelheid = 0.8; // snelheid van de baas

var score = 100; // aantal behaalde punten

var springStatus = false; // waarde van als je springt
var valStatus = false; // waarde van als je valt
var sprongHoogte = 680; // hoogte van waar je springt
var sprongSnelheid = 1; // snelheid van springen
var grondHoogte = 680; // hoogte van waar je valt

var mouseWasClicked = false; // waarde van als je hebt geclicked
var mouseIsClicked = false; // waarde van als je je klikt

var groteMeteorietX = Math.floor(Math.random() * 1280); // x-positie van grote meteoriet
var groteMeteorietY = 0; // y-positie van grote meteoriet
var kleineMeteorietX = spelerX; // x-positie van kleine meteoriet
var kleineMeteorietY = 0; // y-positie van kleine meteoriet
var meteorietX = Math.floor(Math.random() * 1280); // x-positie van meteoriet
var meteorietY = 0; // y-positie van meteoriet
var meteorietSize = Math.floor(Math.random() * 100) + 100; // grootte van meteoriet
var kleineMeteorietSize =  Math.floor(Math.random() * 50) + 50; // grootte van kleine meteoriet
var groteMeteorietSize = Math.floor(Math.random() * 150) + 150; // grootte van grote meteoriet
    
/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */

/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
    rect(20, 20, width - 2 * 20, height - 2 * 20);
  
};

/**
 * Tekent de kooi
 */
var tekenKooi = function (){ 
    fill('yellow');
    rect(550, 0, 100, 100);
};

/*
 * Tekent de kogels
 */
var tekenKogel = function() {
   fill('black');
   ellipse(kogelX, kogelY, 10, 10);
   fill('green');
   ellipse(vijandKogelX, vijandKogelY, 10, 10);
};

/*
 * Tekent de vijanden
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
 * Tekent de baas
 */
var tekenBaas = function() {
    fill('gold');
    ellipse(vijandBaasX, vijandBaasY, vijandBaasSize, vijandBaasSize);
};

/*
 * Tekent de speler
 */
var tekenSpeler = function() {
    fill('black');
    ellipse(spelerX, spelerY, spelerSize, spelerSize);
};

/*
 * Tekent de platformen
 */
var tekenPlatform = function() {
    fill('red');
    rect(platformX, platformY, 200, 20);
    rect(kleinePlatformX, kleinePlatformY, 140, 20);
    rect(grotePlatformX, grotePlatformY, 250, 20);
    rect(trapPlatformX, trapPlatformY, 200, 20);
};

/*
 * Tekent lava
 */
var tekenLava = function() {
    fill('orange');
    rect(225, 700, 830, 20);
};

/*
 * Tekent zwarte gat
 */
var tekenZwarteGat = function() {
    fill('brown');
    rect(225, 700, 830, 20);
};

/*
 * Tekent meteorieten
 */
var tekenMeteoriet = function() {
    fill('brown');
    ellipse(meteorietX, meteorietY, meteorietSize, meteorietSize);
    ellipse(kleineMeteorietX, kleineMeteorietY, kleineMeteorietSize, kleineMeteorietSize);
    ellipse(groteMeteorietX, groteMeteorietY, groteMeteorietSize, groteMeteorietSize);
    
};

/*
 * Tekent de score
 */
var tekenScore = function() {
    var tekenScore = round(score);
    fill(255,0,0);
    textSize(50);
    text("Score:" + tekenScore, 30, 30, 25, 50); 
    score = score - (1/50); 
};

/*
 * Tekent de game-overscherm
 */
var tekenGameOverScherm = function() {
    fill(207, 53, 23);
    rect(100,100,1100,550); 
    rect(200,450,400,100);
    rect(700,450,400,100);
    fill(255,255,255);
    textSize(100);
    text('Game Over',400,150,600,450); 
    textSize(30);
    text('Probeer Opnieuw',275,480,250,525);
    text('Terug naar hoofdmenu',750,480,850,600);
};

/*
 * Tekent de uitlegscherm
 */
var tekenUitlegScherm = function() {
    background(255,255,255);
    textSize(50);
    fill(0,0,0);
    text('Gebruik',30,100,100,200);
    text('Of gebruik linker- en rechterpijltje om te bewegen',480,80,800,200);
    text('Druk op spatiebar of op pijl-omhoog om te springen',30,200,2000,400);
    text('Ontwijk de vijanden', 30, 275, 800, 500 );
    text('Druk op de muis om te schieten', 30, 350, 800, 600);
    text('Elimineer vijanden om punten te verdienen', 30, 425, 2000, 700);
    text('Als je geraakt wordt verlies je punten', 30, 500, 2000, 1000);
    text('Als je nul punten hebt, ga je game over ', 30, 575, 2000, 1000);
    fill(0,0,0);
    rect(35, 15, 70, 70 );
    fill(255,0,0);
    textSize(75);
    text('X', 45, 10, 50, 75); 
};

/*
 * Tekent de winscherm
 */
var tekenWinScherm = function() {
    fill(59, 156, 17);
    rect(100,100,1100,550); 
    fill(23, 32, 207);
    rect(200,450,400,100); 
    rect(700,450,400,100);
    fill(255,255,255);
    textSize(100);
    text('Level Voltooid!',325,150,700,450); 
    textSize(30);
    text('Volgend level',300,480,250,525);
    text('Terug naar hoofdmenu',750,480,850,600);
}

/**
 * Updatet globale variabelen met positie van de vijanden
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
    } else if(schietVijandY < 100) {
            schietVijandX = schietVijandX;
    }
       
};
    
 /**
 * Updatet globale variabelen met positie van de baas
 */
 var beweegBaas = function() {
    if (spelerX > vijandBaasX && vijandBaasY > 100) {
        vijandBaasX += baasSnelheid;
    } else if ( spelerX < vijandBaasX && vijandBaasY > 100) {
        vijandBaasX -= baasSnelheid;
    } else if(vijandBaasY < 100) {
            vijandBaasX = vijandBaasX;
    }
};

/**
 * Updatet globale variabelen met positie van kogels
 */
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
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
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

/**
 * Updatet globale variabele van de meteorieten
 */
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
};

<<<<<<< HEAD
/**
 * functie die ervoor zorgt dat we de muis niet moeten indrukken, maar klikken 
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
};

/** 
  Zoekt uit of de speler is geraakt door een meteoriet
 */
var raakMeteoriet = function () {
    if(meteorietX <= spelerX + meteorietSize / 2 && meteorietY + meteorietSize / 2 >= spelerY && meteorietX >= spelerX - meteorietSize / 2 && meteorietY - meteorietSize / 2 < spelerY){
            score -= 500;
    } if(kleineMeteorietX <= spelerX + kleineMeteorietSize / 2 && kleineMeteorietY + kleineMeteorietSize / 2 >= spelerY && kleineMeteorietX >= spelerX - kleineMeteorietSize / 2 && kleineMeteorietY - kleineMeteorietSize / 2 < spelerY){
            score -= 500;
    } if(groteMeteorietX <= spelerX + groteMeteorietSize / 2 && groteMeteorietY + groteMeteorietSize / 2 >= spelerY && groteMeteorietX >= spelerX - groteMeteorietSize / 2 && groteMeteorietY - groteMeteorietSize / 2 < spelerY){
            score -= 500;
    }
};
=======
var tekenGameOverScherm = function() {
    fill(207, 53, 23);
    rect(100,100,1100,550); // maakt een rechthoek
    fill(23, 32, 207)
    rect(200,450,400,100) //maakt een knop om opnieuw te spelen
    rect(700,450,400,100) // maakt een knop om terug naar het hoofdmenu te gaan
    fill(255,255,255);
    textSize(100)
    text('Game Over',400,150,600,450); // Zet de tekst "game over" op rechthoek 1
    textSize(30)
    text('Probeer Opnieuw',275,480,250,525); // Zet de tekst "probeer opnieuw op rechthoek 2"
    text('Terug naar hoofdmenu',750,480,850,600); // Zet de tekst "terug naar hoffdmenu op rechthoek 3"
}

var tekenUitlegScherm = function() {
    background(255,255,255)
    textSize(50)
    fill(0,0,0)
    //Uitleg wordt op het scherm geplaatst
    text('Gebruik',30,100,100,200)
    text('Of gebruik linker- en rechterpijltje om te bewegen',480,80,800,200)
    text('Druk op spatiebar of op pijl-omhoog om te springen',30,200,2000,400)
    text('Ontwijk de vijanden', 30, 275, 800, 500 )
    text('Druk op de muis om te schieten', 30, 350, 800, 600)
    text('Elimineer vijanden om punten te verdienen', 30, 425, 2000, 700)
    text('Als je geraakt wordt verlies je punten', 30, 500, 2000, 1000)
    text('Als je nul punten hebt, ga je game over ', 30, 575, 2000, 1000)
    fill(0,0,0)
    rect(35, 15, 70, 70 ) // maakt een knop om weer uit het uitlegscherm te gaan
    fill(255,0,0)
    textSize(75)
    text('X', 45, 10, 50, 75) // zet een kruisje op de knop om duidelijk te maken dat het uitlegscherm daar verlaten kan worden 
}

var tekenWinScherm = function() {
    fill(59, 156, 17);
    rect(100,100,1100,550); // maakt een rechthoek
    fill(23, 32, 207)
    rect(200,450,400,100) //maakt een knop om naar het volgende level te gaan
    rect(700,450,400,100) // maakt een knop om terug naar het hoofdmenu te gaan
    fill(255,255,255);
    textSize(100)
    text('Level Voltooid!',325,150,700,450); // Zet de tekst "level voltooid" op rechthoek 1
    textSize(30)
    text('Volgend level',300,480,250,525); // zet de tekst "volgend level" op rechthoek 2
    text('Terug naar hoofdmenu',750,480,850,600); // zet de tekst "terug naar hoofdmenu op rechthoek 3"
}
>>>>>>> fd2c81c4505dbb00e3773d416dbf3c7e90c6e4cb

var tekenMainMenu = function() {
    background(155,255,155); //maakt achtergrond voor mainmenu
    fill(0,0,0);
    textSize(100)
    text('[Game naam hier]',250,75,1000,300); // Zet de naam van onze game in mainmenu
    fill(23, 32, 207)
    rect(375,400,500,100) // maakt een knop om een level te kiezen
    rect(375,550,500,100) // maakt een knop voor het uitlegscherm
    fill(255,255,255)
    textSize(40)
    text('Kies level',530,425,500,450) // Zet de tekst "Kies level" op rechthoek 1
    text('Uitleg',565,575,500,600) // Zet de tekst "uitleg" op rechthoek 2
}

/** 
  Zoekt uit of de vijanden zijn geraakt door de kogel
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
    } if (kogelX >= schietVijandX - 25 && kogelX <= schietVijandX + 25 && kogelY >= schietVijandY - 25 && kogelY <= schietVijandY + 25 && mouseIsPressed) {
       score = score + 20; // wanneer een vijand geraakt is wordt er 20 aan de score toegevoegd
       schietVijandX = 600;
       schietVijandY = 75;
       vijandKogelX = 600
       vijandKogelY = 75
    }  else {
      return false; 
    }

};

/** 
  Zoekt uit of de baas is geraakt door de kogel
 */
var baasGeraakt = function () {
    if (kogelX >= vijandBaasX - (vijandBaasSize / 2) && kogelX <= vijandBaasX + (vijandBaasSize / 2) && kogelY >= vijandBaasY - (vijandBaasSize / 2) && kogelY <= vijandBaasY + (vijandBaasSize / 2) && mouseIsPressed) {
     score = score + 50;
     vijandBaasSize -= 1.5;
     vijandBaasY += 0.75;
     baasSnelheid += 0.02;
    } if (vijandBaasSize < 50) {
     vijandBaasX = 600
     vijandBaasY = 75; 
     vijandX = 600;
     vijandY = 75;
     kleineVijandX = 600;
     kleineVijandY = 87.5;
     groteVijandX = 600
     groteVijandY = 92.5; 
     dierenVijandX = 600;
     dierenVijandY = 75;
     balkVijandX = 525;
     balkVijandY = 87.5;
     schietVijandX = 600;
     schietVijandY = 75;
     vijandKogelX = 600
     vijandKogelY = 75
    }
};

/** 
  Zoekt uit of de speler een platform raakt en daardoor erop komt
 */
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
    } else if(spelerX >= trapPlatformX + 105 && spelerY <= trapPlatformY && spelerX <= trapPlatformX + 150) {
        trapPlatformX = -100;
        trapPlatformY = -100;
        grondHoogte = 680;
    } else if (grondHoogte >= 680) {
        trapPlatformX = 200;
        trapPlatformY = 555;
    }  else {
        grondHoogte = 680
    }  
    
};

/**
 * Zoekt uit of de speler is geraakt door het lichaam van de vijanden of door vijandkogels
 */
var checkSpelerGeraakt = function() {
    if(spelerX < 0){
            score -= 500;
    }
        
    if(vijandX <= spelerX + 50 && vijandY === spelerY && vijandX >= spelerX - 50 && vijandY === spelerY){
        score -= 500;
    } if(kleineVijandX <= spelerX + 25 && kleineVijandY === spelerY + 12.5 && kleineVijandX >= spelerX - 25 && kleineVijandY === spelerY + 12.5){
        score -= 500;
    } if(groteVijandX <= spelerX + groteVijandSize / 2 && groteVijandY + groteVijandSize / 2 >= spelerY && groteVijandX >= spelerX - groteVijandSize / 2 && groteVijandY - groteVijandSize / 2 < spelerY){
        score -= 500;
    } if(dierenVijandX <= spelerX + 90 && dierenVijandY + 45 >= spelerY && dierenVijandX  >= spelerX - 90 && dierenVijandY - 25 < spelerY){
        score -= 500;
    } if(schietVijandX <= spelerX + 50 && schietVijandY === spelerY && schietVijandX >= spelerX - 50 && schietVijandY === spelerY){
        score -= 500;
    } if(balkVijandX + 200 >= spelerX && balkVijandY <= spelerY && balkVijandX <= spelerX && balkVijandY + 20 >= spelerY){
        score -= 500;
    } if (vijandKogelX >= spelerX - 25 && vijandKogelX <= spelerX + 25 && vijandKogelY >= spelerY - 25 && vijandKogelY <= spelerY + 25) {
        score -= 10;
    } else {
        return false;
    }

};

/**
 * Zoekt uit of de speler is geraakt door het lichaam van de baas
 */
var checkSpelerGeraaktDoorBaas = function() {
    if(spelerX < 0){
            score -= 500;
    } if(vijandBaasX <= spelerX + vijandBaasSize / 2 && vijandBaasY + vijandBaasSize / 2 >= spelerY && vijandBaasX >= spelerX - vijandBaasSize / 2 && vijandBaasY - vijandBaasSize / 2 < spelerY){
        score -= 500;
    } return false;

};





/**
 * Zoekt uit of het spel is afgelopen
 */
var checkGameOver = function() {
   if(score <= 0) {
      return true;
   }  
   else {
      return false; 
   }
};

/**
 * Zoekt uit of je het spel wint 
 */
var checkWin = function() {
   if(spelerX > 1280) {
    return true;
   }
   else {
    return false;
   }
};

/**
 * Zoekt uit of je level 5 wint 
 */
var checkWinLevel5 = function() {
   if(spelerX <= 0 && spelerY <= 450) {
    return true;
   }
   else {
    return false;
   }
};

<<<<<<< HEAD

/**
 * Zet alle vijanden terug op de juiste posities als het wordt geroepen
 */
=======
/**
gameReset zorgt ervoor dat alle variabelen, zoals posities van vijanden, score etc., worden gereset nadat een level voltooid,
of nadat de speler het level opnieuw probeert
*/
>>>>>>> fd2c81c4505dbb00e3773d416dbf3c7e90c6e4cb
var gameReset = function() {
    spelerX = 50; 
    spelerY = 680; 
    spelerSize = 50;
    kogelX = spelerX + 10;    
    kogelY = spelerY;    
    vijandX = 250;   
    vijandY = 680;   
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
    vijandBaasX = 1200;
    vijandBaasY = 530;
    vijandBaasSize = 350;
    baasSnelheid = 0.8;
    vijandKogelX = schietVijandX - 10;
    vijandKogelY = schietVijandY;
    groteVijandSize = 200;
    groteMeteorietX = Math.floor(Math.random() * 1280);
    groteMeteorietY = 0; 
    kleineMeteorietX = spelerX; 
    kleineMeteorietY = 0; 
    meteorietX = Math.floor(Math.random() * 1280); 
    meteorietY = 0; 
    meteorietSize = Math.floor(Math.random() * 100) + 100;
    score = 100; 
    springStatus = false;
    valStatus = false;
    sprongHoogte = 680;
    sprongSnelheid = 1;
    grondHoogte = 680;
};

<<<<<<< HEAD
/**
 * De functies worden geroepen die nodig zijn
 */
=======
// gameSetup zorgt ervoor dat de basisfuncties van een game makkelijk in meerdere levels te gebruiken zijn.
>>>>>>> fd2c81c4505dbb00e3773d416dbf3c7e90c6e4cb
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
    raakMeteoriet();
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
};

/**
 * De functies worden geroepen die nodig zijn voor level 3
 */
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
    raakMeteoriet();
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
};

/**
 * De functies worden geroepen die nodig zijn voor level 4
 */
var gameSetupLevel4 = function() {
    checkMouseIsClicked();
    beweegVijand();
    beweegKogel();
    beweegSpeler();
    beweegMeteoriet();
    beweegBaas();
    setup();  
    tekenVeld();
    tekenKooi();
    tekenMeteoriet();
    tekenKogel();
    tekenVijand();
    tekenBaas();
    tekenSpeler();
    tekenScore();
    tekenPlatform();
    raakMeteoriet();
    baasGeraakt();
    checkSpelerGeraakt();
    checkSpelerGeraaktDoorBaas();
    checkPlatformGeraakt();
    if (checkGameOver()) {
        vorigeSpelStatus = spelStatus
        spelStatus = GAMEOVER
        
      }
    if (checkWin()) {
          vorigeSpelStatus = spelStatus
          spelStatus = WIN
      }
};

/**
 * De functies worden geroepen die nodig zijn voor level 5
 */
var gameSetupLevel5 = function() {
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
    raakMeteoriet();
    checkSpelerGeraakt();
    checkPlatformGeraakt();
    if (checkGameOver()) {
        vorigeSpelStatus = spelStatus
        spelStatus = GAMEOVER
        
      }
    if (checkWinLevel5()) {
          vorigeSpelStatus = spelStatus
          spelStatus = WIN
      }
};

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
};

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

        //Als de muis op de knop "opnieuw spelen" klikt, dan verandert de case naar vorigeSpelstatus
        if(mouseX > 200 && mouseX < 600 && mouseY > 450 && mouseY < 650 && mouseIsClicked){
        spelStatus = vorigeSpelStatus // vorigeSpelStatus is in dit geval het level dat de speler aan het spelen was, voordat hij gameover ging
        gameReset();
<<<<<<< HEAD
        } 
=======
        }
        //Als de muis op de knop "terug naar hoofdmenu" klikt, dan gaat de game naar mainmenu 
>>>>>>> fd2c81c4505dbb00e3773d416dbf3c7e90c6e4cb
        if(mouseX > 700 && mouseX < 1100 && mouseY > 450 && mouseY < 650 && mouseIsClicked){
        spelStatus = MAINMENU
        gameReset();
        }
        break;

<<<<<<< HEAD
        case MAINMENU:
         background(155,255,155);
         fill(0,0,0);
         textSize(100)
         text('Circle Adventure',250,75,1000,300);
         fill(23, 32, 207)
         rect(375,400,500,100) // maakt een knop om een level te kiezen
         rect(375,550,500,100) // maakt een knop voor het uitlegscherm
         fill(255,255,255)
         textSize(40)
         text('Kies level',530,425,500,450)
         text('Uitleg',565,575,500,600)
=======
     case MAINMENU:
         tekenMainMenu()
         //Als de muis op de knop "kies level" klikt, dan gaat de game naar het levelscherm
>>>>>>> fd2c81c4505dbb00e3773d416dbf3c7e90c6e4cb
         if(mouseX > 375 && mouseX < 875 && mouseY > 400 && mouseY < 500 && mouseIsClicked){ 
            spelStatus = LEVELMENU
         } 
         //Als de muis op de knop "uitleg" klikt, dan gaat de game naar het uitlegscherm
         if(mouseX > 375 && mouseX < 875 && mouseY > 550 && mouseY < 750 && mouseIsClicked) {
            spelStatus = UITLEG 
         }
         break;
     
<<<<<<< HEAD
         case LEVELMENU:
          var knopY= 180;
          var i = 1;
=======
      case LEVELMENU:
          var knopY= 180; // lokale variable die de y-positie van de 5 knoppen, waarmee je een level kunt kiezen, bepaalt
          var i = 1; // lokale variable die bepaalt hoeveel keer de aankomende loop is uitgevoerd
>>>>>>> fd2c81c4505dbb00e3773d416dbf3c7e90c6e4cb
          fill(94, 157, 219)
          rect(200,200,900,510) // maakt een groot rechthoek (als menuscherm)
          
          //loop die 5 knoppen tekent om de 5 verschillende levels te kiezen
          for(i = 1; i < 6; i++) {
              fill(217, 171, 46)
              rect(450,knopY + i * 90,400,70) // op basis van de i-waarde wordt de y-wwarde van de knop aangepast, om zo 5 knoppen onder elkaar te tekenen 
              fill(0,0,0)
              text('level ' + i, 550, knopY + i * 90,700,900 ) // op basis van de i-waarde wordt te tekst "level" 5 keer onder elkaar getekend. Ook wordt het juiste levelnummer op de juiste plaats gezet met behulp van de i-waarde 
          }
          //als de muis op een levelnop klikt, dan gaat de game naar de desbetreffende level
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
<<<<<<< HEAD
          text('Levels',560,200,600,250)
          break;

          case UITLEG:
          tekenUitlegScherm() 
=======
          text('Levels',560,200,600,250) // zet de tekst "levels", als titel op het scherm

      break;

      case UITLEG:
         tekenUitlegScherm() 
         //als de muis klikt op de 'sluit' knop, dan gaat de game terug naar het hoofdmenu
>>>>>>> fd2c81c4505dbb00e3773d416dbf3c7e90c6e4cb
          if(mouseX > 35 && mouseX < 105 && mouseY > 15 && mouseY < 85 && mouseIsClicked) {
              spelStatus = MAINMENU
          }
          //Deze loop tekent twee toetsen van het toetsenbord ter ondersteuning van de uitleg
          for( var i = 0; i < 2; i++) {
<<<<<<< HEAD
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
=======
           var toetsX= 225 + i * 125; //aan de hand van de i-waarde wordt bepaald bij welke x-as de volgende toets getekend moet worden
            fill(0,0,0)
            rect(toetsX,90,100,100)
           }
           fill(255,255,255)
           textSize(70)
           text('A',245,100,400,300) //Zet de letter "A" op de linkertoets
           text('D',370,100,400,300) //Zet de letter "D" op de rechtertoets
          
      break;

     case WIN:
        tekenWinScherm()
        //als de muis klikt op de knop "volgende level",dan wordt aan de hand van het vorige level bepaald wat het volgende level moet zijn, vervolgens gaat de game dan naar dat level
        if(mouseX > 200 && mouseX < 600 && mouseY > 450 && mouseY < 650 && mouseIsClicked){
            if(vorigeSpelStatus === LEVEL1) {
>>>>>>> fd2c81c4505dbb00e3773d416dbf3c7e90c6e4cb
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
<<<<<<< HEAD
          }
          gameReset()
          }
          if(mouseX > 700 && mouseX < 1100 && mouseY > 450 && mouseY < 650 && mouseIsClicked){
          spelStatus = MAINMENU
          gameReset();
          }
          break;
=======
            }
        gameReset()
     
        }
        //Als de muis op de knop "terug naar hoofdmenu" klikt, dan gaat de game naar mainmenu 
        if(mouseX > 700 && mouseX < 1100 && mouseY > 450 && mouseY < 650 && mouseIsClicked){
        spelStatus = MAINMENU
        gameReset();
        }
        
        break;
>>>>>>> fd2c81c4505dbb00e3773d416dbf3c7e90c6e4cb

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
           if (kogelX >= vijandX - 25 && kogelX <= vijandX + 25 && kogelY >= vijandY - 25 && kogelY <= vijandY + 25 && mouseIsPressed) {
       score = score + 20; // wanneer een vijand geraakt is wordt er 20 aan de score toegevoegd
       vijandX = 1280;
    } else if (kogelX >= kleineVijandX - 12.5 && kogelX <= kleineVijandX + 12.5 && kogelY >= kleineVijandY - 12.5 && kogelY <= kleineVijandY + 12.5 && mouseIsPressed) {
       score = score + 20;
       kleineVijandX = 1280;
    } else if (kogelX >= groteVijandX - (groteVijandSize / 2) && kogelX <= groteVijandX + (groteVijandSize / 2) && kogelY >= groteVijandY - (groteVijandSize / 2) && kogelY <= groteVijandY + (groteVijandSize / 2) && mouseIsPressed) {
       score = score + 1;
       groteVijandSize -= 5;
       groteVijandY += 2.5;
    } else if (groteVijandSize < 25) {
       groteVijandX = 1280;
       groteVijandY = 600; 
       groteVijandSize = 200;
    } if (kogelX >= dierenVijandX - 25 && kogelX <= dierenVijandX + 75 && kogelY >= dierenVijandY - 75 && kogelY <= dierenVijandY + 75 && mouseIsPressed) {
       score = score + 20; 
       dierenVijandX = 1280;
    } if (kogelX >= balkVijandX && kogelX <= balkVijandX + 150 && kogelY >= balkVijandY && kogelY <= balkVijandY + 35  && mouseIsPressed) {
       score = score + 20;
       balkVijandX = balkVijandX + 0.0005;
    } if (kogelX >= schietVijandX - 25 && kogelX <= schietVijandX + 25 && kogelY >= schietVijandY - 25 && kogelY <= schietVijandY + 25 && mouseIsPressed) {
       score = score + 20; // wanneer een vijand geraakt is wordt er 20 aan de score toegevoegd
       schietVijandX = 1280;
       vijandKogelX = schietVijandX - 10
    }  
         gameSetupLevel4();
         
        break;

         case LEVEL5:  
          if (kogelX >= vijandX - 25 && kogelX <= vijandX + 25 && kogelY >= vijandY - 25 && kogelY <= vijandY + 25 && mouseIsPressed) {
       score = score + 20; // wanneer een vijand geraakt is wordt er 20 aan de score toegevoegd
       vijandX = 1280;
    } else if (kogelX >= kleineVijandX - 12.5 && kogelX <= kleineVijandX + 12.5 && kogelY >= kleineVijandY - 12.5 && kogelY <= kleineVijandY + 12.5 && mouseIsPressed) {
       score = score + 20;
       kleineVijandX = 1280;
    } else if (kogelX >= groteVijandX - (groteVijandSize / 2) && kogelX <= groteVijandX + (groteVijandSize / 2) && kogelY >= groteVijandY - (groteVijandSize / 2) && kogelY <= groteVijandY + (groteVijandSize / 2) && mouseIsPressed) {
       score = score + 1;
       groteVijandSize -= 5;
       groteVijandY += 2.5;
    } else if (groteVijandSize < 25) {
       groteVijandX = 1280;
       groteVijandY = 600; 
       groteVijandSize = 200;
    } if (kogelX >= dierenVijandX - 25 && kogelX <= dierenVijandX + 75 && kogelY >= dierenVijandY - 75 && kogelY <= dierenVijandY + 75 && mouseIsPressed) {
       score = score + 20; 
       dierenVijandX = 1280;
    } if (kogelX >= balkVijandX && kogelX <= balkVijandX + 150 && kogelY >= balkVijandY && kogelY <= balkVijandY + 35  && mouseIsPressed) {
       score = score + 20;
       balkVijandX = balkVijandX + 0.0005;
    } if (kogelX >= schietVijandX - 25 && kogelX <= schietVijandX + 25 && kogelY >= schietVijandY - 25 && kogelY <= schietVijandY + 25 && mouseIsPressed) {
       score = score + 20; // wanneer een vijand geraakt is wordt er 20 aan de score toegevoegd
       schietVijandX = 1280;
       vijandKogelX = schietVijandX - 10
    }  
     if (keyIsDown(68) || keyIsDown(39)) {
        spelerX+= 5;
     } 
     if (keyIsDown(65) || keyIsDown(37)) {
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

         gameSetupLevel5();
            
         break;
    
    }
};