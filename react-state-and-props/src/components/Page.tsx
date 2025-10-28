import Header from "./Header/component";
import Gallery from "./Gallery/component";
import Footer from "./Footer/component";
import photos from "./PhotoCard/__mock__/index";

function Page() {
  return (
    <div className="page">
      <Header />
      <Gallery photos={photos} />
      <Footer />
    </div>
  );
}

export default Page;
