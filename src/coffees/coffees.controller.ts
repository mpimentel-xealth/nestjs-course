import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee-dto';
import { PaginationQueryDto } from '../../src/common/dto/pagination-query.dto';
import { LoggerService } from './logger.service';
import { REQUEST } from '@nestjs/core';
import { Public } from '../../src/common/decorators/public.decorator';
import { ParseIntPipe } from '../../src/common/pipes/parse-int/parse-int.pipe';
import { Protocol } from '../../src/common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    private readonly logger: LoggerService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    console.log('CoffeesController instantiated');
    console.log(request.headers);
  }

  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Public()
  @Get()
  async findAll(
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    // const { limit, offset } = paginationQuery;

    // Uncomment this to trigger timeout interceptor
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(
      'protocol ---------------------------------------------------------------------------',
    );
    console.log(protocol);

    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
