import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as CacheModuleNest } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModuleNest.register({
      ttl: 999999999999999,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
