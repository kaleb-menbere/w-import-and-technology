// src/components/PostDetails/PostDetails.jsx
import './PostDetails.css';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useFrappeGetDoc } from 'frappe-react-sdk';
import { Link } from 'react-router-dom';

function PostDetails() {
  const { postId } = useParams();
  const { currentLang, toggleLanguage } = useLanguage();

  // Fetch single post details
  const { data: post, isLoading, error } = useFrappeGetDoc('Post', postId);

  console.log('Post details data:', post); // Debug log
  console.log('Post ID:', postId); // Debug log

  if (isLoading) {
    return (
      <div className="post-details-page">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (error) {
    console.error('Error fetching post:', error);
    return (
      <div className="post-details-page">
        <div className="error">Error loading post: {error.message}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-details-page">
        <div className="error">Post not found</div>
      </div>
    );
  }

  const categoryInfo = {
    "health-tips": {
      title: currentLang === 'am' ? "ጤና እና ውበት" : "Health & Beauty",
      color: "#811114",
      icon: "💊"
    },
    "sport-news": {
      title: currentLang === 'am' ? "የስፖርት ዜና" : "Sports News",
      color: "#2E7D32", 
      icon: "⚽"
    },
    "food-preparation": {
      title: currentLang === 'am' ? "ምግብ እና አሰራሮች" : "Food & Recipes",
      color: "#FF6B35",
      icon: "🍴"
    }
  };

  const currentCategory = categoryInfo[post.postcategory];

  return (
    <div className="post-details-page">
      <article className="post-details">
        {/* Header with back button and language toggle */}
        <div className="post-header">
          <button onClick={() => window.history.back()} className="back-btn">
            ← {currentLang === 'am' ? 'ተመለስ' : 'Back'}
          </button>
        </div>

        {/* Main content area with image on left and content on right */}
        <div className="post-content-layout">
          {/* Image Section - Left */}
          {post.image && (
            <div className="post-image-section">
              <div className="post-hero-image">
                <img src={post.image} alt={post.title} />
                <div 
                  className="category-badge-large" 
                  style={{ backgroundColor: currentCategory?.color }}
                >
                  {currentCategory?.icon} {currentCategory?.title}
                </div>
              </div>
            </div>
          )}

          {/* Content Section - Right */}
          <div className="post-content-section">
            <h1 className="post-title">
              {currentLang === 'am' ? (post.titleam || post.title) : post.title}
            </h1>
            
            <div className="post-body">
              <h3>{currentLang === 'am' ? 'የትረካ ማጠቃለያ' : 'Description'}</h3>
              <p className="post-description">
                {currentLang === 'am' ? (post.descriptionam || post.description) : post.description}
              </p>

              {/* Only show English content as fallback when in Amharic mode and Amharic content is missing */}
              {currentLang === 'am' && (!post.titleam || !post.descriptionam) && (
                <div className="language-section">
                  <h3>English Content</h3>
                  {!post.titleam && <p><strong>Title:</strong> {post.title}</p>}
                  {!post.descriptionam && <p><strong>Description:</strong> {post.description}</p>}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="post-actions">
              <button onClick={() => window.history.back()} className="btn-secondary">
                {currentLang === 'am' ? 'ወደ ዝርዝር ተመለስ' : 'Back to List'}
              </button>
              <Link to={`/category/${post.postcategory}`} className="btn-primary">
                {currentLang === 'am' ? 'ተመሳሳይ ጽሑፎች' : 'More from this Category'}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default PostDetails;