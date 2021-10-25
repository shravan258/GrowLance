import React from 'react';
import { useHistory } from 'react-router';

const ServiceProviderProfile = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Service Provider</h1>
      <button onClick={() => history.push('/')}>Logout</button>
    </div>
  );
};

export default ServiceProviderProfile;
