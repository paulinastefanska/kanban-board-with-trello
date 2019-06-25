function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.element = generateTemplate('card-template', { 
		description: this.name, id: this.id}, 'li');

	this.element.querySelector('.card').addEventListener('click', function (event) {
		event.stopPropagation();

		if (event.target.classList.contains('btn-delete')) {
		    self.removeCard();
		}
	});
}

/*	DELETE /card/{id}
	------------------------------
	Request:
	{id}: int - id card we want to remove
	------------------------------
	Response:
	{
	   id: int
	}	*/

Card.prototype = {
	removeCard: function() {
	  var self = this;

	  fetch(prefix + baseUrl + '/card/' + self.id, { 
	  	method: 'DELETE', 
	  	headers: myHeaders 
	  })
	    .then(function(resp) {
	      return resp.json();
	    })
	    .then(function(resp) {
	      self.element.parentNode.removeChild(self.element);
	    });
	},
};	

/*	PUT /card/{id}
	------------------------------
	Request:
	{id}: int - id card we want to edit
	name: string - new name card
	bootcamp_kanban_column_id: int - the column id to which we want to move the post
	------------------------------
	Response:
	{
	id: int
	}	*/
