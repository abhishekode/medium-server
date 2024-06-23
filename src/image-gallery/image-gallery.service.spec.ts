import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ImageGalleryService } from './image-gallery.service';

describe('ImageGalleryService', () => {
	let service: ImageGalleryService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ImageGalleryService],
		}).compile();

		service = module.get<ImageGalleryService>(ImageGalleryService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
