import Masonry from 'react-masonry-css'
import './masonry-grid.css'
import { ReactNode } from 'react';

const breakpointColumnsObj = {
    default: 4,
    1500: 3,
    1100: 2,
    900: 1
};

export default function MasonryGrid({ children }: { children: ReactNode }) {
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {children}
        </Masonry>
    )
}
