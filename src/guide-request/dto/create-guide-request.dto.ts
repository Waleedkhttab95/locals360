import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGuideRequestDto {
    @ApiProperty()
    guideId : string ; 

    @ApiProperty()
    @IsString()
    description: string ;
}
