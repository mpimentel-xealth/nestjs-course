import { Injectable, Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { LoggerService } from './logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';
// import { DataSource } from 'typeorm';

// class ConfigService {}
// class DevelopmentConfigService {}
// class ProductionConfigService {}

// @Injectable()
// export class CoffeeBrandsFactory {
//   create() {
//     return ['buddy brew 2', 'nescafe 2'];
//   }
// }

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    ConfigService,
    CoffeesService,
    {
      provide: LoggerService,
      useClass: LoggerService,
      scope: Scope.TRANSIENT,
    },
    {
      provide: COFFEE_BRANDS,
      useFactory: async () => {
        // const coffeeBrands = await connection.query('SELECT * ...');
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        return coffeeBrands;
      },
    },
    // CoffeeBrandsFactory,
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: (brandsFactory: CoffeeBrandsFactory) =>
    //     brandsFactory.create(),
    //   inject: [CoffeeBrandsFactory],
    // },
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: () => {
    //     // console.log('coffee_brands factory 1');
    //     return ['buddy brew', 'nescafe'];
    //   },
    //   scope: Scope.DEFAULT,
    // },
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
