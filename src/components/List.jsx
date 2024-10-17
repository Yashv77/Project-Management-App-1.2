import { Cards } from "./Cards"

export function List(props){
    const {todos, selectedTab}=props

    const filterTodosList = selectedTab === 'All' ? todos : //if
    selectedTab === 'Completed' ? todos.filter(vals=>vals.complete): //else if
    todos.filter(vals=>!vals.complete) //else

    return(
        <>
        {filterTodosList.map((todo, todoIndex)=>{
            return(
                <Cards key={todoIndex} todoIndex={todos.findIndex(val=> val.input==todo.input)} {...props} todo={todo}/>
            )
        }
        )}
        </>
    )
}