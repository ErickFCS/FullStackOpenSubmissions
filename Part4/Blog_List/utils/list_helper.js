const dummy = (blogs) => (
    1
)

const totalLikes = (blogs) => (
    blogs.reduce((sum, blog) => (sum + blog.likes), 0)
)

const favoriteBlog = (blogs) => (
    blogs.reduce((p, a) => { return p.likes > a.likes ? p : a })
)

export default { dummy, totalLikes, favoriteBlog }