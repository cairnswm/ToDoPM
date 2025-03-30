import React from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { useSettings } from '../context/SettingsContext';
import ComingSoon from '../components/comingsoon';
import PageLayout from '../components/pagelayout';
import BackBar from '../components/backbar';
import { accessElf } from '../utils/accessElf';

const Admin = () => {
  const { settings } = useSettings();
  accessElf.track("Admin");

  return (
    <PageLayout>
      <BackBar />
      <ComingSoon />      
    </PageLayout>
  );
};

export default Admin;
