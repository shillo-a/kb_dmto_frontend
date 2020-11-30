import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import AllCategories from '../../Category/components/AllCategories';


const Home = () => {
  return (
    <React.Fragment>

      <Jumbotron>
        <Container>
            <h3>Добро пожаловать в базу знаний категорийных стартегий МТО</h3>
            <p>На ресурсе представлена информация о категорийных стратегиях, контрагентах, процессах МТО, КПЭ и др.</p>
          </Container>
      </Jumbotron>

      <AllCategories />

    </React.Fragment>
  );
};

export default Home;
