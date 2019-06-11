/*---------- 2019.06.11 ----------------------*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.addTask = this.addTask.bind(this);
  }

  componentDidMount() {
    // runs once when the app loads
    // use ajax to get initial list etc.
  }

  addTask(taskValue) {
    this.setState({
      tasks: [...this.state.tasks, taskValue]
    });
  }

  render() {
    return (
      <div>
        {this.state.tasks.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <TodoList todos={this.state.tasks} />
        )}
        <TodoForm handleSubmit={this.addTask} />
      </div>
    );
  }
}

const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map(item => {
        return <li key={item}>{item}</li>;
      })}
    </ul>
  );
};

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      entry: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.entry);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.entry} onChange={this.handleChange} />
        <button>Add Task</button>
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
