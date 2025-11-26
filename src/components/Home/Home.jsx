// src/components/Home/Home.jsx
import './Home.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import Posts from '../Posts/Posts';
import { useEffect, useState } from 'react';

function Home() {
  const { t, currentLang } = useLanguage();
  const [categoryCounts, setCategoryCounts] = useState({});

  // Fetch ALL posts to get accurate category counts
  const { data: allPosts, isLoading: allPostsLoading } = useFrappeGetDocList('Post', {
    fields: ['name', 'title', 'titleam', 'description', 'descriptionam', 'image', 'postcategory', 'creation'],
    limit: 1000
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

  // Select the latest post per category for the Most Read section
  const postsByCategory = {
    'health-tips': null,
    'sport-news': null,
    'food-preparation': null
  };

  (allPosts || []).forEach(post => {
    if (post.postcategory && postsByCategory[post.postcategory] === null) {
      postsByCategory[post.postcategory] = post;
    }
  });

  // Format posts for display - Use currentLang for Frappe data
  const formattedPosts = Object.values(postsByCategory).map(post => ({
    id: post?.name || `post-${Math.random()}`,
    title: currentLang === 'am' ? (post?.titleam || post?.title || 'No title') : (post?.title || 'No title'),
    excerpt: currentLang === 'am' ? (post?.descriptionam || post?.description || 'No description') : (post?.description || 'No description'),
    category: post?.postcategory,
    image: post?.image || "/images/placeholder.jpg"
  })).filter(Boolean);

  const categories = [
    {
      name: "health-tips",
      title: t('healthTips'), // Use t() for UI text
      description: t('healthAdvice'), // Use t() for UI text
      icon: "💊",
      color: "#811114",
      count: categoryCounts['health-tips'] || 0
    },
    {
      name: "sport-news", 
      title: t('sportNews'), // Use t() for UI text
      description: t('foreignSports'), // Use t() for UI text
      icon: "⚽",
      color: "#2E7D32",
      count: categoryCounts['sport-news'] || 0
    },
    {
      name: "food-preparation",
      title: t('foodPreparation'), // Use t() for UI text
      description: t('ethiopianFood'), // Use t() for UI text
      icon: "🍴",
      color: "#FF6B35",
      count: categoryCounts['food-preparation'] || 0
    }
  ];

  // Loading state - Use t() for UI text
  if (allPostsLoading) {
    return (
      <div className="homepage">
        <div className="loading">
          {t('loadingPosts')}
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Hero Section - Use t() for UI text */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('welcome')}
            <span className="brand-highlight">W-Import and Technology</span>
            {t('blog')}
          </h1>
          <p className="hero-subtitle">
            {t('heroSubtitle')}
          </p>
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

      {/* Most Read / Posts Section - Use t() for UI text */}
      <section className="our-section">
        <div className="section-header">
          <h2>📰 {t('OurPosts')}</h2>
          <p>{t('mostRead')}</p>
        </div>
        
        <Posts 
          posts={formattedPosts}
          title={t('OurPosts')}
          subtitle={t('mostRead')}
          showViewAll={false}
        />
      </section>

      {/* Categories Section - Use t() for UI text */}
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