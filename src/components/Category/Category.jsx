import './Category.css';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import Posts from '../../components/Posts/Posts';
import { useEffect, useState } from 'react';

function Category() {
  const { categoryName } = useParams();
  const { language } = useLanguage();
  
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    if (language) {
      setCurrentLanguage(language);
    }
  }, [language]);

  // Fetch posts from Frappe - use EXACT field names
  const { data: posts, isLoading, error } = useFrappeGetDocList('Post', {
    fields: ['name', 'title', 'titleam', 'description', 'descriptionam', 'image', 'postcategory'],
    filters: [['postcategory', '=', categoryName]],
    limit: 100
  });

  console.log('Posts from Frappe:', posts);

  // Format posts with correct field names
  const formattedPosts = (posts || []).map(post => ({
    id: post.name,
    title: currentLanguage === 'am' ? (post.titleam || post.title) : post.title,
    excerpt: currentLanguage === 'am' ? (post.descriptionam || post.description) : post.description,
    category: categoryName,
    image: post.image,
    author: "Author", // You don't have author field, use default
    date: "2024-01-01", // You don't have date field, use default
    readTime: "5 min read", // You don't have read_time field, use default
    likes: 0 // You don't have likes field, use default
  }));

  // Category info
  const categoryInfo = {
    "food-preparation": {
      title: currentLanguage === 'am' ? "ምግብ እና አሰራሮች" : "Food & Recipes",
      description: currentLanguage === 'am' ? "ሁሉም የምግብ አሰራር ጽሑፎች" : "All food and recipe articles",
      icon: "🍴"
    },
    "sport-news": {
      title: currentLanguage === 'am' ? "የስፖርት ዜና" : "Sports News",
      description: currentLanguage === 'am' ? "ሁሉም የስፖርት ዜና ጽሑፎች" : "All sports news articles", 
      icon: "⚽"
    },
    "health-tips": {
      title: currentLanguage === 'am' ? "ጤና እና ውበት" : "Health & Beauty",
      description: currentLanguage === 'am' ? "ሁሉም የጤና እና ውበት ጽሑፎች" : "All health and beauty articles",
      icon: "💊"
    }
  }[categoryName] || {
    title: "Category",
    description: "All articles in this category", 
    icon: "📁"
  };

  return (
    <div className="category-page">
      {/* Category Header */}
      <section className="category-header">
        <div className="category-icon-large">{categoryInfo.icon}</div>
        <div className="category-info">
          <h1>{categoryInfo.title}</h1>
          <p>{categoryInfo.description}</p>
          <span className="posts-count">
            {formattedPosts.length} {currentLanguage === 'am' ? 'ጽሑፎች' : 'articles'}
          </span>
        </div>
      </section>

      {/* Posts Component */}
      {isLoading ? (
        <p>{currentLanguage === 'am' ? "በመጫን ላይ..." : "Loading posts..."}</p>
      ) : error ? (
        <p className="error-message">Failed to load posts</p>
      ) : (
        <Posts
          posts={formattedPosts}
          title={`${categoryInfo.icon} ${categoryInfo.title}`}
          subtitle={categoryInfo.description}
          showViewAll={false}
        />
      )}
    </div>
  );
}

export default Category;