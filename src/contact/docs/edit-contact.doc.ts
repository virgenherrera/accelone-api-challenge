import { Put, applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateContactDto, ContactDto } from '../dto';

export function UpdateContactDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update an existing contact',
    }),
    ApiParam({
      name: 'id',
      description: 'The unique identifier of the contact to update',
      type: String,
    }),
    ApiBody({
      description:
        'Data transfer object containing the necessary fields to update a contact.',
      type: CreateContactDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request: The input data is invalid or incomplete.',
    }),
    ApiOkResponse({
      description: 'The contact has been successfully updated.',
      type: ContactDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Not Found: No contact found with the given ID.',
    }),
    Put(':id'),
  );
}
