import { Post, applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateContactDto, ContactDto } from '../dto';

export function CreateContactDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new contact',
    }),
    ApiOperation({ summary: 'Create a new contact' }),
    ApiBody({
      description:
        'Data transfer object containing the necessary fields to create a new contact.',
      type: CreateContactDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
    }),
    ApiOkResponse({
      description: 'The contact has been successfully created.',
      type: ContactDto,
    }),
    Post(),
  );
}
