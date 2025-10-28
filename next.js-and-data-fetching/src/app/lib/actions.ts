"use server";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createJobPosition(formData: FormData) {
  const jobTitle = formData.get("jobTitle");
  const shortDescription = formData.get("shortDescription");
  const requirements = formData
    .get("requirements")
    ?.toString()
    .split(",")
    .map((req) => req.trim());

  if (!jobTitle || !shortDescription || !requirements) {
    throw new Error("Please fill out the form completely.");
  }

  revalidatePath('/job');
  redirect('/job');
}
