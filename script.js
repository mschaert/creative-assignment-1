var deck = [];
var p1_deck = [];
var p2_deck = [];
var currentPile = [];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var suits = ["&#9827;", "&#9830;", "&#9829;", "&#9824;"];

$("#startGame").click(function() {
	deck = [];
	p1_deck = [];
	p2_deck = [];

	this.disabled = true;
	$(this).toggle();

	for (var i = 0; i < suits.length; i++) {
		for (var j = 0; j < values.length; j++) {
			deck.push(values[j] + suits[i]);
		}
	}

	// Shuffle deck
	$("#gameStatus").text("Shuffling deck...");
	setTimeout(function() {
		$("#gameStatus").text("Dealing cards...");
		$("#cards_p1").text(p1_deck.length);
		$("#cards_p2").text(p2_deck.length);

		setTimeout(function() {
			$("#gameStatus").text("");
			$("#playWar").prop("disabled", false).toggle();
		}, 1000);
	}, 1000);

	for (var i = deck.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = deck[i];
		deck[i] = deck[j];
		deck[j] = temp;
	}

	// Deal deck
	for (var i = 0; i < deck.length; i++) {
		if (i % 2 == 0) {
			p1_deck.push(deck[i]);
		} else {
			p2_deck.push(deck[i]);
		}
	}
});

$("#playWar").click(function() {

	var p1_card = p1_deck.shift();
	var p2_card = p2_deck.shift();

	p1_suit = p1_card.slice(-7);
	p2_suit = p2_card.slice(-7);

	p1_card_value = p1_card.slice(0, -7);
	p2_card_value = p2_card.slice(0, -7);

	p1_value = values.indexOf(p1_card.slice(0, -7));
	p2_value = values.indexOf(p2_card.slice(0, -7));

	$("#board_p1 .cardValue").html(p1_card_value);
	$("#board_p2 .cardValue").html(p2_card_value);

	$("#board_p1 .suit").html(p1_suit);
	$("#board_p2 .suit").html(p2_suit);

	if (p1_value > p2_value) {
		$("#playWar").text("Play");
		$("#gameStatus").text("Player 1 wins the hand");
		p1_deck.push(p2_card);
		p1_deck.push(p1_card);

		for (var i = 0; i < currentPile.length; i++) {
			p1_deck.push(currentPile[i]);
		}

		currentPile = [];
	} else if (p2_value > p1_value) {
		$("#playWar").text("Play");
		$("#gameStatus").text("Player 2 wins the hand");
		p2_deck.push(p1_card);
		p2_deck.push(p2_card);

		for (var i = 0; i < currentPile.length; i++) {
			p2_deck.push(currentPile[i]);
		}

		currentPile = [];
	} else {
		currentPile.push(p1_card);
		currentPile.push(p2_card);

		// Add additional cards
		if (p1_deck.length > 1) {
			p1_card = p1_deck.shift();
			currentPile.push(p1_card);
		}

		if (p2_deck.length > 1) {
			p2_card = p2_deck.shift();
			currentPile.push(p2_card);
		}

		$("#playWar").text("WAR! (" + currentPile.length + ")");
		$("#gameStatus").text("Tie. Go to war!");
	}

	$("#cards_p1").text(p1_deck.length);
	$("#cards_p2").text(p2_deck.length);

	if (p1_deck.length == 0 || p2_deck.length == 0) {
		// $("#startGame").prop("disabled", false).toggle();
		$("#playWar").prop("disabled", true).toggle();

		if (p1_deck.length == 0) {
			$("#gameStatus").text("Player 2 wins the game!");
		} else {
			$("#gameStatus").text("Player 1 wins the game!");
		}

		$("#easterEgg").toggle();
		$("#boardContainer").toggle();

		setTimeout(function() {
			$("#easterEgg").attr('src', $("#easterEgg").attr('src') + '&autoplay=1');
		}, 1000);
	}
});