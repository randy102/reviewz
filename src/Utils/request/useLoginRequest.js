import { useEffect } from 'react';
import { useLazyRequest } from 'Utils/request';

export function useLoginRequest(tasks) {
  // Props
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

  function sendLoginRequest(data) {
    const { username, password } = data;

    sendRequest({
      api: 'user/login',
      method: 'POST',
      data: {
        username: username,
        password: password,
      },
    });
  }

  return { sendLoginRequest, loading, refetch };
}
