'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Oops!</h1>
        <p className="text-xl text-gray-600 mb-8">Something went wrong</p>
        <p className="text-md text-gray-500 mb-8">
          {process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred'}
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#20B486] text-white rounded-lg hover:bg-[#41e0ae] transition-colors"
          >
            Try Again
          </button>
          <Link 
            href="/" 
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Go Home
          </Link>
        </div>
          <div className="mt-8">
            <p className="text-sm text-gray-500">Error details (visible in development only):</p>
            <pre className="mt-2 p-4 bg-gray-200 rounded-lg overflow-auto text-left">
              {error.stack}
            </pre>
          </div>
      </div>
    </div>
  );
};

export default Error;