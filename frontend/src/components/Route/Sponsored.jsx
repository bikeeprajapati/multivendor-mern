import React from "react";
import styles from "../../styles/styles";

const sponsors = [
    {
        name: "Amazon",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg",
    },
    {
        name: "Apple",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apple.svg",
    },
    {
        name: "LG",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/lg.svg",
    },
    {
        name: "Samsung",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/samsung.svg",
    },
    {
        name: "Sony",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/sony.svg",
    },
];

const Sponsored = () => {
    return (
        <div
            className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 rounded-xl`}
        >
            <div className="flex justify-around items-center">
                {sponsors.map((item) => (
                    <img
                        key={item.name}
                        src={item.logo}
                        alt={item.name}
                        className="w-28 h-16 object-contain"
                    />
                ))}
            </div>
        </div>
    );
};

export default Sponsored;