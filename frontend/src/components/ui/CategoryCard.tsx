import Link from "next/link";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    image_url?: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="flex flex-col items-center gap-2 group">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-peach-100 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-secondary transition-colors shadow-sm">
         <div className="w-full h-full bg-gradient-to-tr from-peach-100 to-ivory"></div>
      </div>
      <span className="text-xs md:text-sm font-medium text-center text-brown-900 group-hover:text-primary transition-colors">
        {category.name}
      </span>
    </Link>
  );
}
