const todo = [];

function addTodo() {
  const date = document.querySelector("#date");
  const todoInput = document.querySelector(".js-todo");

  const todoName = todoInput.value;
  const todoDate = date.value;
  todo.push({ name: todoName, date: todoDate });
  document.querySelector(".js-todo").value = "";
  document.querySelector("#date").value = "";
  display();
}

function display() {
  let list = "";
  for (let i = 0; i < todo.length; i++) {
    const { name, date } = todo[i];
    list += `
                <div class="todo-item">
                    <span>${name}</span>
                    <span>${date}</span>
                    <button onclick="
                        deleteTodo(${i});
                    ">delete</button>
                </div>`;
  }
  document.querySelector(".js-todoList").innerHTML = list;
}

function deleteTodo(index) {
  todo.splice(index, 1);
  display();
}
