// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetEntityOptions {
    entity_type: string
    server?: any
 }

 export enum GetEntityMethod {
    GET = "GET",
    PUT = "PUT",
  }