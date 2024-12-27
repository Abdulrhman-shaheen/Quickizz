export type sessionAnswers = {
    _id : string,
    sess_id: string,
    answers : {
        [key: string]: {"a" : number, "b" : number, "c" : number, "d" : number},
    }

}