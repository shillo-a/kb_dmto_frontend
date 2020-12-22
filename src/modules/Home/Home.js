import React from 'react';
import { Jumbotron } from 'react-bootstrap';

import AllCategories from '../Category/AllCategories';

const Home = () => {
  return (
    <React.Fragment>

      <Jumbotron>
        <h3>Добро пожаловать в базу знаний категорийных стратегий МТО</h3>
        <p>На ресурсе представлена информация о категорийных стратегиях, контрагентах, процессах МТО, КПЭ и др.</p>
      </Jumbotron>

      <AllCategories />

    </React.Fragment>
  );
};

export default Home;
