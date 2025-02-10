import { useParams } from 'react-router-dom';
import { ErrorBlock } from '../../shared/components/ErrorBlock';

export const PageNotFound: React.FC = () => {
  const { category } = useParams();

  return (
    <div className="not-found-container">
      {category ? (
        <ErrorBlock
          image="img/product-not-found.png"
          text="Looks like the product was not found..."
        />
      ) : (
        <ErrorBlock
          image="img/page-not-found.png"
          text="Looks like the page was not found..."
        />
      )}
    </div>
  );
};
