import Box from "../Box/Box";
import { useParams } from "react-router-dom";

function Category() {
  const { categoryName } = useParams();
  
  console.log("Category name from URL:", categoryName);

  if (!categoryName) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Category Not Found</h2>
        <p>Please select a category from the home page.</p>
      </div>
    );
  }

  // For category pages, we can use a fixed index or determine based on category
  const getCategoryIndex = (category) => {
    const categoryOrder = ['education', 'adventure', 'puzzle', 'sports', 'reflex'];
    const index = categoryOrder.indexOf(category.toLowerCase());
    return index >= 0 ? index : 0;
  };

  const categoryIndex = getCategoryIndex(categoryName);

  return (
    <div>
      <Box 
        categoryName={categoryName} 
        showAllGames={true} 
        index={categoryIndex} 
      />
    </div>
  ); 
}

export default Category;