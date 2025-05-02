export interface ICancellationMethod {
  id: string;
  subscriptionName: string;
  public: boolean;
  steps: string[];
  precautions: string;
  freeText: string;
  isBookmarked: boolean;
  evaluatedGood: boolean;
  bookmarkCount: number;
  goodCount: number;
  serviceUrl: string;
  mine: boolean;
  updatedAt: Date;
}
