import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { Item } from '../entities/item.entity';
import { ItemStatus } from './item.status.enum';
import { ItemRepository } from './item.repository';
import { User } from 'src/entities/user.entity';
import { throwError } from 'rxjs';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}
  private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.itemRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createItem: CreateItemDto, user: User): Promise<Item> {
    return await this.itemRepository.createItem(createItem, user);
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);

    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません');
    }
    item.status = ItemStatus.SOLD_OUT;
    item.updatedAt = new Date().toISOString();
    await this.itemRepository.save(item);
    return item;
  }

  async delete(id: string, user: User): Promise<void> {
    const item = await this.findById(id);
    if (item.userId !== user.id) {
      throw new BadRequestException('他人の商品を削除することはできません');
    }
    await this.itemRepository.delete(id);
  }
}
