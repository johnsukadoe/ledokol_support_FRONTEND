export interface Post {
  _id: string;
  timestamp: number;
  user_id: number;
  titleEN: string;
  titleRU: string;
  descriptionEN: string;
  descriptionRU: string;
  preview?: {
    type: string;
    source: string;
  };
}
