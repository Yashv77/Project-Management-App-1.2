import { Cards } from "./Cards"

export function List(props) {
    const { 
        todos, 
        selectedTab, 
        handleDeleteTodo, 
        handleCompleteTodo, 
        handleAddTodo 
    } = props

    const filterTodos = (todoList) => {
        return todoList.filter(todo => {
            if (selectedTab === 'All') return true
            if (selectedTab === 'Completed') return todo.complete
            return !todo.complete
        })
    }

    return (
        <>
            {filterTodos(todos).map((todo) => (
                <Cards 
                    key={todo.id}
                    todo={todo}
                    handleDeleteTodo={handleDeleteTodo}
                    handleCompleteTodo={handleCompleteTodo}
                    handleAddTodo={handleAddTodo}
                />
            ))}
        </>
    )
}