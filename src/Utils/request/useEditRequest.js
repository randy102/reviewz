import { useEffect } from 'react';
import { useLazyRequest } from 'Utils/request';

import { getCurrentUser } from 'Utils/auth';

export function useEditRequest(tasks) {
  // Params destructuring
  const { onResponse = () => null, onError = () => null } = tasks;

  // Request
  const [
    sendRequest,
    { data: response, error, loading, refetch },
  ] = useLazyRequest();

  // Error
  useEffect(() => {
    if (!error) return;
    onError(error);
  }, [error]);

  // Response
  useEffect(() => {
    if (!response) return;
    onResponse(response);
  }, [response]);

  function sendEditRequest(data) {
    console.log('edit request data:', data);
    sendRequest({
      api: `user/${getCurrentUser().id}`,
      method: 'PUT',
      data: data,
    });
  }

  return { sendEditRequest, loading, refetch };
}
