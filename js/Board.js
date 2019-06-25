var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.element.appendChild(column.element);
      initSortable(column.id);
    },
    element: document.querySelector('#board .column-container')
};

function initSortable(id) {
    var el = document.getElementById(id);
    var sortable = Sortable.create(el, {
      group: 'kanban',
      sort: true
    });
}

document.querySelector('#board .create-column').addEventListener('click', function() {
  var name = prompt('Enter a column name');
  var data = new FormData();

  data.append('name', name);

  fetch(prefix + baseUrl + '/column', {
      method: 'POST',
      headers: myHeaders,
      body: data,
    })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(resp) {
      var column = new Column(resp.id, name);
      board.addColumn(column);
    });
});


/*  ==============================
  POST /column
  ------------------------------
  Request:
  name: string - name of the column to create
  ------------------------------
  Response:
  {
     id: int
  } */
