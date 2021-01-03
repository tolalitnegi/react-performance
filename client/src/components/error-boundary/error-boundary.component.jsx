import React from 'react';

class ErrorBoundary extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      hasErrored : false
    }
  }

  // this LIFECYCLE method checks if any of the child component of this component
  // has thrown any error
  static getDerivedStateFromError(error){
    return {hasErrored: true}; // new state returned

  }

  // 2nd Lifecycle method
  // gets error and info around that, you can do any sideeffect on that
  componentDidCatch(error, info){
    console.log(error)
  }

  // conditionally return some message or component
  render(){
    if(this.state.hasErrored){ // Common error Page :
      return <div> Something went wrong</div>;
    }
    return this.props.children; // render the child component usual
  }
}

export default ErrorBoundary;