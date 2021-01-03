# Performance best practices for react app

## code splitting based on router
- Dynamic import in the router file react lazy
### lazy loading
## suspense
## Error Boundary 
```
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<div>Please wait...</div>}>
            <Route exact path='/' component={HomePage} />


```

## client code start 
```
cd client
nvm use 14
yarn install
yarn start
```
