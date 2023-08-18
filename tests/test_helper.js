const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "how to dance",
    author: "MJ",
    url: "https",
    likes: 10
  },
  {
    title: "how to cook",
    author: "vives",
    url: "httpss",
    likes: 2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}