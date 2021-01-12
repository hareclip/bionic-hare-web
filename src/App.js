import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from 'components/Layout';
import Author from 'pages/Author';
import Article from 'pages/Article';
import Home from 'pages/Home';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          {/* Application */}
          <Route path="/authors/:id" exact component={Author}></Route>
          <Route path="/articles/:id" exact component={Article}></Route>
          <Route path="/categories/:id" exact component={Home}></Route>
          <Route path="/" exact component={Home}></Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
