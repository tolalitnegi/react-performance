# Performance best practices for react app

## code splitting based on router
- Dynamic import in the router file react lazy
### 1. lazy loading
### 2. suspense
#### Error Boundary 
```
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<div>Please wait...</div>}>
            <Route exact path='/' component={HomePage} />
```
### 4. shouldComponentUpdate in class components

### 5. React Memo on Functional Components
- Functional components always rerender whenever its parent re-renders 
- so if any unrelated state / props changes in a parent component the entire child component 
and its siblings re-render

```
<button>{this.state.count} clicked</button>
<Person person={{name: 'Jack' , age: 10}}>
// so if setState called in parent object for button,  Person will also rerender
// even if {name: 'Jack' , age: 10} is moved to parent state then also re-render 
```

- How to save these re-renders
- React Dev tool Profiler
- Allows us to avoid re-render if the props values do not change
- doing exact same thing as shouldComponentUpdate 
- does a shallow comparison 

#### Using React.Memo
```
// instead of 
export default ComponentName;
// use
export default React.memo(ComponentName);
```
- initial memoization might take more time then usual first mounting
- so think if you need memoization or not for all components
```
<Person person={{name:"Jack" , age: 13}}>
vs
<Person person={this.state.person}>
vs

// 1st one will always recreate the new object as its not referring to any object
// also function and props should also be re evaluated if passed as props 
```

### 6. Reselect Memoization for selecting state
- Reselect already provides memoizatoin and perf optimization 
- Reselect provides a function createSelector for creating memoized selectors.
- createSelector takes an array of input-selectors and a transform function as its arguments. 
- If the Redux state tree is mutated in a way that causes the value of an input-selector to change, the selector will call its transform function with the values of the input-selectors as arguments and return the result.
- If the values of the input-selectors are the same as the previous call to the selector, it will return the previously computed value instead of calling the transform function.
```
export const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }
)
```

### 7. React.PureComponent vs React.Component
* The major difference between React.PureComponent and React.Component is PureComponent does a shallow comparison on state change. 
* It means that when comparing scalar values it compares their values, but when comparing objects it compares only references. 
* It helps to improve the performance of the app.
You should go for React.PureComponent when you can satisfy any of the below conditions.
  1. State/Props should be an immutable object
  2. State/Props should not have a hierarchy
  3. You should call forceUpdate when data changes

##### React.Memo and React.PureComponent are same, just one is used for functional component and other for class components

### 8. useCallback hook
- memoizing the method / functions inside a component which do not change state / prop changes

```
  const dummyFunction = () => console.log('dummy');
  functionsSet.add(dummyFunction);
  // everytime the Counter is re rendered the dummyFunction is added to the set.


  // Using useCallBack hook
  // first argument the fuction to memoize, 2nd the array of arguments
  const incrementCount1 = useCallback(() => setCount1(count1 + 1), [count1]);
  const incrementCount2 = useCallback(() => setCount2(count2 + 1), [count2]);
  functionsSet.add(incrementCount1); // will only add when count1 changes but not when count2 has changed
  functionsSet.add(incrementCount2);

```
### 9. useMemo Hooks


## client code setup 
```
cd client
nvm use 10
# grpc vs  node version issues with 14
yarn install
yarn start
```
## Heroku
 https://git.heroku.com/react-performance-lalit.git 