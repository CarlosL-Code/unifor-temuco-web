'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function addProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const imageSrc = formData.get('imageSrc') as string;
  const colorsRaw = formData.get('colors') as string;
  
  const colors = colorsRaw.split(',').map(c => c.trim()).filter(Boolean);

  try {
    await prisma.product.create({
      data: {
        name,
        category,
        imageSrc,
        colors: JSON.stringify(colors),
      },
    });
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error adding product:', error);
    return { success: false, error: 'Error al agregar producto' };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: 'Error al eliminar producto' };
  }
}
