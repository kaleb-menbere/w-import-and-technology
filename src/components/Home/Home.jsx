import './Home.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

function Home() {
  const { t } = useLanguage();

  // Mock data - replace with actual API data
  const popularPosts = [
    {
      id: 1,
      title: "5 Daily Beauty Routines for Glowing Skin",
      excerpt: "Discover the essential beauty tips that will transform your skin in just one week...",
      category: "health-tips",
      subcategory: "beauty",
      image: "/images/beauty1.jpg",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      readTime: "4 min read",
      likes: 234
    },
    {
      id: 2,
      title: "Local Football Team Wins Championship",
      excerpt: "Our local heroes bring home the trophy after an incredible season finale...",
      category: "sport-news", 
      subcategory: "local-sports",
      image: "/images/sport1.jpg",
      author: "Mike Thompson",
      date: "2024-01-14",
      readTime: "3 min read",
      likes: 189
    },
    {
      id: 3,
      title: "Traditional Ethiopian Injera Recipe",
      excerpt: "Learn the authentic way to make perfect injera at home with our step-by-step guide...",
      category: "food-preparation",
      subcategory: "ethiopian-food",
      image: "/images/food1.jpg",
      author: "Chew Mariam",
      date: "2024-01-13",
      readTime: "6 min read",
      likes: 312
    },
    {
      id: 4,
      title: "Morning Yoga for Better Health",
      excerpt: "Start your day right with these 10-minute yoga routines that boost energy and focus...",
      category: "health-tips",
      subcategory: "health",
      image: "/images/health1.jpg",
      author: "Yoga Master Alex",
      date: "2024-01-12",
      readTime: "5 min read",
      likes: 167
    }
  ];

  const categories = [
    {
      name: "health-tips",
      title: "Health & Beauty",
      description: "Tips for wellness and beauty",
      icon: "💄",
      color: "#811114",
      count: 24
    },
    {
      name: "sport-news", 
      title: "Sports News",
      description: "Local and international sports",
      icon: "⚽",
      color: "#2E7D32",
      count: 18
    },
    {
      name: "food-preparation",
      title: "Food & Recipes", 
      description: "Traditional and international cuisine",
      icon: "🍴",
      color: "#FF6B35",
      count: 32
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand">W-IMP</span> Blog
          </h1>
          <p className="hero-subtitle">
            Your daily dose of health tips, sports news, and delicious recipes
          </p>
          <div className="hero-search">
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="search-input"
            />
            <button className="search-btn">Search</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-graphic">
            <div className="graphic-item health">💄</div>
            <div className="graphic-item sports">⚽</div>
            <div className="graphic-item food">🍴</div>
          </div>
        </div>
      </section>

      {/* Popular Posts Section */}
      <section className="popular-section">
        <div className="section-header">
          <h2>🔥 Popular Posts</h2>
          <p>Most read articles this week</p>
        </div>
        
        <div className="popular-grid">
          {popularPosts.map((post, index) => (
            <article key={post.id} className={`popular-card featured-${index + 1}`}>
              <div className="card-image">
                <img src={post.image} alt={post.title} />
                <div className="category-badge" style={{ backgroundColor: categories.find(c => c.name === post.category)?.color }}>
                  {categories.find(c => c.name === post.category)?.icon}
                  {post.category === 'health-tips' ? 'Health' : 
                   post.category === 'sport-news' ? 'Sports' : 'Food'}
                </div>
              </div>
              
              <div className="card-content">
                <h3 className="card-title">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="card-excerpt">{post.excerpt}</p>
                
                <div className="card-meta">
                  <div className="author-info">
                    <span className="author-name">{post.author}</span>
                    <span className="post-date">{post.date}</span>
                  </div>
                  <div className="post-stats">
                    <span className="read-time">{post.readTime}</span>
                    <span className="likes">❤️ {post.likes}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="section-footer">
          <Link to="/posts" className="view-all-btn">
            View All Posts →
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>📚 Categories</h2>
          <p>Explore articles by topic</p>
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
                <span className="post-count">{category.count} articles</span>
              </div>
              <div className="category-arrow">→</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2>📧 Stay Updated</h2>
            <p>Get the latest articles delivered to your inbox daily</p>
          </div>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="newsletter-input"
            />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;