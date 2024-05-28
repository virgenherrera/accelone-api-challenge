import { Get, applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ContactDto } from '../dto';

export function GetContactDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a contact by ID',
    }),
    ApiParam({
      name: 'id',
      description: 'The unique identifier of the contact',
      type: String,
    }),
    ApiResponse({
      status: 404,
      description: 'Not Found: No contact found with the given ID.',
    }),
    ApiOkResponse({
      description: 'The contact has been successfully retrieved.',
      type: ContactDto,
    }),
    Get(':id'),
  );
}
