// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetEntityOptions {
    entity_type: string
    method: GetEntityMethod
    server?: any
    url?: string
    key?: string
 }

 export enum GetEntityMethod {
    GET = "GET",
    PUT = "PUT",
  }