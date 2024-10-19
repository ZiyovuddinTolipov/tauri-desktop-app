import { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import toast, { Toaster } from 'react-hot-toast';

import Calculator from './components/Calculator';

function App() {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const handleButtonClick = (value: string) => {
    const operators = ['√', 'x²', '%', '/', '*', '-', '+'];
    
    // Agar xatolik matni bo'lsa, inputni tozalash
    if (input.startsWith('Error:')) {
        setInput(''); // Xatolik matnini tozalash
    }

    // Agar input bo'sh bo'lsa va operator kiritilsa, hech narsa qilmaymiz
    if (input === '' && operators.includes(value)) {
        return;
    }

    // Agar oxirgi belgi operator bo'lsa, yangi operatorni kiritishga yo'l qo'ymaymiz
    if (operators.includes(input.slice(-1)) && operators.includes(value)) {
        return;
    }

    if (value === '√') {
        setInput((prev) => `Math.sqrt(${prev})`);
    } else if (value === 'x²') {
        setInput((prev) => `Math.pow(${prev}, 2)`);
    } else if (value === '%') {
        setInput((prev) => `${prev} / 100`);
    } else {
        setInput((prev) => prev + value);
    }
  };

  const handleReset = () => {
    setInput('');
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    // Agar input bo'sh bo'lsa, hech narsa qilmaymiz
    if (input.trim() === '') {
        toast.error('Error: Please enter a value'); // Foydalanuvchiga xato xabarini ko'rsatish
        return;
    }

    try {
      const sanitizedInput = input.replace(/x/g, '*');
      const result = evaluate(sanitizedInput); 

      // Agar natija manfiy bo'lsa, xato xabarini ko'rsatish
      if (sanitizedInput.includes('Math.sqrt') && result < 0) {
        toast.error('Negative input for square root');
      }

      setHistory((prev) => [...prev, `${input} = ${result}`]); 
      setInput(result.toString());
    } catch (error) {
      toast.error('Error: ' + error); // Xato xabarini ko'rsatish
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <Toaster />
      <main className={`w-full h-screen flex ${theme === 'dark' ? 'bg-primary' : 'bg-light'}`}>
      <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto">
        <h1 className={`text-${theme === 'dark' ? 'white' : 'black'} text-4xl mb-4 font-semibold uppercase`}>Calculator by tolipov</h1>
        <Calculator
          input={input}
          onButtonClick={handleButtonClick}
          onDelete={handleDelete}
          onReset={handleReset}
          onCalculate={handleCalculate}
          theme={theme}
        />
        <div className="flex space-x-4 mt-4">
          <button className="bg-accent text-light p-3 rounded hover:bg-blue-500" onClick={toggleModal}>
            {isModalOpen ? 'Close History' : 'Show History'}
          </button>
          <button className="bg-accent text-light p-3 rounded hover:bg-blue-500" onClick={toggleTheme}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Tarixni ko'rsatish */}
      <div className={`hidden md:block w-1/3 p-4 ${theme === 'dark' ? 'bg-secondary' : 'bg-light'}`}>
        <h2 className={`text-${theme === 'dark' ? 'white' : 'black'} text-xl mb-2`}>History</h2>
        <ul className="max-h-60 overflow-y-auto">
          {history.length === 0 ? (
            <li className={`text-${theme === 'dark' ? 'white' : 'black'}`}>There's no history yet.</li>
          ) : (
            history.map((item, index) => (
              <li key={index} className={`text-${theme === 'dark' ? 'white' : 'black'}`}>{item}</li>
            ))
          )}
        </ul>
      </div>

      {/* Modal ko'rinishida tarix */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:hidden">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <h2 className="text-black text-xl mb-2">History</h2>
            <ul className="max-h-60 overflow-y-auto">
              {history.length === 0 ? (
                <li className="text-black">There's no history yet.</li>
              ) : (
                history.map((item, index) => (
                  <li key={index} className="text-black">{item}</li>
                ))
              )}
            </ul>
            <button className="mt-4 bg-accent text-light p-2 rounded hover:bg-blue-500" onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </main> </>
 
  );
}

export default App;
