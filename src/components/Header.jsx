export function Header(props){
    const {todos}=props
    let todosLenght= todos.length
    let taskOrTasks= todos.length == 1 ? 'projects' : 'project'


    return(
        <header>
            <h1>Project Management App</h1>
            <h3 className="text-gradient"> You have {todosLenght} open {taskOrTasks}.</h3>
        </header>
    )
}