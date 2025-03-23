import { QuestionWithResponseStructure } from "../models/surveyInterface"
import { emailRegex } from "./regex"

export const validateResponseSubmission = (questions: QuestionWithResponseStructure[]): string => {

    for(let i:number = 0 ; i<questions.length ; i++){

        const {questionType, response, required, validation, min, max } = questions[i]

        const responseString = response?.trim() ?? ""

        if((required || validation) && !Boolean(responseString)){
            return `Question No. ${i+1} Required Response`
        }

        if(required){
            if(questionType === "email"){
                const isValidEmail = emailRegex.test(responseString)
                if(!isValidEmail){
                    return `Question No. ${i+1} needs to be an authentic email`
                }
            }
        }
        
        
        if(validation){
            

            var validationMessage:string = ""
             
            const inputSize:number = questionType === "text" ? responseString.length : Number(responseString);

            if(inputSize < min ){
                validationMessage = `can not ${questionType === "text" ? `have less length than `:`be less than `} ${min}`
            }

            if(inputSize > max ){
                validationMessage = `can not ${questionType === "text" ? `have more length than `:`be more than `} ${max}`
            }

            if(validationMessage){
                return ` Question No. ${i+1} ${validationMessage}`
            }
        }
    }

    return ""
} 