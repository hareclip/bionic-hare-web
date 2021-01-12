import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CategoryContext } from 'context/category';
import Navbar from 'components/Navbar';
import Layout from 'components/Layout';
import Author from 'pages/Author';
import Article from 'pages/Article';
import Home from 'pages/Home';
import client from 'config/client';

function App() {

  const [categories, setCategories] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      const res = await client.get(`categories`);

      // Map ids to categories
      const allCategories = {};
      for (const { id, label } of res.data.results) {
        allCategories[id] = label;
      }

      setCategories(res.data.results);
      setCategoryMap(allCategories);
    }
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, categoryMap }}>
      <Router>
        <Navbar />
        <Layout>
          <Switch>
            {/* Application */}
            <Route path="/authors/:id" exact component={Author}></Route>
            <Route path="/articles/:id" exact component={Article}></Route>
            <Route path="/categories/:id" exact render={props => <Home key={props.match.params.id} />}></Route>
            <Route path="/" exact component={Home}></Route>
          </Switch>
        </Layout>
      </Router>
    </CategoryContext.Provider>
  );
}

export default App;
