import { Injectable, NotFoundException } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,

    private readonly cacheService: CacheService,
  ) {}

  async getAllCities(): Promise<CityEntity[]> {
    return this.cityRepository.find();
  }

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(
      `$state_${stateId}`,

      // funçao que sera simulada dentro do cache
      () =>
        this.cityRepository.find({
          where: { stateId },
        }),
    );
  }

  async getCityById(cityId: number): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      where: {
        id: cityId,
      },
    });

    if (!city) {
      throw new NotFoundException('Cidade não existente.');
    }

    return city;
  }
}
