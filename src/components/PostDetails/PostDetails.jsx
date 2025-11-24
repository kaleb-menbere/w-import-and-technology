// src/components/PostDetails/PostDetails.jsx
import './PostDetails.css';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useFrappeGetDoc } from 'frappe-react-sdk';
import { Link } from 'react-router-dom';

function PostDetails() {
  const { postId } = useParams();
  const { t, currentLang } = useLanguage(); // Use t() function instead of currentLang checks

  // Fetch single post details
  const { data: post, isLoading, error } = useFrappeGetDoc('Post', postId);

  console.log('Post details data:', post); // Debug log
  console.log('Post ID:', postId); // Debug log

  if (isLoading) {
    return (
      <div className="post-details-page">
        <div className="loading">{t('loading')}</div>
      </div>
    );
  }

  if (error) {
    console.error('Error fetching post:', error);
    return (
      <div className="post-details-page">
        <div className="error">{t('errorLoadingPost')}: {error.message}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-details-page">
        <div className="error">{t('postNotFound')}</div>
      </div>
    );
  }

  // Get localized content
  const getLocalizedTitle = () => {
    return currentLang === 'am' ? (post.titleam || post.title) : post.title;
  };

  const getLocalizedDescription = () => {
    return currentLang === 'am' ? (post.descriptionam || post.description) : post.description;
  };

  const categoryInfo = {
    "health-tips": {
      title: t('healthTips'),
      color: "#811114",
      icon: "💊"
    },
    "sport-news": {
      title: t('sportNews'),
      color: "#2E7D32", 
      icon: "⚽"
    },
    "food-preparation": {
      title: t('foodPreparation'),
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
            ← {t('back')}
          </button>
        </div>

        {/* Main content area with image on left and content on right */}
        <div className="post-content-layout">
          {/* Image Section - Left */}
          {post.image && (
            <div className="post-image-section">
              <div className="post-hero-image">
                <img src={post.image} alt={getLocalizedTitle()} />
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
              {getLocalizedTitle()}
            </h1>
            
            <div className="post-body">
              <p className="post-description">
                {getLocalizedDescription()}
              </p>

              {/* Only show English content as fallback when in Amharic mode and Amharic content is missing */}
              {currentLang === 'am' && (!post.titleam || !post.descriptionam) && (
                <div className="language-section">
                  <h3>{t('englishContent')}</h3>
                  {!post.titleam && <p><strong>{t('title')}:</strong> {post.title}</p>}
                  {!post.descriptionam && <p><strong>{t('description')}:</strong> {post.description}</p>}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="post-actions">
              <button onClick={() => window.history.back()} className="btn-secondary">
                {t('backToList')}
              </button>
              <Link to={`/category/${post.postcategory}`} className="btn-primary">
                {t('moreFromCategory')}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default PostDetails;