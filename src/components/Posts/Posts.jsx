import './Posts.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

function Posts({ 
  posts = [], 
  title = "Posts", 
  subtitle = "", 
  showViewAll = true,
  viewAllLink = "/posts" 
}) {
  const { t } = useLanguage();

  const categories = [
    {
      name: "health-tips",
      title: t('healthTips'),
      color: "#811114",
      icon: "💄"
    },
    {
      name: "sport-news", 
      title: t('sportNews'),
      color: "#2E7D32", 
      icon: "⚽"
    },
    {
      name: "food-preparation",
      title: t('foodPreparation'),
      color: "#FF6B35",
      icon: "🍴"
    }
  ];

  return (
    <section className="posts-section">    
      <div className="posts-grid">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <article key={post.id} className={`post-card featured-${index + 1}`}>
              <div className="card-image">
                <img src={post.image} alt={post.title} />
                <div className="category-badge" style={{ 
                  backgroundColor: categories.find(c => c.name === post.category)?.color 
                }}>
                  {categories.find(c => c.name === post.category)?.icon}
                  {categories.find(c => c.name === post.category)?.title}
                </div>
              </div>
              
              <div className="card-content">
                <h3 className="card-title">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h3>
                <p className="card-excerpt">{post.excerpt}</p>
              </div>
            </article>
          ))
        ) : (
          <div className="no-posts">
            <p>{t('noPostsFound')}</p>
          </div>
        )}
      </div>

      {showViewAll && posts.length > 0 && (
        <div className="section-footer">
          <Link to={viewAllLink} className="view-all-btn">
            {t('viewAllPosts')}
          </Link>
        </div>
      )}
    </section>
  );
}

export default Posts;