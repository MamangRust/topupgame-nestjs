import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNominalDto } from './dto/create-nominal.dto';
import { UpdateNominalDto } from './dto/update-nominal.dto';
import { Nominal } from 'src/entities/nominal';

@Injectable()
export class NominalService {
  constructor(
    @InjectRepository(Nominal)
    private readonly nominalRepository: Repository<Nominal>,
  ) { }

  async findAll(): Promise<Nominal[]> {
    return this.nominalRepository.find();
  }

  async findOne(id: number): Promise<Nominal> {
    const nominal = await this.nominalRepository.findOne({
      where: {
        id: id
      }
    });
    if (!nominal) {
      throw new NotFoundException('Nominal not found');
    }
    return nominal;
  }

  async create(createNominalDto: CreateNominalDto): Promise<Nominal> {
    return this.nominalRepository.save(createNominalDto);
  }

  async update(
    id: number,
    updateNominalDto: UpdateNominalDto,
  ): Promise<Nominal> {
    const nominal = await this.findOne(id);
    return this.nominalRepository.save({ ...nominal, ...updateNominalDto });
  }

  async remove(id: number): Promise<void> {
    const nominal = await this.findOne(id);
    await this.nominalRepository.remove(nominal);
  }
}
