function Character() {
    this.hp = 28;
    this.name = "";
    this.atk = 4;
    this.counter = 2;
    this.weapons = [];
    this.weaponIndex;
    this.atkName = "";
    this.weaknessIndex;
    this.pic = "";
    this.description = "";
}

var hero = new Character();
var opponent = new Character();

var megaMan = new Character();
megaMan.name = "Mega Man";
megaMan.atk = 4;
megaMan.counter = 2;
megaMan.weapons = [true, false, false, false];
megaMan.weaponIndex = 0;
megaMan.atkName = "Mega Buster";
megaMan.weaknessIndex = 1;
megaMan.pic = "assets/images/megaman.png"
megaMan.description = "Mega Man is Dr. Light's lab assistant redesigned to combat the evil plans of Dr. Wily.\n\nHis attack is the Mega Buster: an arm cannon that can cover an area with a burst of projectiles";

var protoMan = new Character();
protoMan.name = "Proto Man";
protoMan.atk = 4;
protoMan.counter = 2;
protoMan.weapons = [false, true, false, false];
protoMan.weaponIndex = 1;
protoMan.atkName = "Proto Shield Attack";
protoMan.weaknessIndex = 2;
protoMan.pic = "assets/images/protoman.png"
protoMan.description = "Proto Man is Dr. Light's first creation, and the predecessor to Mega Man.\n\nProto Man carries the Proto Shield. He can block weaker projectiles and shoot from behind cover.";

var gutsMan = new Character();
gutsMan.name = "Guts Man";
gutsMan.atk = 4;
gutsMan.counter = 2;
gutsMan.weapons = [false, false, true, false];
gutsMan.weaponIndex = 2;
gutsMan.atkName = "Guts Punch";
gutsMan.weaknessIndex = 3;
gutsMan.pic = "assets/images/gutsman.png"
gutsMan.description = "Guts Man is a large construction robot reprogrammed by Dr. Wily to use his strength for evil deeds.\n\nGuts Man uses the Guts Punch attack that penetrates most defenses.";

var quickMan = new Character();
quickMan.name = "Quick Man";
quickMan.atk = 4;
quickMan.counter = 2;
quickMan.weapons = [false, false, false, true];
quickMan.weaponIndex = 3;
quickMan.atkName = "Quick Boomerang";
quickMan.weaknessIndex = 0;
quickMan.pic = "assets/images/quickman.png"
quickMan.description = "Quick Man is a fast-moving battle robot designed and built by Dr. Wily.\n\nQuick Man throws Quick Boomerangs, catching slower targets by surprise.";

var characters = [megaMan, gutsMan, protoMan, quickMan];
var weaponReference = ["Mega Buster", "Proto Shield Attack", "Guts Punch", "Quick Boomerang"];
var victories = 0;
var mute = true;
var selectedHeroButton;
var selectedOpponentButton;
var instruction = $("#instruction-text");
var battleText1 = $("#battleText1");
var battleText2 = $("#battleText2");
var megaCover = $("#megaCover");
var protoCover = $("#protoCover");
var gutsCover = $("#gutsCover");
var quickCover = $("#quickCover");
var attackButton = $("#attackButton");
var characterSelect = $(".character-select");
var heroArena = $("#heroArena");
var heroBattler = $("#heroBattler");
var opponentBattler = $("#opponentBattler");
var opponentArena = $("#opponentArena");
var bio = $("#bio");
var heroHP = $("#heroHP");
var opponentHP = $("#opponentHP");
var muteButton = $("#muteButton");

var audioDamage = document.createElement('audio');
audioDamage.setAttribute('src', "assets/audio/damage.wav");
var audioVictory = document.createElement("audio");
audioVictory.setAttribute('src', "assets/audio/victory.ogg");
var audioMega = document.createElement("audio");
audioMega.setAttribute('src', "assets/audio/mega.mp3");
var audioProto = document.createElement("audio");
audioProto.setAttribute('src', "assets/audio/proto.mp3");
var audioGuts = document.createElement("audio");
audioGuts.setAttribute('src', "assets/audio/guts.mp3");
var audioQuick = document.createElement("audio");
audioQuick.setAttribute('src', "assets/audio/quick.mp3");
var audioWin = document.createElement("audio");
audioWin.setAttribute('src', "assets/audio/win.mp3");
var audioGameOver = document.createElement("audio");
audioGameOver.setAttribute('src', "assets/audio/gameOver.ogg");
var audioSelect = document.createElement("audio");
audioSelect.setAttribute('src', "assets/audio/select.mp3");
var audioDeath = document.createElement("audio");
audioDeath.setAttribute('src', "assets/audio/death.wav");


function setCharacter() {
    characterSelect.off("click").on("click", setOpponent);
    selectedCharButton = $(this);
    selectedCharButton.parent().addClass("invisible");
    hero = jQuery.extend(true, {}, characters[selectedCharButton.val()]);
    heroBattler.css("background-image", "url(" + hero.pic + ")");
    instruction.text("Select an opponent");
    renderHeroHP();
}

