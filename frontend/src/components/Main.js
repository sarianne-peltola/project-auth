import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { API_URL } from '../reusable/urls';

const Main = () => {
  const [secretMessage, setSecretMessage] = useState('');
  const accessToken = useSelector((store) => store.user.accessToken);
  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
      history.push('/login');
    } else {
      const options = {
        method: 'GET',
        headers: {
          Authorization: accessToken,
        },
      };

      fetch(API_URL('mypage'), options)
        .then((res) => res.json())
        .then((data) => setSecretMessage(data));
    }
  }, [accessToken, history]);

  return (
    <div>
      <div>{secretMessage}</div>
    </div>
  );
};

export default Main;
