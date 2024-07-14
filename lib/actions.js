'use server';

import {saveMeal} from "@/lib/meals";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

function isInvalidText(text) {
    return (!text || text.trim() === '');
}

export async function shareMeal(prevState ,formData) {

    const meal = {
        title: formData.get('title'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
    }

    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        !meal.creator_email.includes('@') ||
        !meal.image ||
        meal.image.size === 0
    ) {
        return {
            message: 'Invalid input.' //returning a response
        }
    }

    await saveMeal(meal);
    revalidatePath('/meals'); //the default type is 'page'
    redirect('/meals');
}