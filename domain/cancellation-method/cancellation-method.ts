export interface ICancellationMethod {
  id: string;
  subscriptionName: string;
  public: boolean;
  steps: string[];
  precautions: string;
  freeText: string;
  isBookmarked: boolean;
  ratedGood: boolean;
  bookmarkCount: number;
  goodCount: number;
  serviceUrl: string;
  mine: boolean;
  updatedAt: Date;
}
