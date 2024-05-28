import { Controller, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ContactService } from '../services/contact.service';
import { ContactDto, CreateContactDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateContactDocs,
  DeleteContactDocs,
  GetContactDocs,
  UpdateContactDocs,
} from '../docs';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @CreateContactDocs()
  create(@Body() createContactDto: CreateContactDto): ContactDto {
    return this.contactService.create(createContactDto);
  }

  @GetContactDocs()
  findOne(@Param('id', ParseIntPipe) id: number): ContactDto {
    return this.contactService.findOne(id);
  }

  @UpdateContactDocs()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContactDto: CreateContactDto,
  ) {
    return this.contactService.update(id, updateContactDto);
  }

  @DeleteContactDocs()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.remove(id);
  }
}
