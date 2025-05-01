export interface ICancellationMethod {
  id: string;
  subscriptionName: string;
  public: boolean;
  steps: string[];
  precautions: string;
  freeText: string;
  serviceUrl: string;
  createdUserId: string;
  updatedAt: Date;
}
