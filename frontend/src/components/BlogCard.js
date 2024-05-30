
import React from 'react';

const BlogCard = ({ title, description, coverImage }) => {
    return (
        <div className="max-w-lg w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-64 object-cover object-center" src={coverImage} alt={title} />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default BlogCard;
