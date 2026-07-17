export type CustomerReview = {
  id: string;
  displayName: string | null;
  rating: number;
  comment: string;
  createdAt: string;
};

export type ReviewSummary = {
  totalCount: number;
  averageRating: number;
};

export type ReviewListResponse = ReviewSummary & {
  success: true;
  reviews: CustomerReview[];
  hasMore: boolean;
};

export type ReviewSubmissionResponse = ReviewSummary & {
  success: true;
  review: CustomerReview;
};

export type ReviewErrorResponse = {
  success: false;
  code: string;
};
