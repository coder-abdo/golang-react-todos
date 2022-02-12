import { Container } from "semantic-ui-react";
import { TodoList } from "./components/TodoList";
function App() {
  return (
    <Container className="container">
      <TodoList />
    </Container>
  );
}

export default App;
