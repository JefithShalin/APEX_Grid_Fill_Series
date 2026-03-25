/* Page Designer → Execute when Page Loads */
/* Implements Excel-like Copy & Fill Series functionality in APEX Interactive Grid */

$(document).ready(function () { 

  // Variables to store dragged value and column
  let draggedValue = null;
  let draggedColumn = null;

  // Capture value on mouse down
  $(document).on("mousedown", ".checkname", function (event) {
    let $cell = $(this);
    let $row = $cell.closest("tr");

    let ig$ = apex.region("my_ig").widget();
    let model = ig$.interactiveGrid("getViews", "grid").model;
    let record = model.getRecord($row[0].dataset.id);

    // Identify column name
    let columnIdx = $cell.index();
    let view = ig$.interactiveGrid("getViews", "grid");
    let config = view.modelColumns;
    let columnName = Object.keys(config)[columnIdx];

    // Store selected value and column
    if (columnName) {
      draggedValue = model.getValue(record, columnName);
      draggedColumn = columnName;
    }

    event.preventDefault();
  });

  // Apply value while dragging across rows
  $(document).on("mousemove", "tr", function () {
    if (draggedValue !== null && draggedColumn !== null) {
      let $row = $(this);

      let ig$ = apex.region("my_ig").widget();
      let model = ig$.interactiveGrid("getViews", "grid").model;
      let record = model.getRecord($row[0].dataset.id);

      model.setValue(record, draggedColumn, draggedValue);
    }
  });

  // Reset values on mouse release
  $(document).on("mouseup", function () {
    draggedValue = null;
    draggedColumn = null;
  });

});
