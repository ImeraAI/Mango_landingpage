import { BlogImage } from '@/components/blog/BlogImage';
import { CategoryVisual } from '@/components/blog/CategoryVisual';
import type { BlogPostMeta } from '@/content/blog';

/**
 * A post's cover: the uploaded banner when there is one, the generated
 * category visual when there is not. Callers pass the shape they want once and
 * never branch on `post.image` themselves — which is what keeps a grid of
 * cards even whether or not the writer had a picture to hand.
 */
export function PostCover({
  post,
  className,
  size,
  priority = false,
  sizes,
}: {
  post: Pick<BlogPostMeta, 'category' | 'image' | 'imageAlt'>;
  className?: string;
  /** Icon scale on the generated cover; ignored when there is a banner. */
  size?: 'sm' | 'lg';
  priority?: boolean;
  sizes?: string;
}) {
  if (post.image) {
    return (
      <BlogImage
        src={post.image}
        alt={post.imageAlt ?? ''}
        priority={priority}
        sizes={sizes}
        className={className}
      />
    );
  }

  return (
    <CategoryVisual
      category={post.category}
      className={className}
      size={size}
    />
  );
}
