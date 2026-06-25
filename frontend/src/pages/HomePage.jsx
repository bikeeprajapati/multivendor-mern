import React from 'react';
import header from '../components/Layout/Header.jsx';
import Hero from '../components/Routes/Hero/Hero.jsx';
import Categories from '../components/Routes/Categories/Categories.jsx';
import BestDeals from '../components/Routes/BestDeals/BestDeals.jsx';
const HomePage = () => {
    return (
        <div>
            <Header activeHeading={1} />
            <Hero />
            <Categories />
            <BestDeals />
        </div>
    );
};

export default HomePage;