import { QuestionWithResponseStructure } from "../models/surveyInterface"

export const validateResponseSubmission = (questions: QuestionWithResponseStructure[]): string => {

    for(let i:number = 0 ; i<questions.length ; i++){

        const {questionType, response, required, validation, min, max } = questions[i]

        const responseString = response?.trim() ?? ""

        if((required || validation) && !Boolean(responseString)){
            return `Question No. ${i+1} Required Response`
        }
        
        if(validation){
            const length:number = questionType === "text" ? responseString.length : Number(responseString);
            const minValidation:string = questionType === "text" ? `Can not have less length than ${length}` : `Can not be less than ${length}`
            const maxValidation:string = questionType === "text" ? `Can not have more length than ${length}` : `Can not be more than ${length}`

            if(length < min){
                return `Question No. ${i+1} ${minValidation}`
            }
            if(length > max){
                return `Question No. ${i+1} ${maxValidation}`
            }
        }

        // "questionType": "email",

    }

    return ""
} 