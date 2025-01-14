const AccountForm = ({ user, loginHandler, logoutHandler }) => {
    if (!user.name) return (
        <>
            <h2>log in to application</h2>
            <form onSubmit={loginHandler}>
                username: <input name="username" type="text" />
                <br />
                password: <input name="password" type="password" />
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