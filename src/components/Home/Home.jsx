import './Home.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import Posts from '../Posts/Posts'; // Import the Posts component

function Home() {
  const { t, language } = useLanguage();

  // Fetch recent posts from Frappe
  const { data: posts, isLoading, error } = useFrappeGetDocList('Post', {
    fields: ['name', 'title', 'titleam', 'description', 'descriptionam', 'image', 'postcategory'],
    orderBy: { field: 'creation', order: 'desc' },
    limit: 3
  });

  // Format posts for display
  const formattedPosts = (posts || []).map(post => ({
    id: post.name,
    title: language === 'am' ? (post.titleam || post.title) : post.title,
    excerpt: language === 'am' ? (post.descriptionam || post.description) : post.description,
    category: post.postcategory,
    image: post.image || "/images/placeholder.jpg"
  }));

  const categories = [
    {
      name: "health-tips",
      title: language === 'am' ? "ጤና እና ውበት" : "Health & Beauty",
      description: language === 'am' ? "ለጤና እና ውበት ምክሮች" : "Tips for wellness and beauty",
      icon: "💊",
      color: "#811114",
      count: formattedPosts.filter(post => post.category === 'health-tips').length
    },
    {
      name: "sport-news", 
      title: language === 'am' ? "የስፖርት ዜና" : "Sports News",
      description: language === 'am' ? "አካባቢያዊ እና ዓለም አቀፍ ስፖርቶች" : "Local and international sports",
      icon: "⚽",
      color: "#2E7D32",
      count: formattedPosts.filter(post => post.category === 'sport-news').length
    },
    {
      name: "food-preparation",
      title: language === 'am' ? "ምግብ እና አሰራሮች" : "Food & Recipes", 
      description: language === 'am' ? "ባህላዊ እና ዓለም አቀፍ ምግቦች" : "Traditional and international cuisine",
      icon: "🍴",
      color: "#FF6B35",
      count: formattedPosts.filter(post => post.category === 'food-preparation').length
    }
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="homepage">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="homepage">
        <div className="error">Failed to load posts: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {language === 'am' ? 'ወደ ' : 'Welcome to '}
            <span className="brand-highlight">W-Import and Technology</span>
            {language === 'am' ? ' ብሎግ በደህና መጡ' : ' Blog'}
          </h1>
          <p className="hero-subtitle">
            {language === 'am' 
              ? 'የጤና ምክሮች፣ የስፖርት ዜና እና ጣፋጭ አሰራሮች ዕለታዊ ዝግጅትዎ'
              : 'Your daily dose of health tips, sports news, and delicious recipes'
            }
          </p>
          <div className="hero-search">
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')} 
              className="search-input"
            />
            <button className="search-btn">{t('search')}</button>
          </div>
        </div>
        <div className="hero-images-grid">
          <div className="hero-image-item">
            <img src="/images/health3.jpg" alt={t('health')} />
            <div className="image-overlay">
              <span className="image-icon">💊</span>
              <span className="image-text">{t('health')}</span>
            </div>
          </div>
          <div className="hero-image-item">
            <img src="/images/sport3.jpg" alt={t('sports')} />
            <div className="image-overlay">
              <span className="image-icon">⚽</span>
              <span className="image-text">{t('sports')}</span>
            </div>
          </div>
          <div className="hero-image-item">
            <img src="/images/food2.jpg" alt={t('food')} />
            <div className="image-overlay">
              <span className="image-icon">🍴</span>
              <span className="image-text">{t('food')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section using Posts component */}
      <section className="our-section">
        <div className="section-header">
          <h2>📰 {t('OurPosts')}</h2>
          <p>{t('mostRead')}</p>
        </div>
        
        <Posts 
          posts={formattedPosts}
          title={t('OurPosts')}
          subtitle={t('mostRead')}
          showViewAll={false} // Remove View All button as requested
        />
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>📚 {t('categories')}</h2>
          <p>{t('exploreTopics')}</p>
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
                  {category.count} {t('articles')}
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