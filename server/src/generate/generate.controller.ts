import { Controller, Post, Body } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { UserGenerateRequest } from './request/user-generate.request';
import { UserGenerateResponse } from './response/user-generate.response';

@Controller({ path: 'generate', version: '1' })
export class GenerateController {
  constructor(private readonly generateService: GenerateService) { }

  @Post('user-generate')
  async userGenerate(@Body() requestBody: UserGenerateRequest): Promise<UserGenerateResponse> {
    return await this.generateService.userGenerate(requestBody);
  }
}
