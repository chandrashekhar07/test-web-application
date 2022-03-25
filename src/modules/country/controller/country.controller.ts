import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('country')
@Controller('country')
export class CountryController {}
