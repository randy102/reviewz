import { useEffect } from 'react';
import { useLazyRequest } from 'Utils/request';

export default function useUploadImage(tasks) {
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

  function uploadImage(data) {
    sendRequest({
      api: 'image',
      method: 'POST',
      data: data,
    });
  }

  return { uploadImage, loading, refetch };
}
