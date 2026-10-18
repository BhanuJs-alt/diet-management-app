import { prisma } from "../config/prisma.ts";

export const createMealLog = async (data: any) => {
  // 1. Ensure our demo user exists before trying to attach a meal to them
  const demoUserId = "demo-user-123";
  const existingUser = await prisma.user.findUnique({
    where: { id: demoUserId },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: demoUserId,
        name: "Demo User",
        email: "demo@example.com",
        password: "password123",
      },
    });
  }

  // 2. Now safely create the meal
  return await prisma.mealLog.create({
    data: {
      userId: demoUserId, // using the guaranteed valid ID
      mealType: data.mealType,
      totalCalories: data.totalCalories,
      loggedAt: new Date(data.loggedAt),
      foodItems: {
        create: data.foodItems,
      },
    },
    include: {
      foodItems: true,
    },
  });
};

export const getMealsByDate = async (userId: string, dateString: string) => {
  return await prisma.mealLog.findMany({
    where: {
      userId: userId,
      loggedAt: new Date(dateString),
    },
    include: {
      foodItems: true,
    },
  });
};

export const deleteMealLog = async (id: string) => {
  // Delete the associated food items first
  await prisma.foodItem.deleteMany({
    where: { mealLogId: id },
  });

  // Then delete the meal itself
  return await prisma.mealLog.delete({
    where: { id: id },
  });
};
