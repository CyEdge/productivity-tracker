import TaskCard from "../components/tasks/TaskCard";

function Dashboard({ tasks, onComplete, onDelete, onEdit }) {
  // Calculate totals
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Complete"
  ).length;
  const completionPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Filter today's tasks
  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const todaysTasks = tasks.filter((task) =>
    task.createdAt.startsWith(todayStr)
  );

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
        Dashboard
      </h1>

      {/* KPIs */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-sm uppercase tracking-wide text-gray-600">
            Total Tasks
          </p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {totalTasks}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-sm uppercase tracking-wide text-gray-600">
            Completed Tasks
          </p>
          <p className="mt-2 text-3xl font-semibold text-green-600">
            {completedTasks}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-sm uppercase tracking-wide text-gray-600">
            Completion %
          </p>
          <p
            className={`mt-2 text-3xl font-semibold ${
              completionPercent >= 75
                ? "text-green-600"
                : completionPercent >= 40
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {completionPercent}%
          </p>
        </div>
      </div>

      {/* Today's Tasks Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Today's Tasks</h2>
        {todaysTasks.length === 0 ? (
          <p className="text-gray-500">No tasks created today.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todaysTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={onComplete}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
