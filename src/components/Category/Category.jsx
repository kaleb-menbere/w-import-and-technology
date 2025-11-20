import './Category.css';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import Posts from '../../components/Posts/Posts';
import { useEffect, useState } from 'react';

function Category() {
  const { categoryName } = useParams();
  const { currentLang } = useLanguage();
  
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    if (currentLang) {
      setCurrentLanguage(currentLang);
    }
  }, [currentLang]);

  // Fetch posts from Frappe with better error handling
  const { data: posts, isLoading, error } = useFrappeGetDocList('Post', {
    fields: ['name', 'title', 'titleam', 'description', 'descriptionam', 'image', 'postcategory'],
    filters: [['postcategory', '=', categoryName]],
    limit: 100
  });

  console.log('Posts from Frappe:', posts);
  console.log('Error:', error);

  // Safe formatting with fallbacks
  const formattedPosts = (posts || []).map(post => ({
    id: post?.name || `post-${Math.random()}`,
    title: currentLanguage === 'am' ? (post?.titleam || post?.title || 'No title') : (post?.title || 'No title'),
    excerpt: currentLanguage === 'am' ? (post?.descriptionam || post?.description || 'No description') : (post?.description || 'No description'),
    category: categoryName,
    image: post?.image || '/default-image.jpg'
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
    title: currentLanguage === 'am' ? "ምድብ" : "Category",
    description: currentLanguage === 'am' ? "ሁሉም የዚህ ምድብ ጽሑፎች" : "All articles in this category", 
    icon: "📁"
  };

  // Check if we have a network or SDK error
  if (error) {
    return (
      <div className="category-page">
        <div className="error-message">
          <h2>{currentLanguage === 'am' ? "ስህተት ተፈጥሯል" : "An error occurred"}</h2>
          <p>{currentLanguage === 'am' ? "ጽሑፎችን ማምጣት አልተሳካም" : "Failed to load posts"}</p>
          <p>{error?.message || 'Unknown error'}</p>
        </div>
      </div>
    );
  }

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
        <div className="loading-container">
          <p>{currentLanguage === 'am' ? "በመጫን ላይ..." : "Loading posts..."}</p>
        </div>
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