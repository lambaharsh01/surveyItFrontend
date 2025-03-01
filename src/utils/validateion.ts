import { QuestionWithResponseStructure } from "../models/surveyInterface"

export const validateResponseSubmission = (questions: QuestionWithResponseStructure[]): ({message:string, data:QuestionWithResponseStructure[]}) => {

    for(let i:number = 0 ; i<questions.length ; i++){

        const {questionType, response, required, validation, min, max } = questions[i]

        const responseString = response?.trim() ?? ""

        if((required || validation) && !Boolean(responseString)){
            return {message:`Question No. ${i} Required Response `, data:[]}
        }
        
        if(validation){
            let value:number = questionType === "text" ? responseString.length : Number(responseString);


            if(value < min){
                return {message:`Question No. ${i} Can Not be`, data:[]}
            }
            if(value > max){

            }
        }

        // "questionType": "email",

    }

    return {message:"", data:questions}
} 