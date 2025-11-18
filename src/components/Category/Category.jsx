import './Category.css';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Posts from '../../components/Posts/Posts';

function Category() {
  const { categoryName } = useParams();
  const { t, language } = useLanguage();

  // New content you provided
  const newPosts = [
    // Sports News Posts
    {
      id: 100,
      title: language === 'am' ? "ሮናልዶ፣ ሜሲ እና ሞድሪች በ2006 እና በ2026 ዓለም ዋንጫ በብቸኝነት" : "Ronaldo, Messi and Modric to play in 2006 and 2026 World Cups",
      excerpt: language === 'am' ? "ከ20 ዓመት በፊት የነበሩት ሦስቱ ከዋክብት ብቻ ከሁለት አስርት ዓመታት በኋላ በትልቁ መድረክ ሀገራቸውን ይወክላሉ። ሊዮኔል ሜሲ እና ክርስቲያኖ ሮናልዶ ከ2006 ጀምሮ እስከ 2026 ለ6 ተከታታይ ዓለም ዋንጫዎች በመካፈል ብቸኛ ሲሆኑ..." : "The three stars from 20 years ago will be the only ones to represent their countries on the big stage after two decades. Lionel Messi and Cristiano Ronaldo are the only players to have played in six consecutive World Cups from 2006 to 2026...",
      category: "sport-news",
      image: "/images/worldcup.jpg",
      author: language === 'am' ? "የስፖርት ዘጋቢ" : "Sports Reporter",
      date: "2024-01-16",
      readTime: language === 'am' ? "5 ደቂቃ ንባብ" : "5 min read",
      likes: 289
    },
    {
      id: 101,
      title: language === 'am' ? "ቅዱስ ጊዮርጊስ ከ ኢትዮጵያ መድን" : "St. George vs. Ethiopia Medan",
      excerpt: language === 'am' ? "በሲቢኢ የኢትዮጵያ ፕሪሚየር ሊግ ተስተካካይ መርኃ ግብር ቅዱስ ጊዮርጊስ ከ ኢትዮጵያ መድን በአዲስ አበባ ስታድየም ቀን 9 ሰዓት ይጫወታሉ። በ2ኛ ሳምንት መደረግ የነበረበትና ኢትዮጵያ መድን በአፍሪካ ቻምፒየንስ ሊግ ተሳታፊ በመሆኑ ለሌላ ጊዜ የተላለፈው ጨዋታ..." : "In the CBE Ethiopian Premier League match schedule, St. George will play against Ethiopia Medan at Addis Ababa Stadium at 9:00 AM. The match, which was supposed to be played in the 2nd week and was postponed due to Ethiopia Medan participating in the African Champions League...",
      category: "sport-news",
      image: "/images/st-george-medan.jpg",
      author: language === 'am' ? "የእግር ኳስ ዘጋቢ" : "Football Reporter",
      date: "2024-01-15",
      readTime: language === 'am' ? "3 ደቂቃ ንባብ" : "3 min read",
      likes: 198
    },
    {
      id: 102,
      title: language === 'am' ? "የወቅቱ የፕላኔታችን ምርጦቹ ሚክስድ ማርሻል አርቲስቶች" : "The best mixed martial artists on the planet right now",
      excerpt: language === 'am' ? "ሁለቱም የሚፈላለጉ ሲሆን ኢሊያ ወደ ዋልተርዌይት ከሄደ ምናልባት በኃይት ሀውስ በሚዘጋጀው የ UFC ኢቨንት ላይ እርስ በእርስ ሲፋለሙ ልንመለከታቸው እንችላለን" : "Both are in demand, and if Ilya goes to Wolverhampton, we could probably see them fight each other at a UFC event in the White House.",
      category: "sport-news",
      image: "/images/mma-fighters.jpg",
      author: language === 'am' ? "የማርሻል አርትስ አመራር" : "Martial Arts Expert",
      date: "2024-01-14",
      readTime: language === 'am' ? "4 ደቂቃ ንባብ" : "4 min read",
      likes: 145
    },

    // Health Tips Posts
    {
      id: 103,
      title: language === 'am' ? "ጤናማ አመጋገብ ይመገቡ" : "Eat a healthy diet",
      excerpt: language === 'am' ? "ፍራፍሬ፣ አትክልት፣ ጥራጥሬ፣ ለውዝ እና ሙሉ እህሎችን ጨምሮ የተለያዩ ምግቦችን ጥምረት ይመገቡ። አዋቂዎች በቀን ቢያንስ አምስት መጠን (400 ግራም) ፍራፍሬ እና አትክልት መመገብ አለባቸው።" : "Eat a combination of different foods, including fruit, vegetables, legumes, nuts and whole grains. Adults should eat at least five portions (400g) of fruit and vegetables per day.",
      category: "health-tips",
      image: "/images/healthy-diet.jpg",
      author: language === 'am' ? "ዶ/ር ማርያም አለማየሁ" : "Dr. Mariam Alemayehu",
      date: "2024-01-16",
      readTime: language === 'am' ? "4 ደቂቃ ንባብ" : "4 min read",
      likes: 156
    },
    {
      id: 104,
      title: language === 'am' ? "ጨውና ስኳርን ይቀንሱ" : "Consume less salt and sugar",
      excerpt: language === 'am' ? "የጨው መጠንዎን በቀን ወደ 5 ግራም ይቀንሱ፣ ይህም ከአንድ የሻይ ማንኪያ ጋር እኩል ነው። ምግብ ሲያዘጋጁ የጨው፣ የአኩሪ አተር መረቅ፣ የዓሳ መረቅ እና ሌሎች ከፍተኛ ሶዲየም ያላቸውን ቅመሞች መጠን በመገደብ..." : "Reduce your salt intake to 5g per day, equivalent to about one teaspoon. It's easier to do this by limiting the amount of salt, soy sauce, fish sauce and other high-sodium condiments when preparing meals...",
      category: "health-tips",
      image: "/images/salt-sugar.jpg",
      author: language === 'am' ? "የጤና አመራር" : "Health Expert",
      date: "2024-01-15",
      readTime: language === 'am' ? "6 ደቂቃ ንባብ" : "6 min read",
      likes: 223
    },

    // Food Preparation Posts
    {
      id: 105,
      title: language === 'am' ? "አንድ ሁለት የቀረች ምግብ አለች ይቺን ቀማምስና 🤌ለምሳና ለመክሰስ የማደርስልክ ይሆና..." : "Quick and Easy Leftover Food Recipes",
      excerpt: language === 'am' ? "ከቀሩ ምግቦች ጋር ምን ማድረግ እንደሚቻል እና ጣፋጭ አሰራሮችን እንዴት መፍጠር እንደሚቻል ይማሩ..." : "Learn what to do with leftover foods and how to create delicious recipes...",
      category: "food-preparation",
      image: "/images/leftover-recipes.jpg",
      author: language === 'am' ? "ሹፍ ሳምራዊት" : "Chef Samrawit",
      date: "2024-01-16",
      readTime: language === 'am' ? "5 ደቂቃ ንባብ" : "5 min read",
      likes: 178
    }
  ];

  // Mock data - in real app, this would come from API based on categoryName
  const getCategoryPosts = () => {
    const allPosts = [
      // Health & Beauty Posts
      {
        id: 1,
        title: language === 'am' ? "የሚያማም ቆዳ የሚያገኙት ዕለታዊ 5 የውበት ስልቶች" : "5 Daily Beauty Routines for Glowing Skin",
        excerpt: language === 'am' ? "በአንድ ሳምንት ውስጥ ቆዳዎን የሚቀይሩ መሠረታዊ የውበት ምክሮችን ያግኙ..." : "Discover the essential beauty tips that will transform your skin in just one week...",
        category: "health-tips",
        image: "/images/beauty1.jpg",
        author: language === 'am' ? "ዶ/ር ሳራ ጆንሰን" : "Dr. Sarah Johnson",
        date: "2024-01-15",
        readTime: language === 'am' ? "4 ደቂቃ ንባብ" : "4 min read",
        likes: 234
      },
      {
        id: 2,
        title: language === 'am' ? "ተፈጥሯዊ የቆዳ እንክብካቤ ምክሮች" : "Natural Skin Care Tips",
        excerpt: language === 'am' ? "ያለ ኬሚካል ተፈጥሯዊ የቆዳ እንክብካቤ ምክሮች..." : "Chemical-free natural skin care tips for healthy skin...",
        category: "health-tips",
        image: "/images/health3.jpg",
        author: language === 'am' ? "ዶ/ር ማርያም አባተ" : "Dr. Mariam Abate",
        date: "2024-01-10",
        readTime: language === 'am' ? "5 ደቂቃ ንባብ" : "5 min read",
        likes: 189
      },

      // Sports News Posts
      {
        id: 3,
        title: language === 'am' ? "አካባቢያዊ እግር ኳስ ቡድን ሻምፕዮናት አሸነፈ" : "Local Football Team Wins Championship",
        excerpt: language === 'am' ? "አዳምማ ከመጨረሻ ጨዋታ በኋላ ውስብስብ የዘመን ሽልማት አምጥተዋል..." : "Our local heroes bring home the trophy after an incredible season finale...",
        category: "sport-news",
        image: "/images/sport1.jpg",
        author: language === 'am' ? "ማይክ ቶምፕሰን" : "Mike Thompson",
        date: "2024-01-14",
        readTime: language === 'am' ? "3 ደቂቃ ንባብ" : "3 min read",
        likes: 312
      },
      {
        id: 4,
        title: language === 'am' ? "የኢትዮጵያ ሩጫ አትሌቶች በዓለም ሽልማት" : "Ethiopian Runners Win World Championship",
        excerpt: language === 'am' ? "የኢትዮጵያ ሩጫ አትሌቶች በዓለም አቀፍ ውድድር አሸናፊ ሆነዋል..." : "Ethiopian runners dominate the world championship with outstanding performance...",
        category: "sport-news",
        image: "/images/sport2.jpg",
        author: language === 'am' ? "ሳራ መኮንን" : "Sara Mekonnen",
        date: "2024-01-12",
        readTime: language === 'am' ? "4 ደቂቃ ንባብ" : "4 min read",
        likes: 278
      },

      // Food & Recipes Posts
      {
        id: 5,
        title: language === 'am' ? "ባህላዊ የኢትዮጵያ እንጀራ አሰራር" : "Traditional Ethiopian Injera Recipe",
        excerpt: language === 'am' ? "በደረጃ በደረጃ መመሪያችን በቤት ሙሉ እንጀራ ለመስራት ይማሩ..." : "Learn the authentic way to make perfect injera at home with our step-by-step guide...",
        category: "food-preparation",
        image: "/images/food1.jpg",
        author: language === 'am' ? "ሹፍ ማርያም" : "Chef Mariam",
        date: "2024-01-13",
        readTime: language === 'am' ? "6 ደቂቃ ንባብ" : "6 min read",
        likes: 421
      },
      {
        id: 6,
        title: language === 'am' ? "የዶሮ ወጥ አሰራር" : "How to Make Traditional Doro Wat",
        excerpt: language === 'am' ? "እንግዲህ እንዴት ነው ፍጹም ዶሮ ወጥ የሚሰራው?" : "Learn how to make perfect Doro Wat, Ethiopia's most famous dish...",
        category: "food-preparation",
        image: "/images/food2.jpg",
        author: language === 'am' ? "ሹፍ ዓለማየሁ" : "Chef Alemayehu",
        date: "2024-01-11",
        readTime: language === 'am' ? "7 ደቂቃ ንባብ" : "7 min read",
        likes: 356
      }
    ];

    // Filter posts by category and concatenate new posts at the front
    const filteredPosts = allPosts.filter(post => post.category === categoryName);
    const filteredNewPosts = newPosts.filter(post => post.category === categoryName);
    
    // Concatenate new posts at the front (so they show first)
    return [...filteredNewPosts, ...filteredPosts];
  };

  const categoryPosts = getCategoryPosts();

  // Category titles and descriptions
  const getCategoryInfo = () => {
    const categoryInfo = {
      'health-tips': {
        title: language === 'am' ? "ጤና እና ውበት" : "Health & Beauty",
        description: language === 'am' ? "ሁሉም የጤና እና ውበት ጽሑፎች" : "All health and beauty articles",
        icon: "💊"
      },
      'sport-news': {
        title: language === 'am' ? "የስፖርት ዜና" : "Sports News", 
        description: language === 'am' ? "ሁሉም የስፖርት ዜና ጽሑፎች" : "All sports news articles",
        icon: "⚽"
      },
      'food-preparation': {
        title: language === 'am' ? "ምግብ እና አሰራሮች" : "Food & Recipes",
        description: language === 'am' ? "ሁሉም የምግብ አሰራር ጽሑፎች" : "All food and recipe articles",
        icon: "🍴"
      }
    };

    return categoryInfo[categoryName] || { 
      title: 'Category', 
      description: 'All articles in this category',
      icon: '📁'
    };
  };

  const categoryInfo = getCategoryInfo();

  return (
    <div className="category-page">
      {/* Category Header */}
      <section className="category-header">
        <div className="category-icon-large">{categoryInfo.icon}</div>
        <div className="category-info">
          <h1>{categoryInfo.title}</h1>
          <p>{categoryInfo.description}</p>
          <span className="posts-count">
            {categoryPosts.length} {language === 'am' ? 'ጽሑፎች' : 'articles'}
          </span>
        </div>
      </section>

      {/* Posts Component */}
      <Posts 
        posts={categoryPosts}
        title={`${categoryInfo.icon} ${categoryInfo.title}`}
        subtitle={categoryInfo.description}
        showViewAll={false} // No view all button in category page
      />
    </div>
  );
}

export default Category;