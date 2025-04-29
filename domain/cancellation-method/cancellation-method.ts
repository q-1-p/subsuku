export interface ICancellationMethod {
  id: string;
  subscriptionName: string;
  steps: string[];
  public: boolean;
  createdUserId: string;
  updatedAt: Date;
}
