import React, { useContext, useState } from 'react';

const GrainMarket = () => {
    const { currentAccount, grains , registerGrain} = useContext(GrainMarketContext);
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleRegisterGrain = async (e) => {
        e.preventDefault();
        await registerGrain(quantity, price);
        setQuantity('');
        setPrice('');
    };

    return (
        <div>
            <h1>Grain Market</h1>
            {currentAccount ? (
                <div>
                    <h2>Welcome, {currentAccount}</h2>
                    <form onSubmit={handleRegisterGrain}>
                        <input
                            type="number"
                            placeholder="Quantity (kg)"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price (in wei)"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                        <button type="submit">Register Grain</button>
                    </form>
                    <h2>Registered Grains</h2>
                    <ul>
                        {grains.map((grain, index) => (
                            <li key={index}>
                                Farmer: {grain[0]}, Quantity: {grain[1]} kg, Price: {grain[2]} wei, Sold: {grain[3] ? 'Yes' : 'No'}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Please connect your wallet.</p>
            )}
        </div>
    );
};

export default GrainMarket;