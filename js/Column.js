function Column(name) {
	var self = this;

	this.id = randomString();
	this.name = name;
	this.element = generateTemplate('column-template', { 
		id: this.id,
		name: this.name 
	});
	
	this.element.querySelector('.column').addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-delete')) {
			self.removeColumn();
		}

		if (event.target.classList.contains('add-card')) {
			self.addCard(new Card(prompt("Enter the name of the card")));
		}
	});		
} // Table column

Column.prototype = {
    addCard: function(card) {
      this.element.querySelector('ul').appendChild(card.element);
    },
    removeColumn: function() {
      this.element.parentNode.removeChild(this.element);
    }
};