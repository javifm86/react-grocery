import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard';

const added = (val: boolean) => {
  // console.log('Added callback:', val);
};
const addedFav = (val: boolean) => {
  // console.log('Added callback:', val);
};

const renderCard = ({
  img = 'http://dummy.com/invented.jpg',
  stock = 2,
  name = 'Curry rice',
  price = 200,
  description = 'Tasty curry rice',
  favorite = false,
  inBasket = false,
  addedFn = added,
  addedToFav = addedFav,
}) => {
  return render(
    <ProductCard
      img={img}
      stock={stock}
      name={name}
      price={price}
      description={description}
      favorite={favorite}
      inBasket={inBasket}
      added={addedFn}
      addedToFav={addedToFav}
    />
  );
};

describe('ProductCard component', () => {
  test('loads info correctly for a product in stock, no favorite and no in basket', () => {
    const { container } = renderCard({ favorite: false, inBasket: false });
    const img = screen.getByRole('img');

    expect(img.getAttribute('src')).toEqual('http://dummy.com/invented.jpg');
    expect(screen.getByTestId('name')).toHaveTextContent('Curry rice');
    expect(screen.getByTestId('price')).toHaveTextContent('200');
    expect(screen.getByTestId('description')).toHaveTextContent(
      'Tasty curry rice'
    );
    expect(container.querySelector('svg')).toHaveClass('text-white');
    expect(screen.getByTestId('add')).toBeInTheDocument();
    expect(screen.getByTestId('add')).not.toBeDisabled();
  });

  test('loads info correctly for a favorite product, svg heart icon shows red', () => {
    const { container } = renderCard({ favorite: true });
    expect(container.querySelector('svg')).not.toHaveClass('text-white');
  });

  test('loads info correctly for a product added in the basket, button add is disabled', () => {
    renderCard({ favorite: false, inBasket: true });
    expect(screen.getByTestId('add')).toBeInTheDocument();
    expect(screen.getByTestId('add')).toBeDisabled();
  });

  it('should raise added event with true when clicked add button', () => {
    const addedSpy = jest.fn(added);
    renderCard({ addedFn: addedSpy });

    const addButton = screen.getByTestId('add');
    userEvent.click(addButton);
    expect(addedSpy).toHaveBeenCalledWith(true);
  });

  it('should raise addedToFav event with true when clicked heart icon in no favorite product', () => {
    const addedFavSpy = jest.fn(addedFav);
    renderCard({
      favorite: false,
      addedToFav: addedFavSpy,
    });

    const favoriteButton = screen.getByTestId('favorite');
    userEvent.click(favoriteButton);
    expect(addedFavSpy).toHaveBeenCalledWith(true);
  });

  it('should raise addedToFav event with false when clicked heart icon in favorite product', () => {
    const addedFavSpy = jest.fn(addedFav);
    renderCard({
      favorite: true,
      addedToFav: addedFavSpy,
    });

    const favoriteButton = screen.getByTestId('favorite');
    userEvent.click(favoriteButton);
    expect(addedFavSpy).toHaveBeenCalledWith(false);
  });
});
