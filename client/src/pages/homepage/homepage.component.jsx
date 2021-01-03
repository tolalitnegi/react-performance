import React from 'react';

import Directory from '../../components/directory/directory.component';

import { HomePageContainer } from './homepage.styles';

const HomePage = (props) => {
  // if (!props.sucess) {
  //   throw Error;
  // }
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  )
};

export default HomePage;
