import { ObjectId } from "mongodb";

export class TokenPayloadDto {
    email: string;
    id: string | ObjectId
}

export class TokenGuidePayloadDto {
    email: string;
    id: string | ObjectId ; 
    isGuide: boolean
}