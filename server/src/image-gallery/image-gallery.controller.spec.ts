import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { ImageGalleryController } from './image-gallery.controller';
import { ImageGalleryService } from './image-gallery.service';

describe('ImageGalleryController', () => {
	let controller: ImageGalleryController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ImageGalleryController],
			providers: [ImageGalleryService],
		}).compile();

		controller = module.get<ImageGalleryController>(ImageGalleryController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
