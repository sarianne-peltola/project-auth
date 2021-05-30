import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { HeartFillIcon } from '@primer/octicons-react';

import { sign } from '../reducers/user';


const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState(null);

  const accessToken = useSelector((store) => store.user.accessToken);
  const errors = useSelector((store) => store.user.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (accessToken) {
      history.push('/');
    }
  }, [accessToken, history]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(sign(name, email, password, mode));
  };

  return (
    <PageWrapper>
      <h1>Welcome to SecretMessage!</h1>
      <h2>Please log in or register as a user in order to view your message</h2>
      <form onSubmit={onFormSubmit}>
        <Wrapper>
          <Container>
            <Heart size={24} />
            <InputBox
              id='name'
              maxLength='20'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
            />
            <Label htlFor='name'>Name</Label>
          </Container>
          <CountLine>
            <CharCount>{name.length}/20</CharCount>
          </CountLine>
        </Wrapper>
        <Wrapper>
          <Container>
            <InputBox
              id='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
            />
            <Label htlFor='email'>Email</Label>
          </Container>
        </Wrapper>
        <Wrapper>
          <Container>
            <InputBox
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
            <Label htlFor='password'>Password</Label>
          </Container>
        </Wrapper>

        <button type='submit' onClick={() => setMode('signin')}>
          Sign in
        </button>
        <button type='submit' onClick={() => setMode('signup')}>
          Register
        </button>
      </form>
      {errors && <div>{errors.message}</div>}
    </PageWrapper>
  );
};

export default Login;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Container = styled.div`
  background-color: #f5f5f5;
  border-radius: 4px 4px 0 0;
  display: flex;
  position: relative;
  box-sizing: border-box;
  width: 300px;
  height: 56px;
  :hover {
    background-color: #f1f1f1;
    border-bottom: px solid #606060;
  }
`;

const Heart = styled(HeartFillIcon)`
  position: absolute;
  top: 50%;
  left: 16px;
  right: initial;
  transform: translateY(-50%);
  color: #505050;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
`;

const InputBox = styled.input`
  border-radius: 4px 4px 0 0;
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: inherit;
  text-transform: inherit;
  align-self: flex-end;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px 16px 16px 48px;
  border: none;
  border-bottom: 1px solid;
  background-color: inherit;
  outline: none;
  :focus {
    ::placeholder {
      opacity: 0;
    }
    padding: 20px 16px 6px 48px;
    background-color: #d3d3d3;
    border-bottom: 2px solid indigo;
    ::placeholder {
      color: indigo;
    }
    :focus + label {
      bottom: 20px;
      opacity: 1;
      color: indigo;
      font-size: 12px;
    }
  }
`;

const Label = styled.label`
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 0;
  width: 100%;
  transition: 0.2s;
  padding: 20px 16px 16px 48px;
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: inherit;
  text-transform: inherit;
`;

const CountLine = styled.div`
  display: flex;
  padding-top: 5px;
  padding-right: 16px;
  padding-left: 16px;
  justify-content: space-between;
  box-sizing: border-box;
`;

const CharCount = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-family: Roboto, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.0333333333em;
  text-decoration: inherit;
  text-transform: inherit;
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-left: auto;
  margin-right: 0;
  padding-left: 16px;
  padding-right: 0;
  white-space: nowrap;
`;