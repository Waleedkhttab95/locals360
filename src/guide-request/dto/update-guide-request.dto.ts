import { PartialType } from '@nestjs/mapped-types';
import { CreateGuideRequestDto } from './create-guide-request.dto';

export class UpdateGuideRequestDto extends PartialType(CreateGuideRequestDto) {
    
}
