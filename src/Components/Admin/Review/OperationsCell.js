import React from 'react';
import DeleteReview from './DeleteReview';
import EditReview from './EditReview';

export default function OperationsCell({ params }) {
  return (
    <div style={{ display: 'flex' }}>
      <EditReview params={params} />
      <DeleteReview params={params} />
    </div>
  );
}
