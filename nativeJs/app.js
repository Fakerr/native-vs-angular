
var generateId = (function() {
  var i = 0;
  return function() {
    return 'check' + i++;
  };
})();

function addTask(elementId, task, check) {
  var checked = check || '';
  var id =  task.id;
  var node = document.createElement('div');
        node.innerHTML = '<input type="checkbox" id="'
        + id + '" name="check' + id + '" onclick="updateTodo(this)" '
        + checked + ' ><label for="'
        + id + '">'+ task.value +'</label><br>';
  document.getElementById(elementId).appendChild(node);
}

function createTask() {
  if(!document.getElementById('input').value) {
    alert('plz, enter something !!');
    return;
  }
  var task = {
    id: generateId(),
    value: document.getElementById('input').value
  }
  addTask('todo-list', task);
  addTask('waiting', task);
  document.getElementById('input').value = '';
}

function updateTodo(obj) {
  var task = getTask(obj.id);
  if(obj.checked) {
    addTask('done', task, 'checked');
    removeTask(obj.id, 'waiting');
    updateTodoList(obj.id, true);
  }else {
    addTask('waiting', task);
    removeTask(obj.id, 'done');
    updateTodoList(obj.id, false);
  }
}

function getTask(id) {
  var labels = document.getElementsByTagName('LABEL');
  for (var i = 0; i < labels.length; i++) {
      if (labels[i].htmlFor === id) {
        return {
          value: labels[i].innerHTML,
          id: id
        };
      }
  }
}

function removeTask(id, divId) {
  var elt = document.querySelector("div#" + divId + " div input#" + id + "");
  var el = elt.parentNode;
  el.parentNode.removeChild( el );
}

function updateTodoList(id, check) {
  var elt = document.querySelector("div#todo-list div input#" + id + "");
  elt.checked = check;
}
