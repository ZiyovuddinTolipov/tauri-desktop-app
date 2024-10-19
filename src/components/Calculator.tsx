import React from 'react';

interface CalculatorProps {
    input: string;
    onButtonClick: (value: string) => void;
    onDelete: () => void;
    onReset: () => void;
    onCalculate: () => void;
    theme: string; // Theme prop qo'shish
}

const Calculator: React.FC<CalculatorProps> = ({ input, onButtonClick, onDelete, onReset, onCalculate, theme }) => {
    const buttonValues = [
        '7', '8', '9', 'C',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '/', '√', '+',
        'x²', '%'
    ];

    return (
        <div className={`bg-${theme === 'dark' ? 'secondary' : 'light'} p-4 rounded-lg w-full max-w-md`}>
            <input
                type="text"
                value={input || 0}
                readOnly
                className={`w-full p-2 text-right text-${theme === 'dark' ? 'white' : 'black'} bg-${theme === 'dark' ? 'primary' : 'white'} mb-4 text-2xl`}
            />
            <div className="grid grid-cols-4 gap-2">
                {buttonValues.map((value) => (
                    <button
                        key={value}
                        className={`p-4 rounded-lg text-xl bg-accent text-light hover:bg-blue-500 transition duration-200`}
                        onClick={() => value === '=' ? onCalculate() : value === 'C' ? onReset() : onButtonClick(value)}
                    >
                        {value}
                    </button>
                ))}
                <button className="col-span-2 p-4 rounded-lg bg-red-600 text-light hover:bg-red-500 transition duration-200" onClick={onCalculate}>
                    =
                </button>
                <button className="col-span-4 p-4 rounded-lg bg-red-600 text-light hover:bg-red-500 transition duration-200" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Calculator;
