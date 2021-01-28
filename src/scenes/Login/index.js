import React from 'react';
import { LoginProvider } from '../../context/LoginContext';
import Modal from './components/Modal';
import './style.css';

export default function Login() {
  return (
    <LoginProvider>
      <div className="modal-dialog text-center">
        <div className="col-10 main-section">
          <Modal />
        </div>
      </div>
    </LoginProvider>
  );
}
