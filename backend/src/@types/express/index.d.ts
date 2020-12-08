/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    client: {
      id: string;
    };
  }
}