function setOpponent() {
    opponentArena.removeClass("disabled");
    characterSelect.off("click");
    selectedOpponentButton = $(this);
    selectedOpponentButton.addClass("disabled");
    opponent = jQuery.extend(true, {}, characters[$(this).val()]);
    opponentBattler.css("background-image", "url(" + opponent.pic + ")");
    instruction.text("Attack when ready!");
    attackButton.removeClass("invisible");
    attackButton.on("click", attack);
    renderOpponentHP();
}

function attack() {
    if (hero.weapons[opponent.weaknessIndex]) {
        opponent.hp -= hero.atk * 2;
        battleText1.text("You hit " + opponent.name + " hard with " + weaponReference[opponent.weaknessIndex] + " for " + hero.atk * 2 + " damage.");
    }
    else {
        opponent.hp -= hero.atk;
        battleText1.text("You hit " + opponent.name + " with " + hero.atkName + " for " + hero.atk + " damage.");
    }

    if (opponent.hp > 0) {
        counterAttack();
        if (hero.hp <= 0) {
            heroArena.addClass("disabled");
            attackButton.addClass("invisible");
            instruction.text("Game Over");
            battleText1.text("You have been defeated");
            battleText2.text("Game Over");
            attackButton.off("click");
            if (!mute) {
                audioDeath.play();
                audioGameOver.play();
            }
        }
    }
    else {
        if (!mute) audioDeath.play();
        victories++;
        if (victories === 3) {
            hero.weapons[opponent.weaponIndex] = true;
            attackButton.addClass("invisible");
            selectedOpponentButton.parent().addClass("invisible");
            opponentArena.addClass("disabled");
            instruction.text("Congratulations!");
            battleText1.text("Get equipped with " + opponent.atkName + "!");
            battleText2.text("You Win!");
            attackButton.off("click");
            if (!mute) audioWin.play();
        }
        else {
            attackButton.addClass("invisible");
            attackButton.off("click");
            selectedOpponentButton.parent().addClass("invisible");
            opponentArena.addClass("disabled");
            instruction.text("Victory! Select another opponent.");
            battleText1.text("Get equipped with " + opponent.atkName + "!");
            battleText2.text("Select another opponent");
            hero.weapons[opponent.weaponIndex] = true;
            characterSelect.on("click", setOpponent);
            if (!mute) audioVictory.play();
        }
    }
    renderHP();
}

function counterAttack() {
    if (opponent.weapons[hero.weaknessIndex]) {
        hero.hp -= opponent.counter * 2;
        battleText2.text(opponent.name + " hits you hard with " + opponent.atkName + " for " + opponent.counter * 2 + " damage.");
    }
    else {
        hero.hp -= opponent.counter;
        battleText2.text(opponent.name + " hits you with " + opponent.atkName + " for " + opponent.counter + " damage.");
    }
    if (!mute) audioDamage.play();
}

function renderHP() {
    renderHeroHP();
    renderOpponentHP();
}

function renderHeroHP() {
    heroHP.empty();
    heroHP.removeClass("invisible");
    for (var i = 0; i < hero.hp; i++) {
        var newPellet = $("<img>");
        newPellet.attr('src', "assets/images/healthPellet.png");
        newPellet.addClass("hpPellet");
        heroHP.delay(500).prepend(newPellet);
    }
}

function renderOpponentHP() {
    opponentHP.empty();
    opponentHP.removeClass("invisible");
    for (var i = 0; i < opponent.hp; i++) {
        var newPellet = $("<img>");
        newPellet.attr('src', "assets/images/healthPellet.png");
        newPellet.addClass("hpPellet");
        opponentHP.delay(50).prepend(newPellet);
    }
}

function reset() {
    attackButton.off("click");
    hero = new Character();
    opponent = new Character();
    heroBattler.css("background-image", "url('')");
    opponentBattler.css("background-image", "url('')");
    heroHP.addClass("invisible");
    opponentHP.addClass("invisible");
    battleText1.text("Waiting for Battle");
    battleText2.empty();
    instruction.text("Select your Hero");
    attackButton.addClass("invisible");
    heroArena.removeClass("disabled");
    opponentArena.removeClass("disabled");
    characterSelect.removeClass("disabled invisible");
    characterSelect.parent().removeClass("invisible");
    characterSelect.off("click");
    characterSelect.on("click", setCharacter);
    victories = 0;
}

characterSelect.hover(function () {
    bio.text(characters[$(this).val()].description);
});

function toggleAudio() {
    mute = !mute;
    if (mute) {
        muteButton.text("UNMUTE");
    }
    else {
        muteButton.text("MUTE");
    }
}
characterSelect.on("click", setCharacter);
$("#resetButton").on("click", reset);
muteButton.on("click", toggleAudio);