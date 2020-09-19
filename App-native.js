import * as React from "react";

const apiUrl = "https://jsonplaceholder.typicode.com/todos";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [shouldFetch, setShouldFetch] = React.useState(true);
  React.useEffect(() => {
      console.log("useEffect is running gloabally");
    if (shouldFetch) {
        console.log("useEffect is running in shouldFetch is true");
      setShouldFetch(false);
      console.log("fetching");
      fetch(apiUrl)
        .then(response => response.json())
        .then(json => {
          const todos = json.slice(0, 9);
          setTodos(todos);
          console.log("done fetching");
        })
        .catch(error => console.log("error", error));
    }
  }, [shouldFetch, todos]);
  return (
    <>
      <div
        style={{
          marginTop: "25px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <button onClick={() => setShouldFetch(true)}> Refetch todos  with app-native</button>
      </div>
      <div
        style={{
          marginTop: "25px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <ul>
          {todos.map(todo => (
            <li key={todo.id} style={{ marginBottom: "15px" }}>
              Title: {todo.title} <br />
              Completed:{" "}
              <input
                checked={todo.completed}
                type="checkbox"
                onChange={_ =>
                  setTodos(
                    todos.map(obj => {
                      if (obj.id === todo.id) {
                        return {
                          ...obj,
                          completed: !obj.completed
                        };
                      } else {
                        return obj;
                      }
                    })
                  )
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;