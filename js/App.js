// Template Mustache generate function
function generateTemplate(name, data, basicElement) {
	var template = document.getElementById(name).innerHTML;
	var element = document.createElement(basicElement || 'div');

	Mustache.parse(template);
	element.innerHTML = Mustache.render(template, data);

	return element;
};

/* API endpoint: 
    GET https://kodilla.com/pl/bootcamp-api/board */

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': 'X-Client-Id',
  'X-Auth-Token': 'X-Auth-Token'
}; // Server connection

/* 
GET /board
-----------------------------
Response:
{
   id: int,
   name: string,
   columns: [{
       id: int,
       name: string,
       cards: [{
           id: int,
           bootcamp_kanban_column_id: int,
           name: string
       }]
   }]
}
*/

// Function polls the server about the array resource - after page refresh
fetch(baseUrl + '/board', { headers: myHeaders })
	.then(function(resp) {
		return resp.json();
	})
	.then(function(resp) {
		setupColumns(resp.columns);
}); 

// Creating columns after page refresh
function setupColumns(columns) {
  	columns.forEach(function(column) {
		var col = new Column(column.id, column.name);
      	board.addColumn(col);
  	});
}

function setupColumns(columns) {
  columns.forEach(function (column) {
		var col = new Column(column.id, column.name);
    board.addColumn(col);
    setupCards(col, column.cards);
  });
}

// Creating cards after page refresh
function setupCards(col, cards) {
	cards.forEach(function (card) {
    var cardObj = new Card(card.id, card.name);
  	col.addCard(cardObj);
	});
}

	// CREATING COLUMNS
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// ADDING COLUMNS TO THE BOARD
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// CREATING CARDS
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

	// ADDING CARDS TO COLUMNS
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
