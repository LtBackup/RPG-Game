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
megaMan.pic = "assets/images/megaMan.png"
megaMan.description = "Mega Man is Dr. Light's lab assistant redesigned to combat the evil plans of Dr. Wily.\n\nHis attack is the Mega Buster: an arm cannon that can cover an area with a burst of projectiles";

var protoMan = new Character();
protoMan.name = "Proto Man";
protoMan.atk = 4;
protoMan.counter = 2;
protoMan.weapons = [false, true, false, false];
protoMan.weaponIndex = 1;
protoMan.atkName = "Proto Shield Attack";
protoMan.weaknessIndex = 2;
protoMan.pic = "assets/images/protoMan.png"
protoMan.description = "Proto Man is Dr. Light's first creation, and the predecessor to Mega Man.\n\nProto Man carries the Proto Shield. He can block weaker projectiles and shoot from behind cover.";

var gutsMan = new Character();
gutsMan.name = "Guts Man";
gutsMan.atk = 4;
gutsMan.counter = 2;
gutsMan.weapons = [false, false, true, false];
gutsMan.weaponIndex = 2;
gutsMan.atkName = "Guts Punch";
gutsMan.weaknessIndex = 3;
gutsMan.pic = "assets/images/gutsMan.png"
gutsMan.description = "Guts Man is a large construction robot reprogrammed by Dr. Wily to use his strength for evil deeds.\n\nGuts Man uses the Guts Punch attack that penetrates most defenses.";

var quickMan = new Character();
quickMan.name = "Quick Man";
quickMan.atk = 4;
quickMan.counter = 2;
quickMan.weapons = [false, false, false, true];
quickMan.weaponIndex = 3;
quickMan.atkName = "Quick Boomerang";
quickMan.weaknessIndex = 0;
quickMan.pic = "assets/images/quickMan.png"
quickMan.description = "Quick Man is a fast-moving battle robot designed and built by Dr. Wily.\n\nQuick Man throws Quick Boomerangs, catching slower targets by surprise.";

var characters = [megaMan, gutsMan, protoMan, quickMan];
var weaponReference = ["Mega Buster", "Proto Shield Attack", "Guts Punch", "Quick Boomerang"];
var victories = 0;
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
var newPellet = $("<img>");
newPellet.attr('src', "assets/images/healthpelletOrig.png");

function setCharacter() {
    $(".character-select").off("click").on("click", setOpponent);
    selectedCharButton = $(this);
    selectedCharButton.parent().addClass("invisible");
    hero = jQuery.extend(true, {}, characters[selectedCharButton.val()]);
    $("#heroBattler").css("background-image", "url(" + hero.pic + ")");
    instruction.text("Select an opponent");
    renderHeroHP();
}

function setOpponent() {
    $("#opponentArena").removeClass("disabled");
    $(".character-select").off("click");
    selectedOpponentButton = $(this);
    selectedOpponentButton.addClass("disabled");
    opponent = jQuery.extend(true, {}, characters[$(this).val()]);
    $("#opponentBattler").css("background-image", "url(" + opponent.pic + ")");
    instruction.text("Attack when ready!");
    attackButton.removeClass("invisible");
    $("#attackButton").on("click", attack);
    renderOpponentHP();
}

function attack() {
    console.log(opponent.hp);
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
            //if(!mute)death.play();
        }
    }
    else {
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
            //if(!mute)death.play();
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
}

function renderHP(){
    renderHeroHP();
    renderOpponentHP();
}

function renderHeroHP() {
    heroHP.empty();
    heroHP.removeClass("invisible");
    for (var i = 0; i < hero.hp; i++) {
        var newPellet = $("<img>");
        newPellet.attr('src', "assets/images/healthpellet.png");
        newPellet.addClass("hpPellet");
        heroHP.delay(500).prepend(newPellet);
    }
}

function renderOpponentHP() {
    opponentHP.empty();
    opponentHP.removeClass("invisible");
    for (var i = 0; i < opponent.hp; i++) {
        var newPellet = $("<img>");
        newPellet.attr('src', "assets/images/healthpellet.png");
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
    instruction.text("Choose your Hero");
    attackButton.addClass("invisible");
    heroArena.removeClass("disabled");
    opponentArena.removeClass("disabled");
    characterSelect.removeClass("disabled invisible");
    characterSelect.parent().removeClass("invisible");
    characterSelect.on("click", setCharacter);
    victories = 0;
}

characterSelect.hover(function () {
    bio.text(characters[$(this).val()].description);
});

$(".character-select").on("click", setCharacter);
$("#resetButton").on("click", reset);