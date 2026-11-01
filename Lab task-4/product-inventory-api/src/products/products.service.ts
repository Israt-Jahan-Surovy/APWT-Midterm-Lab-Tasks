import { UpdateProductDto } from './dto/update-product.dto.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity.js';
import { Repository } from 'typeorm';
import {PartialUpdateProductDto } from './dto/partial-update-product.dto.js';
import { ILike } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Products) private productsRepository: Repository<Products>) {}


           async create(dto:CreateProductDto){
        const product = this.productsRepository.create(dto); //no await needed cz 'create' on typeorm is synchronous
        const savedProduct= await this.productsRepository.save(product);

        return{
            message:'Product created successfully',
            data:savedProduct,
        };

    }

        //all products
    async getAllProducts(){
        const getallPro=await this.productsRepository.find({
            order:{
                  createdAt:'DESC',
            },
            select:{
                id:true,
                name:true,
                description:true,
                stock:true,
                price:true,
                category:true,
                isActive:true,
                updatedAt:true,

            },
        });
        return {
            message:'Product retrieved successfully',
            count:getallPro.length,
            data:getallPro,
        };
    }

    //get product by id only
    async getProductById(id:number){
        const findbyid= await this.productsRepository.findOne({
            where:{
                id:id,
            },
            select:
            {
                id:true,
                name:true,
                description:true,
                stock:true,
                price:true,
                category:true,
                isActive:true,
                createdAt:true,
                updatedAt:true,
            },
        });

        if(!findbyid){
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return {
            message:`Product with id ${id} retreived successfully`,
            data:findbyid,
        };
    }

    //partially update patch
    async UpdateProduct(id:number, dto: PartialUpdateProductDto){

        const product= await this.productsRepository.findOne(
            {
                where:{
                    id:id,
                }
            }
        );
        if(!product){
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        Object.assign(product,dto);


        const update = await this.productsRepository.save(product);

        return{
            message:"Product partially updated",
            data:update,
        };
    }
    
    //full update put
    async replace(id:number, dto:UpdateProductDto){
        const product = await this.productsRepository.findOne({
            where:{
                id:id,
            }
        });
        if(!product){
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        const update = await this.productsRepository.save({
            id,...dto,
        });
        return{
            message:"Product replaced successfully",
            data:update,
        };
    }


    //delete product
    async remove(id:number){
        const product = await this.productsRepository.findOne({
            where:{
                id:id,
            }
        });
        if(!product){
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        await this.productsRepository.remove(product);
        return{
            message:"Product removed successfully",
            id:id,
        };

    }

    //find product by category
    async findByCategory(category:string){

        const product = await this.productsRepository.find({
            where:{
                category:category,
            },
            select:{
                id:true,
                name:true,
                description:true,
                stock:true,
                price:true,
                category:true,
                isActive:true,
                createdAt:true,
                updatedAt:true,
            },
        });
        return{
            message:`Product with category ${category} found`,
            count:product.length,
            data:product,
        };
    }

    //search by name as keyword
    async search(keyword:string){

        const product = await this.productsRepository.find({
            where:{
                name: ILike(`%${keyword}%`),
            },
            select:{
                id:true,
                name:true,
                description:true,
                stock:true,
                price:true,
                category:true,
                isActive:true,
                createdAt:true,
                updatedAt:true,
            }
        });
        if(!product){
            throw new NotFoundException(`Product with ${keyword} is not found`);
        }
        return{
            message:`Product searched successfully`,
            count:product.length,
            data:product,
        };
    }

    //flip isActive
    async toggleActive(id:number){
        const product= await this.productsRepository.findOne({
            where:{id:id,},
        });
        if(!product){
            throw new NotFoundException(`Product with id ${id} is not found`);
        }
        product.isActive=!product.isActive;
        const update=await this.productsRepository.save(product);
        return{
              message:"Product active status updated",
              data:update,

        };
    }



    
}
