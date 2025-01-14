const AccountForm = ({ user, loginHandler, logoutHandler, inputStates }) => {
    if (!user.name) return (
        <>
            <h2>log in to application</h2>
            <form onSubmit={loginHandler}>
                username: <input onChange={({ target }) => { inputStates.setUsername(target.value) }} name="username" type="text" />
                <br />
                password: <input onChange={({ target }) => { inputStates.setPassword(target.value) }} name="password" type="password" />
                <br />
                <button type="submit">login</button>
            </form>
        </>
    )
    else return (
        <>
            {user.name} is logged in
            <button type="button" onClick={logoutHandler}>logout</button>
        </>
    )
}

export default AccountForm