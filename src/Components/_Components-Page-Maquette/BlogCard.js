import React from 'react';
import '../../Styles/BlogCard.css';

const BlogCard = ({ image, title, description }) => {
    return (
        <div className='Si-Digg-Bi'>
            <article className="blog-card">
                <img className="blog-image" src={image} alt={title}/>
                <section className="card-content">
                    <div className="blog-category"></div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </section>
            </article>
        </div>
    );
};

export default BlogCard;
