import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Voucher } from 'src/entities/voucher';
import { Category } from 'src/entities/category';
import { Nominal } from 'src/entities/nominal';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Nominal)
    private readonly nominalRepository: Repository<Nominal>,
  ) { }

  /// client

  async getVoucherIds(): Promise<number[]> {
    try {
      const result = await this.voucherRepository.query(
        'SELECT id FROM voucher',
      );
      const voucherIds = result.map((voucher: Voucher) => voucher.id);

      return voucherIds
    } catch (error) {
      throw error;
    }
  }

  async getVoucher(id: number): Promise<Voucher> {
    try {
      const voucher = await this.voucherRepository.findOne({
        where: {
          id: id,
        },
        relations: ['category', 'nominals'],
      });

      if (!voucher) {
        throw new NotFoundException('Voucher not found');
      }

      return voucher;
    } catch (error) {
      throw error;
    }
  }


  // admin
  async findAll(): Promise<Voucher[]> {
    return this.voucherRepository.find();
  }

  async findById(id: number): Promise<Voucher> {
    const voucher = await this.voucherRepository.findOne({
      where: {
        id
      }
    });
    if (!voucher) {
      throw new NotFoundException('Voucher not found');
    }
    return voucher;
  }

  async create(createVoucherDto: CreateVoucherDto, image: Express.Multer.File): Promise<void> {
    const { name, categoryId, nominalIds } = createVoucherDto;
    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId
      }
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const nominals = await this.nominalRepository.find({
      where: {
        id: In(nominalIds)
      }
    });
    if (nominals.length !== nominalIds.length) {
      throw new NotFoundException('Nominal not found');
    }
    const voucher = this.voucherRepository.create({
      name,
      category,
      nominals,
      imageName: image.filename,
    });
    await this.voucherRepository.save(voucher);


  }

  async update(id: number, updateVoucherDto: UpdateVoucherDto, image: Express.Multer.File): Promise<void> {
    const { name, categoryId, nominalIds } = updateVoucherDto;
    const voucher = await this.findById(id);
    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId
      }
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const nominals = await this.nominalRepository.find({
      where: {
        id: In(nominalIds)
      }
    });
    if (nominals.length !== nominalIds.length) {
      throw new NotFoundException('Nominal not found');
    }
    voucher.name = name;
    voucher.category = category;
    voucher.nominals = nominals;

    if (image) {
      voucher.imageName = image.filename;
    }
    await this.voucherRepository.save(voucher);

  }

  async delete(id: number): Promise<void> {
    const voucher = await this.findById(id);
    await this.voucherRepository.remove(voucher);

    await fs.unlink(path.resolve("public", "uploads", "voucher", voucher.imageName));
  }
}
