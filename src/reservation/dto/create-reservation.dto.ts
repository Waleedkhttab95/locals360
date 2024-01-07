import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateReservationDto {

    @ApiProperty()
    @IsString()
    guideId: string;
    @ApiProperty()
    @IsString()
    dateOfExperience: string;
    @ApiProperty()
    @IsString()
    price: string;
    @ApiProperty()
    @IsString()
    location: string;
    @ApiProperty()
    @IsString()
    qty: number;
    @ApiProperty()
    @IsString()
    transaction: string;
    @ApiProperty()
    @IsString()
    experience: string;
}
