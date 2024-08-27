import * as Joi from 'joi';

export const CreateBlogSchema = Joi.object({
	title: Joi.string().required().messages({
		'string.base': 'Title must be a string',
		'any.required': 'Title is required',
	}),

	content: Joi.string().required().messages({
		'string.base': 'Content must be a string',
		'any.required': 'Content is required',
	}),

	category: Joi.string()
		.regex(/^[0-9a-fA-F]{24}$/)
		.required()
		.messages({
			'string.base': 'Category must be a string',
			'string.pattern.base': 'Category must be a valid MongoDB ObjectId',
			'any.required': 'Category is required',
		}),

	featuredImage: Joi.any().optional(),

	tags: Joi.array()
		.items(
			Joi.string().messages({
				'string.base': 'Each tag must be a string',
			})
		)
		.min(1)
		.max(10)
		.required()
		.messages({
			'array.base': 'Tags must be an array',
			'array.min': 'There must be at least one tag',
			'array.max': 'There can be at most 10 tags',
		}),
});

export const UpdateBlogSchema = Joi.object({
	title: Joi.string().optional().messages({
		'string.base': 'Title must be a string',
	}),

	isPublished: Joi.boolean().optional(),

	content: Joi.string().optional().messages({
		'string.base': 'Content must be a string',
	}),

	category: Joi.string()
		.regex(/^[0-9a-fA-F]{24}$/)
		.optional()
		.messages({
			'string.base': 'Category must be a string',
			'string.pattern.base': 'Category must be a valid MongoDB ObjectId',
		}),

	featuredImage: Joi.any().optional(),

	tags: Joi.array()
		.items(
			Joi.string().messages({
				'string.base': 'Each tag must be a string',
			})
		)
		.min(1)
		.max(10)
		.optional()
		.messages({
			'array.base': 'Tags must be an array',
			'array.min': 'There must be at least one tag',
			'array.max': 'There can be at most 10 tags',
		}),
});
