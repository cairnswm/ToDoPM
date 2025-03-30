import React from 'react';
import PageLayout from '../../auth/components/pagelayout';
import MobileMenu from '../components/mobilemenu';
import { accessElf } from '../../auth/utils/accessElf';

const HomePage = () => {
  accessElf.track("Home");
  return <PageLayout>
    <MobileMenu />
  </PageLayout>
};

export default HomePage;
