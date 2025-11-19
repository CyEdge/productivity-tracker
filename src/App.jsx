// Defines your main React Component. Every React app starts from here.
function App() {
  return (
    // min-h-screen: Makes the background extend to full screen height.
    // bg-gray-100: Sets a soft light-gray background.
    // flex flex-col items-center justify-start: Uses Flexbox, stacks contents vertically, centers them, starts at the top.
    // p-8: Padding all around, making it look breathable.
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Productivity Tracker
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Start managing and tracking your daily tasks!
      </p>
    </div>
  );
}

export default App;
// So main.jsx can render it.
