import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="error-message bg-red-100 text-red-700 p-4 rounded-xl mb-4 flex items-center gap-2">
      <i className="fas fa-exclamation-circle"></i>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;