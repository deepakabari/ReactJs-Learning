import { Component } from "react";

type CounterState = {
  count: number;
};

class ClassCounter extends Component<unknown, CounterState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    console.log("ClassCounter Mounted...");
  }

  componentDidUpdate() {
    console.log("ClassCounter Updated...");
  }

  componentWillUnmount() {
    console.log("ClassCounter Unmounted...");
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div className="p-4 border rounded-x1 shadow-md m-2">
        <h2 className="text-x1 font-bold">Class Component Counter</h2>
        <p>Count: {this.state.count}</p>
        <button
          onClick={this.increment}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Increment
        </button>
      </div>
    );
  }
}

export default ClassCounter;
