export interface IPost {
  title: string;
  content: string;
  creatorId: number;
  isPublic: boolean;
  tierId?: number;
  files?: any;
}
