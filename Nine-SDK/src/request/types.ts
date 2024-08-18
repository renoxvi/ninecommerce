export declare type CreateRequestParams = {
  requestInfo: {
    expectedAmount: number;

    // The payee identity. Not necessarily the same as the payment recipient.
    payeeAddress: string;

    // The payer identity. If omitted, any identity can pay the request.
    payerAddress: string;

    // The request creation timestamp.
    timestamp: string;
  };

  // The contentData can contain anything.
  contentData: {
    reason: string;
    dueDate: string;
  };

  // The identity that signs the request, either payee or payer identity.
  signerAddress: string;
};
