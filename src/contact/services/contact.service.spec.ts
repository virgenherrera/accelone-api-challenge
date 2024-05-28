import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto, ContactDto } from '../dto';

describe('UT:ContactService', () => {
  let service: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactService],
    }).compile();

    service = module.get(ContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(ContactService);
  });

  describe('create', () => {
    it('should create a new contact', () => {
      // Arrange
      const createContactDto: CreateContactDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
      };

      // Act
      const result = service.create(createContactDto);

      // Assert
      expect(result).toBeInstanceOf(ContactDto);
      expect(result.id).toBe(1);
      expect(result.name).toBe(createContactDto.name);
      expect(result.email).toBe(createContactDto.email);
      expect(result.phone).toBe(createContactDto.phone);
    });
  });

  describe('findOne', () => {
    it('should return a contact by ID', () => {
      // Arrange
      const createContactDto: CreateContactDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
      };
      const createdContact = service.create(createContactDto);

      // Act
      const result = service.findOne(createdContact.id);

      // Assert
      expect(result).toBeInstanceOf(ContactDto);
      expect(result.id).toBe(createdContact.id);
      expect(result.name).toBe(createdContact.name);
      expect(result.email).toBe(createdContact.email);
      expect(result.phone).toBe(createdContact.phone);
    });

    it('should throw NotFoundException if contact does not exist', () => {
      // Act & Assert
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an existing contact', () => {
      // Arrange
      const createContactDto: CreateContactDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
      };
      const createdContact = service.create(createContactDto);
      const updateContactDto: CreateContactDto = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '0987654321',
      };

      // Act
      const result = service.update(createdContact.id, updateContactDto);

      // Assert
      expect(result).toBeInstanceOf(ContactDto);
      expect(result.id).toBe(createdContact.id);
      expect(result.name).toBe(updateContactDto.name);
      expect(result.email).toBe(updateContactDto.email);
      expect(result.phone).toBe(updateContactDto.phone);
    });

    it('should throw NotFoundException if contact does not exist', () => {
      // Arrange
      const updateContactDto: CreateContactDto = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '0987654321',
      };

      // Act & Assert
      expect(() => service.update(999, updateContactDto)).toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove an existing contact', () => {
      // Arrange
      const createContactDto: CreateContactDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
      };
      const createdContact = service.create(createContactDto);

      // Act
      service.remove(createdContact.id);

      // Assert
      expect(() => service.findOne(createdContact.id)).toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if contact does not exist', () => {
      // Act & Assert
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });
});
