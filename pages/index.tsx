import styles from "@/styles/Home.module.css";

import { client } from "../lib/client";
import { Product, HeroBanner } from "../components";

type HomeProps = {
  products?: Array<any> | undefined;
  bannerData?: Array<any> | undefined;
};

const Home = ({ products, bannerData }: HomeProps) => {
  return (
    <>
      {/* {console.log(products)} */}

      <HeroBanner heroBanner={bannerData?.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      {/* FooterBanner */}
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
