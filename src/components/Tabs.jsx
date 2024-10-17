export function Tabs(props) {
  const { todos, selectedTab, setSelectedTab } = props;

  const tab = ["All", "Open", "Complete"];
  return (
    <nav className="tab-container">
      {tab.map((tab, tabIndex) => {
        const numOfTasks =
          tab === "All"
            ? todos.length //if
            : tab === "Open"
            ? todos.filter((vals) => !vals.complete).length //else if
            : todos.filter((vals) => vals.complete).length; //else

        return (
          <button
            onClick={() => {
              setSelectedTab(tab);
            }}
            key={tabIndex}
            className={
              "tab-button " + (tab == selectedTab ? "tab-selected" : "")
            }
          >
            <h4>
              {tab} <span>({numOfTasks})</span>
            </h4>
          </button>
        );
      })}
      <hr />
    </nav>
  );
}
