const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AnimalService {
  static async getAllAnimals() {
    try {
      const response = await prisma.animal_photos.findMany({
        select: {
          id: true,
          photo_url: true,
          animal_categories: {
            select: {
              category: true,
            },
          },
        },
      });
      return response;
    } catch (error) {
      return { error: "unable to create new category" };
    }
  }

  static async getAnimalsByCategoryIds(categoryIds) {
    try {
      const response = await prisma.animal_photos.findMany({
        where: { category_id: { in: categoryIds } },
        select: {
          id: true,
          photo_url: true,
          animal_categories: {
            select: {
              category: true,
            },
          },
        },
      });
      return response;
    } catch (error) {
      return { error: "unable to get animals by categoryIds" };
    }
  }

  static async getAllCategories() {
    try {
      const response = await prisma.animal_categories.findMany();
      return response;
    } catch (error) {
      return { error: "unable to get categories" };
    }
  }

  static async getCategoryById(categoryId) {
    try {
      const response = await prisma.animal_categories.findUnique({
        where: { id: categoryId },
      });
      return response;
    } catch (error) {
      return { error: "unable to find category" };
    }
  }

  static async createCategory(data) {
    try {
      const response = await prisma.animal_categories.create({
        data: {
          category: data.category,
        },
      });
      return response;
    } catch (error) {
      return { error: "unable to create new category" };
    }
  }

  static async updateCategoryById(categoryId, data) {
    try {
      const response = await prisma.animal_categories.update({
        where: { id: categoryId },
        data: {
          category: data.category,
        },
      });
      return response;
    } catch (error) {
      return { error: "unable to update category" };
    }
  }

  static async deleteCategoryById(categoryId) {
    try {
      const response = await prisma.animal_categories.delete({
        where: { id: categoryId },
      });
      return response;
    } catch (error) {
      return { error: "unable to update category" };
    }
  }
}

module.exports = AnimalService;
