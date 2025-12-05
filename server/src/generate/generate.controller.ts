import { FastifyReply } from 'fastify';
import { Controller, Post, Header, Res, Body } from '@nestjs/common';
import { GenerateService } from './generate.service';
import { UserGenerateRequest } from './request/user-generate.request';

@Controller({ path: 'generate', version: '1' })
export class GenerateController {
  constructor(private readonly generateService: GenerateService) { }

  @Post('user-generate')
  @Header('Content-Type', 'text/plain; charset=utf-8')
  async userGenerate(@Res() reply: FastifyReply, @Body() requestBody: UserGenerateRequest): Promise<void> {
    const controller: AbortController = new AbortController();
    reply.raw.on('close', (): void => {
      controller.abort();
    });
    const response: Response = await this.generateService.userGenerate(requestBody, controller.signal);
    reply.send(response.body);
  }
}
