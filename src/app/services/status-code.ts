export interface ErrorServer {
  StatusCode: number;
  Message: string;
  path: string;
  method: string;
}

export interface ErrorValidation {
  Message: string;
  DetailsErrors: DetailsError[];
}

export interface DetailsError {
  Field: string;
  ErrorMessage: string[];
}
