import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { ContactDto, CreateContactDto } from '../dto';

@Injectable()
export class ContactService {
  private readonly contacts = new Map<number, ContactDto>();

  create(createContactDto: CreateContactDto): ContactDto {
    const id = this.contacts.size + 1;
    const newContactDto = plainToClass(ContactDto, { ...createContactDto, id });

    this.contacts.set(newContactDto.id, newContactDto);

    return newContactDto;
  }

  findOne(id: number): ContactDto {
    const contact = this.contacts.get(id);

    if (!contact)
      throw new NotFoundException(
        'Not Found: No contact found with the given ID. ' + id,
      );

    return contact;
  }

  update(id: number, updateContactDto: CreateContactDto): ContactDto {
    this.findOne(id);

    const newContactDto = plainToClass(ContactDto, { ...updateContactDto, id });

    this.contacts.set(newContactDto.id, newContactDto);

    return newContactDto;
  }

  remove(id: number): void {
    this.findOne(id);

    this.contacts.delete(id);
  }
}
