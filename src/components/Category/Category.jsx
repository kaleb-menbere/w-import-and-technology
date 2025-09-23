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

  return (
    <div>
      <Box categoryName={categoryName} showAllGames={true} />
    </div>
  );
}

export default Category;