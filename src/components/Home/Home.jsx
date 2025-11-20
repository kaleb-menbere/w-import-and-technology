import './Home.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import Posts from '../Posts/Posts';
import { useEffect, useState } from 'react';

function Home() {
  const { currentLang } = useLanguage();
  const [categoryCounts, setCategoryCounts] = useState({});

  // Fetch ALL posts to get accurate category counts
  const { data: allPosts, isLoading: allPostsLoading } = useFrappeGetDocList('Post', {
    fields: ['name', 'postcategory'],
    limit: 1000 // Fetch all posts for counting
  });

  // Fetch recent posts for display (limited to 3)
  const { data: recentPosts, isLoading: recentPostsLoading, error } = useFrappeGetDocList('Post', {
    fields: ['name', 'title', 'titleam', 'description', 'descriptionam', 'image', 'postcategory'],
    orderBy: { field: 'creation', order: 'desc' },
    limit: 3
  });

  // Calculate category counts when allPosts changes
  useEffect(() => {
    if (allPosts) {
      const counts = {
        'health-tips': 0,
        'sport-news': 0,
        'food-preparation': 0
      };

      allPosts.forEach(post => {
        if (post.postcategory && counts[post.postcategory] !== undefined) {
          counts[post.postcategory]++;
        }
      });

      setCategoryCounts(counts);
    }
  }, [allPosts]);

  // Safe formatting with fallbacks for recent posts
  const formattedPosts = (recentPosts || []).map(post => ({
    id: post?.name || `post-${Math.random()}`,
    title: currentLang === 'am' ? (post?.titleam || post?.title || 'No title') : (post?.title || 'No title'),
    excerpt: currentLang === 'am' ? (post?.descriptionam || post?.description || 'No description') : (post?.description || 'No description'),
    category: post?.postcategory,
    image: post?.image || "/images/placeholder.jpg"
  }));

  const categories = [
    {
      name: "health-tips",
      title: currentLang === 'am' ? "ጤና እና ውበት" : "Health & Beauty",
      description: currentLang === 'am' ? "ለጤና እና ውበት ምክሮች" : "Tips for wellness and beauty",
      icon: "💊",
      color: "#811114",
      count: categoryCounts['health-tips'] || 0
    },
    {
      name: "sport-news", 
      title: currentLang === 'am' ? "የስፖርት ዜና" : "Sports News",
      description: currentLang === 'am' ? "አካባቢያዊ እና ዓለም አቀፍ ስፖርቶች" : "Local and international sports",
      icon: "⚽",
      color: "#2E7D32",
      count: categoryCounts['sport-news'] || 0
    },
    {
      name: "food-preparation",
      title: currentLang === 'am' ? "ምግብ እና አሰራሮች" : "Food & Recipes", 
      description: currentLang === 'am' ? "ባህላዊ እና ዓለም አቀፍ ምግቦች" : "Traditional and international cuisine",
      icon: "🍴",
      color: "#FF6B35",
      count: categoryCounts['food-preparation'] || 0
    }
  ];

  // Loading state - only show loading if we're loading recent posts (what users see)
  if (recentPostsLoading) {
    return (
      <div className="homepage">
        <div className="loading">
          {currentLang === 'am' ? 'በመጫን ላይ...' : 'Loading posts...'}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="homepage">
        <div className="error">
          {currentLang === 'am' ? 'ጽሑፎችን ማምጣት አልተሳካም:' : 'Failed to load posts:'} {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {currentLang === 'am' ? 'ወደ ' : 'Welcome to '}
            <span className="brand-highlight">W-Import and Technology</span>
            {currentLang === 'am' ? ' ብሎግ በደህና መጡ' : ' Blog'}
          </h1>
          <p className="hero-subtitle">
            {currentLang === 'am' 
              ? 'የጤና ምክሮች፣ የስፖርት ዜና እና ጣፋጭ አሰራሮች ዕለታዊ ዝግጅትዎ'
              : 'Your daily dose of health tips, sports news, and delicious recipes'
            }
          </p>
          <div className="hero-search">
            <input 
              type="text" 
              placeholder={currentLang === 'am' ? 'ጽሑፎችን ይፈልጉ...' : 'Search posts...'} 
              className="search-input"
            />
            <button className="search-btn">
              {currentLang === 'am' ? 'ፈልግ' : 'Search'}
            </button>
          </div>
        </div>
        <div className="hero-images-grid">
          <div className="hero-image-item">
            <img src="/images/health3.jpg" alt={currentLang === 'am' ? 'ጤና' : 'Health'} />
            <div className="image-overlay">
              <span className="image-icon">💊</span>
              <span className="image-text">{currentLang === 'am' ? 'ጤና' : 'Health'}</span>
            </div>
          </div>
          <div className="hero-image-item">
            <img src="/images/sport3.jpg" alt={currentLang === 'am' ? 'ስፖርት' : 'Sports'} />
            <div className="image-overlay">
              <span className="image-icon">⚽</span>
              <span className="image-text">{currentLang === 'am' ? 'ስፖርት' : 'Sports'}</span>
            </div>
          </div>
          <div className="hero-image-item">
            <img src="/images/food2.jpg" alt={currentLang === 'am' ? 'ምግብ' : 'Food'} />
            <div className="image-overlay">
              <span className="image-icon">🍴</span>
              <span className="image-text">{currentLang === 'am' ? 'ምግብ' : 'Food'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section using Posts component */}
      <section className="our-section">
        <div className="section-header">
          <h2>📰 {currentLang === 'am' ? 'የእኛ ጽሑፎች' : 'Our Posts'}</h2>
          <p>{currentLang === 'am' ? 'በጣም የሚነበቡ' : 'Most Read'}</p>
        </div>
        
        <Posts 
          posts={formattedPosts}
          title={currentLang === 'am' ? 'የእኛ ጽሑፎች' : 'Our Posts'}
          subtitle={currentLang === 'am' ? 'በጣም የሚነበቡ' : 'Most Read'}
          showViewAll={false}
        />
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>📚 {currentLang === 'am' ? 'ምድቦች' : 'Categories'}</h2>
          <p>{currentLang === 'am' ? 'ርዕሰ ጉዳዮችን ያስሱ' : 'Explore Topics'}</p>
        </div>
        
        <div className="categories-grid">
          {categories.map(category => (
            <Link 
              key={category.name} 
              to={`/category/${category.name}`}
              className="category-card"
              style={{ '--category-color': category.color }}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-info">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span className="post-count">
                  {category.count} {currentLang === 'am' ? 'ጽሑፎች' : 'articles'}
                </span>
              </div>
              <div className="category-arrow">→</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;