import './Home.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

function Home() {
  const { t, language } = useLanguage();

  // Mock data - replace with actual API data
  const popularPosts = [
    {
      id: 1,
      title: language === 'am' ? "ሮናልዶ፣ ሜሲ እና ሞድሪች በ2006 እና በ2026 ዓለም ዋንጫ በብቸኝነት" : "Ronaldo, Messi and Modric to play in 2006 and 2026 World Cups",
      excerpt: language === 'am' ? "ከ20 ዓመት በፊት የነበሩት ሦስቱ ከዋክብት ብቻ ከሁለት አስርት ዓመታት በኋላ በትልቁ መድረክ ሀገራቸውን ይወክላሉ..." : "The three stars from 20 years ago will be the only ones to represent their countries on the big stage after two decades...",
      category: "sport-news",
      subcategory: "football",
      image: "/images/worldcup.jpg",
      author: language === 'am' ? "የስፖርት ዘጋቢ" : "Sports Reporter",
      date: "2024-01-15",
      readTime: language === 'am' ? "5 ደቂቃ ንባብ" : "5 min read",
      likes: 289
    },
    {
      id: 2,
      title: language === 'am' ? "ጤናማ አመጋገብ ይመገቡ" : "Eat a healthy diet",
      excerpt: language === 'am' ? "ፍራፍሬ፣ አትክልት፣ ጥራጥሬ፣ ለውዝ እና ሙሉ እህሎችን ጨምሮ የተለያዩ ምግቦችን ጥምረት ይመገቡ..." : "Eat a combination of different foods, including fruit, vegetables, legumes, nuts and whole grains...",
      category: "health-tips", 
      subcategory: "nutrition",
      image: "/images/healthy-diet.jpg",
      author: language === 'am' ? "ዶ/ር ማርያም አለማየሁ" : "Dr. Mariam Alemayehu",
      date: "2024-01-14",
      readTime: language === 'am' ? "4 ደቂቃ ንባብ" : "4 min read",
      likes: 156
    },
    {
      id: 3,
      title: language === 'am' ? "ቅዱስ ጊዮርጊስ ከ ኢትዮጵያ መድን" : "St. George vs. Ethiopia Medan",
      excerpt: language === 'am' ? "በሲቢኢ የኢትዮጵያ ፕሪሚየር ሊግ ተስተካካይ መርኃ ግብር ቅዱስ ጊዮርጊስ ከ ኢትዮጵያ መድን በአዲስ አበባ ስታድየም ቀን 9 ሰዓት ይጫወታሉ..." : "In the CBE Ethiopian Premier League match schedule, St. George will play against Ethiopia Medan at Addis Ababa Stadium at 9:00 AM...",
      category: "sport-news",
      subcategory: "local-sports",
      image: "/images/st-george-medan.jpg",
      author: language === 'am' ? "የእግር ኳስ ዘጋቢ" : "Football Reporter",
      date: "2024-01-13",
      readTime: language === 'am' ? "3 ደቂቃ ንባብ" : "3 min read",
      likes: 198
    },
    {
      id: 4,
      title: language === 'am' ? "ጨውና ስኳርን ይቀንሱ" : "Consume less salt and sugar",
      excerpt: language === 'am' ? "የጨው መጠንዎን በቀን ወደ 5 ግራም ይቀንሱ፣ ይህም ከአንድ የሻይ ማንኪያ ጋር እኩል ነው..." : "Reduce your salt intake to 5g per day, equivalent to about one teaspoon...",
      category: "health-tips",
      subcategory: "nutrition",
      image: "/images/salt-sugar.jpg",
      author: language === 'am' ? "የጤና አመራር" : "Health Expert",
      date: "2024-01-12",
      readTime: language === 'am' ? "6 ደቂቃ ንባብ" : "6 min read",
      likes: 223
    },
    {
      id: 5,
      title: language === 'am' ? "የወቅቱ የፕላኔታችን ምርጦቹ ሚክስድ ማርሻል አርቲስቶች" : "The best mixed martial artists on the planet right now",
      excerpt: language === 'am' ? "ሁለቱም የሚፈላለጉ ሲሆን ኢሊያ ወደ ዋልተርዌይት ከሄደ ምናልባት በኃይት ሀውስ በሚዘጋጀው የ UFC ኢቨንት ላይ እርስ በእርስ ሲፋለሙ ልንመለከታቸው እንችላለን..." : "Both are in demand, and if Ilya goes to Wolverhampton, we could probably see them fight each other at a UFC event in the White House...",
      category: "sport-news",
      subcategory: "mma",
      image: "/images/mma-fighters.jpg",
      author: language === 'am' ? "የማርሻል አርትስ አመራር" : "Martial Arts Expert",
      date: "2024-01-11",
      readTime: language === 'am' ? "4 ደቂቃ ንባብ" : "4 min read",
      likes: 145
    },
    {
      id: 6,
      title: language === 'am' ? "ባህላዊ የኢትዮጵያ እንጀራ አሰራር" : "Traditional Ethiopian Injera Recipe",
      excerpt: language === 'am' ? "በደረጃ በደረጃ መመሪያችን በቤት ሙሉ እንጀራ ለመስራት ይማሩ..." : "Learn the authentic way to make perfect injera at home with our step-by-step guide...",
      category: "food-preparation",
      subcategory: "ethiopian-food",
      image: "/images/injera.jpg",
      author: language === 'am' ? "ሹፍ ማርያም" : "Chef Mariam",
      date: "2024-01-10",
      readTime: language === 'am' ? "7 ደቂቃ ንባብ" : "7 min read",
      likes: 278
    }
  ];

  const categories = [
    {
      name: "health-tips",
      title: language === 'am' ? "ጤና እና ውበት" : "Health & Beauty",
      description: language === 'am' ? "ለጤና እና ውበት ምክሮች" : "Tips for wellness and beauty",
      icon: "💊",
      color: "#811114",
      count: 24
    },
    {
      name: "sport-news", 
      title: language === 'am' ? "የስፖርት ዜና" : "Sports News",
      description: language === 'am' ? "አካባቢያዊ እና ዓለም አቀፍ ስፖርቶች" : "Local and international sports",
      icon: "⚽",
      color: "#2E7D32",
      count: 18
    },
    {
      name: "food-preparation",
      title: language === 'am' ? "ምግብ እና አሰራሮች" : "Food & Recipes", 
      description: language === 'am' ? "ባህላዊ እና ዓለም አቀፍ ምግቦች" : "Traditional and international cuisine",
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

      {/* Popular Posts Section */}
      <section className="popular-section">
        <div className="section-header">
          <h2>🔥 {t('popularPosts')}</h2>
          <p>{t('mostRead')}</p>
        </div>
        
        <div className="popular-grid">
          {popularPosts.map((post, index) => (
            <article key={post.id} className={`popular-card ${index === 0 ? 'featured-1' : ''}`}>
              <div className="card-image">
                <img src={post.image} alt={post.title} />
                <div className="category-badge" style={{ backgroundColor: categories.find(c => c.name === post.category)?.color }}>
                  {categories.find(c => c.name === post.category)?.icon}
                  {post.category === 'health-tips' ? t('health') : 
                   post.category === 'sport-news' ? t('sports') : t('food')}
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
                    <span className="likes">❤️ {post.likes} {t('likes')}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="section-footer">
          <Link to="/posts" className="view-all-btn">
            {t('viewAllPosts')}
          </Link>
        </div>
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