import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CategoryContext } from 'context/category';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Layout from 'components/Layout';
import Author from 'pages/Author';
import Article from 'pages/Article';
import Home from 'pages/Home';
import Archive from 'pages/Archive';
import Search from 'pages/Search';
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
            <Route path="/articles/:id" exact render={props => <Article key={props.match.params.id} />}></Route>
            <Route path="/categories/:id" exact render={props => <Home key={props.match.params.id} />}></Route>
            <Route path="/archive/:page" exact render={props => <Archive key={props.match.params.page} />}></Route>
            <Route path="/archive" exact component={Archive}></Route>
            <Route path="/search/:page" exact render={props => <Search key={`${props.match.params.page}/${props.location.search}`} />}></Route>
            <Route path="/search" exact render={props => <Search key={props.location.search} />}></Route>
            <Route path="/" exact component={Home}></Route>
          </Switch>
        </Layout>
        <Footer />
      </Router>
    </CategoryContext.Provider>
  );
}

export default App;
