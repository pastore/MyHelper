export interface IServerResponse {
  isSuccess: boolean;
  errorId: string;
  message: string;
  errors: any;
  result?: any;
}

