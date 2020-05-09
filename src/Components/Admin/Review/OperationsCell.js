import React from 'react';
import DeleteReview from './DeleteReview';
import EditReview from './EditReview';
import VerifyReview from './VerifyReview';

export default function OperationsCell({ params }) {
  return (
    <div style={{ display: 'flex' }}>
      <EditReview params={params} />
      <DeleteReview params={params} />
      {!params.data.verified && <VerifyReview params={params} />}
    </div>
  );
}
