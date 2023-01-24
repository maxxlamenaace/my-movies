import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render, act, fireEvent, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AuthModal } from '@/features/auth';

describe('AuthModal', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly', () => {
    const { baseElement } = render(<AuthModal isOpen={true} onSubmit={jest.fn()} />, {
      wrapper: BrowserRouter,
    });

    expect(baseElement).toMatchSnapshot();
  });

  describe('when user does not complete auth form', () => {
    it('renders with a disabled submit button', () => {
      const onSubmitMock = jest.fn();
      const { container } = render(<AuthModal isOpen={true} onSubmit={onSubmitMock} />, {
        wrapper: BrowserRouter,
      });

      const submitButton = container.querySelector('#auth-modal-submit-button');

      expect(submitButton).toBeDefined();

      act(() => {
        if (submitButton) {
          fireEvent.click(submitButton);
        }
      });

      waitFor(() => {
        expect(onSubmitMock).not.toHaveBeenCalled();
      });
    });
  });

  describe('when user completes the auth form and submit', () => {
    it('calls the onSubmit method with the auth form data', () => {
      const onSubmitMock = jest.fn();
      const { container } = render(<AuthModal isOpen={true} onSubmit={onSubmitMock} />, {
        wrapper: BrowserRouter,
      });

      const submitButton = container.querySelector('#auth-modal-submit-button');
      const textField = container.querySelector('#auth-modal-text-field');

      expect(submitButton).toBeDefined();
      expect(textField).toBeDefined();

      act(() => {
        if (submitButton && textField) {
          userEvent.type(textField, 'username');
          fireEvent.click(submitButton);
        }
      });

      waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith('username');
      });
    });
  });
});
