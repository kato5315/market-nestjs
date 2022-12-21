import { Item } from 'src/entities/item.entity';
import { EntityRepository, Repository } from 'typeorm';
// import { CreateItemDto } from './dto/create-item.dto';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  // async createItem(createItemDto: CreateItemDto) {}
}
