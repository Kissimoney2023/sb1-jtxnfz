type ErrorContext = string;

interface ErrorDetails {
  message: string;
  code?: string;
  context?: string;
  timestamp: string;
}

export function handleError(error: unknown, context?: ErrorContext): Error {
  const errorDetails: ErrorDetails = {
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString()
  };

  if (error instanceof Error) {
    errorDetails.message = error.message;
  } else if (typeof error === 'string') {
    errorDetails.message = error;
  }

  if (context) {
    errorDetails.context = context;
  }

  // Log error for debugging
  console.error('Error Details:', {
    ...errorDetails,
    error
  });

  return new Error(errorDetails.message);
}