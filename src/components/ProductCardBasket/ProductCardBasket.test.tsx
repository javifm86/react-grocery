import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCardBasket, { ItemUpdated } from './ProductCardBasket';

const numItemsFn = (result: ItemUpdated) => {
  // console.warn({ result });
};

const defaultProps = {
  img: 'http://dummy.com/invented.jpg',
  stock: 1000,
  name: 'Curry rice',
  numItems: '10',
  price: 200,
  description: 'Tasty curry rice',
  disable: false,
  numItemsUpdated: numItemsFn,
};

const renderCard = ({
  img = defaultProps.img,
  stock = defaultProps.stock,
  name = defaultProps.name,
  numItems = defaultProps.numItems,
  price = defaultProps.price,
  description = defaultProps.description,
  disable = defaultProps.disable,
  numItemsUpdated = defaultProps.numItemsUpdated,
}) => {
  return render(
    <ProductCardBasket
      img={img}
      stock={stock}
      name={name}
      price={price}
      description={description}
      numItemsUpdated={numItemsUpdated}
      disable={disable}
      numItems={numItems}
    />
  );
};

describe('ProductCardBasket component', () => {
  test('loads info correctly for a product enabled', () => {
    renderCard({ disable: false });
    const img = screen.getByRole('img');

    expect(img.getAttribute('src')).toEqual('http://dummy.com/invented.jpg');
    expect(screen.getByTestId('name')).toHaveTextContent('Curry rice');
    expect(screen.getByTestId('price')).toHaveTextContent('200');
    expect(screen.getByTestId('stock')).toHaveTextContent('1000');
    expect(screen.getByTestId('stockleft')).toHaveTextContent('990');
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  test('increments counter when "+" button is pressed and updates left items', () => {
    renderCard({ disable: false });

    const addButton = screen.getByTestId('addButton');

    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByTestId('stockleft')).toHaveTextContent('990');

    userEvent.click(addButton);
    expect(screen.getByDisplayValue('11')).toBeInTheDocument();
    expect(screen.getByTestId('stockleft')).toHaveTextContent('989');
  });

  test('decrements counter when "-" button is pressed and updates left items', () => {
    renderCard({ disable: false });

    const substractButton = screen.getByTestId('substractButton');

    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByTestId('stockleft')).toHaveTextContent('990');

    userEvent.click(substractButton);
    expect(screen.getByDisplayValue('9')).toBeInTheDocument();
    expect(screen.getByTestId('stockleft')).toHaveTextContent('991');
  });

  test('increments and decrements counter when "-" and "+" buttons are pressed and updates left items', () => {
    renderCard({ disable: false });

    const addButton = screen.getByTestId('addButton');
    const substractButton = screen.getByTestId('substractButton');

    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByTestId('stockleft')).toHaveTextContent('990');

    userEvent.click(substractButton);
    expect(screen.getByDisplayValue('9')).toBeInTheDocument();
    expect(screen.getByTestId('stockleft')).toHaveTextContent('991');

    userEvent.click(substractButton);
    expect(screen.getByDisplayValue('8')).toBeInTheDocument();
    expect(screen.getByTestId('stockleft')).toHaveTextContent('992');

    userEvent.click(substractButton);
    expect(screen.getByDisplayValue('7')).toBeInTheDocument();
    expect(screen.getByTestId('stockleft')).toHaveTextContent('993');

    userEvent.click(addButton);
    expect(screen.getByDisplayValue('8')).toBeInTheDocument();
    expect(screen.getByTestId('stockleft')).toHaveTextContent('992');

    userEvent.click(addButton);
    expect(screen.getByDisplayValue('9')).toBeInTheDocument();
    expect(screen.getByTestId('stockleft')).toHaveTextContent('991');

    userEvent.click(addButton);
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByTestId('stockleft')).toHaveTextContent('990');
  });

  test('should load info correctly for a product when props change', () => {
    const { rerender } = renderCard({ disable: false });
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    rerender(
      <ProductCardBasket
        img="http://dummy.com/invented2.jpg"
        stock={10000}
        name="Curry rice"
        price={200}
        description={defaultProps.description}
        numItemsUpdated={defaultProps.numItemsUpdated}
        disable={defaultProps.disable}
        numItems="20"
      />
    );
    const img = screen.getByRole('img');

    expect(img.getAttribute('src')).toEqual('http://dummy.com/invented2.jpg');
    expect(screen.getByTestId('name')).toHaveTextContent('Curry rice');
    expect(screen.getByTestId('price')).toHaveTextContent('200');
    expect(screen.getByTestId('stock')).toHaveTextContent('10000');
    expect(screen.getByTestId('stockleft')).toHaveTextContent('9980');
    expect(screen.getByDisplayValue('20')).toBeInTheDocument();
  });

  test('should raise numItemsUpdated event when items are updated correctly', () => {
    const spyNumItemsUpdated = jest.fn(numItemsFn);
    renderCard({
      disable: false,
      stock: 100,
      numItems: '10',
      numItemsUpdated: spyNumItemsUpdated,
    });
    const addButton = screen.getByTestId('addButton');
    userEvent.click(addButton);

    expect(spyNumItemsUpdated).toHaveBeenCalledWith({
      val: 11,
      error: false,
    });
  });

  test('should raise numItemsUpdated event when items are updated incorrectly (no integer)', () => {
    const spyNumItemsUpdated = jest.fn(numItemsFn);
    renderCard({
      disable: false,
      stock: 100,
      numItems: '10',
      numItemsUpdated: spyNumItemsUpdated,
    });
    const input = screen.getByTestId('input');
    userEvent.type(input, 'a');
    expect(spyNumItemsUpdated).toHaveBeenCalledWith({
      val: null,
      error: true,
    });
  });

  test('should raise numItemsUpdated event when items are updated incorrectly (integer out of range, <0 || >stock)', () => {
    const spyNumItemsUpdated = jest.fn(numItemsFn);
    renderCard({
      disable: false,
      stock: 12,
      numItems: '10',
      numItemsUpdated: spyNumItemsUpdated,
    });
    const substractButton = screen.getByTestId('substractButton');
    const input = screen.getByTestId('input');

    userEvent.clear(input);
    userEvent.type(input, '15');
    expect(spyNumItemsUpdated).toHaveBeenCalledWith({
      val: 15,
      error: true,
    });

    userEvent.clear(input);
    userEvent.type(input, '0');
    userEvent.click(substractButton);

    expect(spyNumItemsUpdated).toHaveBeenCalledWith({
      val: -1,
      error: true,
    });
  });

  it('should disable input and buttons when props.disable = true', () => {
    renderCard({ disable: true });
    expect(screen.getByTestId('input')).toBeDisabled();
    expect(screen.getByTestId('addButton')).toBeDisabled();
    expect(screen.getByTestId('substractButton')).toBeDisabled();
  });
});
