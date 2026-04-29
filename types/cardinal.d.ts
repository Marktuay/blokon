declare global {
  interface Window {
    Cardinal: any;
  }
}

export interface CardinalSetupData {
  jwt: string;
  order?: any;
}

export interface CardinalContinueData {
  acsUrl: string;
  payload: string;
  transactionId: string;
}

export interface CardinalValidatedData {
  ActionCode: string;
  ErrorNumber: number;
  ErrorDescription: string;
  Validated: boolean;
  Payment: {
    ProcessorTransactionId: string;
    Type: string;
  };
}
