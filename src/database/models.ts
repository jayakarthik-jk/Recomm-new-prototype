import type { Model, Product } from "@prisma/client";
import client from "./client";
import { ServerError } from "@/lib/error";
import {
  type UpdateModelProps,
  type CreateModelProps,
  createModelValidator,
  updateModelValidator,
} from "@/validation/model";
import { idValidator } from "@/validation/objectId";

export const getModel = async (id: string): Promise<Model | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }

  try {
    const model = await client.model.findUnique({
      where: {
        id,
      },
    });
    if (model == null) {
      return new ServerError("Model not found", 404);
    }
    return model;
  } catch (error) {
    return new ServerError(`Cannot get the model with id: ${id}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getModels = async (): Promise<Model[] | ServerError> => {
  try {
    const models = await client.model.findMany();
    return models;
  } catch (error) {
    return new ServerError("Cannot get the models");
  }
};

export const createModel = async ({
  name,
  brandId,
  categoryIds,
}: CreateModelProps): Promise<Model | ServerError> => {
  const { error } = createModelValidator.validate({
    name,
    brandId,
    categoryIds,
  });
  if (error != null) {
    return new ServerError(error.message, 400);
  }

  try {
    const categories = await client.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });
    if (categories.length !== categoryIds.length) {
      return new ServerError("Category not found");
    }

    const brand = await client.brand.findUnique({
      where: {
        id: brandId,
      },
    });
    if (brand == null) return new ServerError("Brand not found");

    const model = await client.model.create({
      data: {
        name,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
        brand: {
          connect: {
            id: brand.id,
          },
        },
      },
    });

    return model;
  } catch (error) {
    return new ServerError(`Cannot create the model with name: ${name}`);
  }
};

export const updateModel = async ({
  id,
  name,
  categoryIds,
}: UpdateModelProps): Promise<Model | ServerError> => {
  const { error } = updateModelValidator.validate({
    id,
    name,
    categoryIds,
  });
  if (error != null) {
    return new ServerError(error.message, 400);
  }

  try {
    if (categoryIds != null) {
      const category = await client.category.findMany({
        where: {
          id: {
            in: categoryIds,
          },
        },
      });
      categoryIds = category.map((c) => c.id);
    }
    const model = await client.model.update({
      where: {
        id,
      },
      data: {
        name,
        categories: {
          set: categoryIds?.map((id) => ({ id })),
        },
      },
    });

    return model;
  } catch (error) {
    return new ServerError(`Cannot update the model with id: ${id}`);
  }
};

export const deleteModel = async (id: string): Promise<Model | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }

  try {
    const model = await client.model.delete({
      where: {
        id,
      },
    });
    return model;
  } catch (error) {
    return new ServerError(`Cannot delete the model with id: ${id}`);
  }
};

// TODO: Implement search sort and pagination functionality
export const getProductsByModel = async (
  id: string
): Promise<Product[] | ServerError> => {
  const { error } = idValidator.validate(id);
  if (error != null) {
    return new ServerError(error.message, 400);
  }

  try {
    const products = await client.product.findMany({
      where: {
        modelId: id,
      },
      include: {
        model: {
          include: {
            brand: true,
            categories: true,
          },
        },
      },
    });
    return products;
  } catch (error) {
    return new ServerError(`Cannot get the products with model id: ${id}`);
  }
};
