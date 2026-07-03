import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get("category");
    const searchQuery = searchParams.get("search");
    const { allProducts, isLoading } = useSelector((state) => state.products);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!allProducts) {
            setData([]);
            return;
        }

        if (searchQuery) {
            const term = searchQuery.toLowerCase();
            const d = allProducts.filter(
                (i) =>
                    i.name?.toLowerCase().includes(term) ||
                    i.category?.toLowerCase().includes(term) ||
                    i.description?.toLowerCase().includes(term) ||
                    i.tags?.toLowerCase().includes(term)
            );
            setData(d);
        } else if (categoryData) {
            const d = allProducts.filter((i) => i.category === categoryData);
            setData(d);
        } else {
            setData(allProducts);
        }
        //    window.scrollTo(0,0);
    }, [allProducts, categoryData, searchQuery]);

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <Header activeHeading={3} />
                        <br />
                        <br />
                        <div className={`${styles.section}`}>
                            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                                {data && data.map((i) => <ProductCard data={i} key={i._id} />)}
                            </div>
                            {data && data.length === 0 ? (
                                <h1 className="text-center w-full pb-[100px] text-[20px]">
                                    No products Found!
                                </h1>
                            ) : null}
                        </div>
                        <Footer />
                    </div>
                )
            }
        </>
    );
};

export default ProductsPage;