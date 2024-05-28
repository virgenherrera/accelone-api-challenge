import { Delete, applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

export function DeleteContactDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a contact by ID',
    }),
    ApiParam({
      name: 'id',
      description: 'The unique identifier of the contact to delete',
      type: String,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request: The input data is invalid or incomplete.',
    }),
    ApiResponse({
      status: 204,
      description: 'No Content: The contact has been successfully deleted.',
    }),
    ApiResponse({
      status: 404,
      description: 'Not Found: No contact found with the given ID.',
    }),
    Delete(':id'),
  );
}
