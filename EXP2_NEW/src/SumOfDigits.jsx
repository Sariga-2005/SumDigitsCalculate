import { useState } from 'react';

function SumOfDigits() {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState(null);

    const calculateSumOfDigits = () => {
        // Validate input
        if (!number || isNaN(number)) {
            setResult({ error: 'Please enter a valid number' });
            return;
        }

        // Convert number to string and extract digits
        const numStr = Math.abs(parseInt(number)).toString();
        const digits = numStr.split('').map(digit => parseInt(digit));

        // Calculate sum using reduce
        const sum = digits.reduce((acc, curr) => acc + curr, 0);

        // Create step-by-step calculation string
        const steps = digits.map((digit, index) => ({
            digit,
            partial: digits.slice(0, index + 1).reduce((acc, curr) => acc + curr, 0)
        }));

        setResult({
            originalNumber: number,
            digits,
            steps,
            sum,
            calculation: digits.join(' + ')
        });
    };

    const handleReset = () => {
        setNumber('');
        setResult(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-blue-800 mb-2">
                        🔢 Sum of Digits Calculator
                    </h1>
                    <p className="text-gray-700 font-medium text-lg">
                        EX.NO.: 2 - Calculate the sum of all digits in a number
                    </p>
                </div>

                {/* Input Section */}
                <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
                    <div className="mb-6">
                        <label className="block text-xl font-bold text-gray-800 mb-3">
                            📝 Enter a Number:
                        </label>
                        <input
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && calculateSumOfDigits()}
                            className="w-full p-5 border-4 border-blue-300 rounded-xl text-3xl text-center font-bold focus:outline-none focus:border-blue-500 transition-all"
                            placeholder="e.g., 12345"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={calculateSumOfDigits}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-bold text-xl hover:shadow-lg hover:scale-105 transition-all"
                        >
                            Calculate Sum ✨
                        </button>
                        <button
                            onClick={handleReset}
                            className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 rounded-xl font-bold text-xl hover:shadow-lg hover:scale-105 transition-all"
                        >
                            Reset 🔄
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                {result && (
                    <div>
                        {result.error ? (
                            <div className="bg-red-100 border-4 border-red-400 rounded-xl p-6 text-center">
                                <p className="text-red-700 font-bold text-xl">❌ {result.error}</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Individual Digits Display */}
                                <div className="bg-white rounded-2xl shadow-xl p-8">
                                    <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
                                        🔍 Individual Digits
                                    </h2>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        {result.digits.map((digit, index) => (
                                            <div
                                                key={index}
                                                className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-20 h-20 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all"
                                            >
                                                <span className="text-4xl font-bold">{digit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Step-by-Step Calculation */}
                                <div className="bg-white rounded-2xl shadow-xl p-8">
                                    <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">
                                        📊 Step-by-Step Calculation
                                    </h2>
                                    <div className="space-y-3">
                                        {result.steps.map((step, index) => (
                                            <div
                                                key={index}
                                                className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-blue-300 rounded-lg p-4 flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-lg font-semibold text-gray-700">
                                                        {index === 0 ? (
                                                            `Start with ${step.digit}`
                                                        ) : (
                                                            `Add ${step.digit} (${result.steps[index - 1].partial} + ${step.digit})`
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold text-xl">
                                                    = {step.partial}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Final Result */}
                                <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-2xl p-8 text-white">
                                    <h2 className="text-3xl font-bold mb-4 text-center">
                                        ✅ Final Result
                                    </h2>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-4">
                                        <p className="text-2xl font-semibold text-center mb-2">
                                            Calculation:
                                        </p>
                                        <p className="text-3xl font-bold text-center">
                                            {result.calculation} = {result.sum}
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-xl p-6 text-center">
                                        <p className="text-gray-700 font-semibold text-xl mb-2">
                                            Sum of digits of <span className="text-blue-600 font-bold">{result.originalNumber}</span> is:
                                        </p>
                                        <p className="text-6xl font-bold text-green-600">
                                            {result.sum}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Concepts Footer */}
                <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                        💡 Concepts Used in This Application
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                            <span className="font-semibold text-blue-700">React Hooks</span>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                            <span className="font-semibold text-purple-700">useState</span>
                        </div>
                        <div className="bg-pink-50 p-3 rounded-lg text-center">
                            <span className="font-semibold text-pink-700">Functional Components</span>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                            <span className="font-semibold text-green-700">Event Handling</span>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg text-center">
                            <span className="font-semibold text-yellow-700">Conditional Rendering</span>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg text-center">
                            <span className="font-semibold text-indigo-700">Array Methods</span>
                        </div>
                        <div className="bg-red-50 p-3 rounded-lg text-center">
                            <span className="font-semibold text-red-700">String Manipulation</span>
                        </div>
                        <div className="bg-teal-50 p-3 rounded-lg text-center">
                            <span className="font-semibold text-teal-700">map & reduce</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SumOfDigits;
