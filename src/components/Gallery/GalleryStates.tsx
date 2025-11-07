import React from 'react';
import GalleryCardSkeleton from './GalleryCardSkeleton';

interface GalleryStatesProps {
  type: 'loading' | 'error' | 'empty';
  pageSize?: number;
}

/**
 * SRP: Component only handles empty/loading/error states.
 * Open/Closed: easy to extend with custom messages or illustrations.
 */
const GalleryStates: React.FC<GalleryStatesProps> = ({
  type,
  pageSize = 15,
}) => {
  if (type === 'loading') {
    return (
      <div className="gallery-grid">
        {Array.from({ length: pageSize }).map((_, i) => (
          <GalleryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">
          Failed to load artworks. Please try again later.
        </p>
      </div>
    );
  }

  if (type === 'empty') {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No artworks found</p>
      </div>
    );
  }

  return null;
};

export default GalleryStates;