export interface CompleteChoreOptions {
    server?: any
    chore_id: number
    complete: boolean
    body: {
        tracked_time: string
        done_by: number
        skipped: boolean 
    }
 }
