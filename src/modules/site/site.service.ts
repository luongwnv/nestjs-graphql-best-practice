import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Site } from './site.entity'
import { MongoRepository } from 'typeorm'
import { CreateSiteInput, UpdateSiteInput } from '../../graphql'

@Injectable()
export class SiteService {
	constructor(
		@InjectRepository(Site)
		private readonly siteRepository: MongoRepository<Site>
	) {}

	async findAll() {
		return await this.siteRepository.find({
			cache: true
		})
	}

	async findById(_id: string): Promise<Site> {
		return await this.siteRepository.findOne({ _id })
	}

	async create(input: CreateSiteInput): Promise<Site> {
		const { name } = input

		const site = new Site()
		site.name = name

		return await this.siteRepository.save(site)
	}

	async update(_id: string, input: UpdateSiteInput): Promise<boolean> {
		const { name } = input

		const site = await this.siteRepository.findOne({ _id })
		site.name = name

		return (await this.siteRepository.save(site)) ? true : false
	}

	async delete(_id: string): Promise<boolean> {
		const site = await this.siteRepository.findOne({ _id })
		return (await this.siteRepository.remove(site)) ? true : false
	}

	async deleteAll(): Promise<boolean> {
		return (await this.siteRepository.deleteMany({})) ? true : false
	}
}