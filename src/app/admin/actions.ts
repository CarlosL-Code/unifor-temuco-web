'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

// Configure cloudinary explicitly if needed, but it automatically picks up CLOUDINARY_URL from env.
cloudinary.config({
  secure: true
});

export async function addProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const colorsRaw = formData.get('colors') as string;
  const imageFile = formData.get('image') as File;
  
  const colors = colorsRaw.split(',').map(c => c.trim()).filter(Boolean);

  if (!imageFile || imageFile.size === 0) {
    return { success: false, error: 'La imagen es requerida' };
  }

  try {
    // Convert File to Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary via stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'unifor_products' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    }) as any;

    const imageSrc = uploadResult.secure_url;

    // Save to Database (Neon)
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
    return { success: false, error: 'Error al agregar producto o subir imagen' };
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
