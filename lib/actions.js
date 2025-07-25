"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    //throw new Error("Invalid input");
    return {
      message: "Invalid input.",
    };
  }
  await saveMeal(meal);
  /* nextjs cash agressively - to prevent it after npm run build we use revalidatePath() - helps revalidate a cach that belogns to a certain path 
  with 'layout' also nested pages are going to be revalidated -> revalidatePath("/meals", "layout");
  */
  revalidatePath("/meals");
  redirect("/meals");
}
