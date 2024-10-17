export function Header(props){
    const {todos}=props
    let todosLenght= todos.length
    let taskOrTasks= todos.length == 1 ? 'task' : 'tasks'


    return(
        <header>
            <h1 className="text-gradient"> You have {todosLenght} open {taskOrTasks}.</h1>
        </header>
    )
}