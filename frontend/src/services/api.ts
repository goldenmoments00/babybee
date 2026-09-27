const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  } catch (error) {
    console.error("Fetch categories error:", error);
    return []; // No fake data in production
  }
}

export async function fetchProducts() {
  try {
    const res = await fetch(`${API_URL}/products`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (error) {
    console.error("Fetch products error:", error);
    return []; // No fake data in production
  }
}

export async function fetchProductDetail(slug: string) {
  try {
    const res = await fetch(`${API_URL}/products/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Product not found');
    return await res.json();
  } catch (error) {
    return null; // Return null if not found or DB offline
  }
}
