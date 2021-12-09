import Loading from './components/Loading';
import ProductCard from './components/ProductCard';

function App() {
  const added = (val: boolean) => {
    console.log('Added callback:', val);
  };
  const addedFav = (val: boolean) => {
    console.log('Added callback:', val);
  };
  return (
    <div className="App">
      <header className="App-header">
        <ProductCard
          img="https://dummyimage.com/400x400/28200e/000&text=Unbranded Metal Chair"
          stock={2}
          name="Unbranded Metal Chair"
          price={200}
          description="Rerum minima laudantium blanditiis dolorem dolores ut sint ut quidem. Est doloremque repellat excepturi dolor consequatur rerum qui. Facere ut vel et enim accusamus ipsum dolores aut. Eaque quo ut omnis unde quam error voluptas non iure."
          favorite={false}
          inBasket={false}
          added={added}
          addedToFav={addedFav}
        />
        <ProductCard
          img="https://dummyimage.com/400x400/2ee9f7/000&text=Handcrafted Metal Towels"
          stock={0}
          name="Handcrafted Metal Towels"
          price={100}
          description="Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio. Nostrum aperiam officiis aut reprehenderit illo."
          favorite={true}
          inBasket={true}
          added={added}
          addedToFav={addedFav}
        />
      </header>
    </div>
  );
}

export default App;
