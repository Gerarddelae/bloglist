const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    title: "Blog post 1",
    author: "Author 1",
    url: "www.example.com/1",
    likes: 10
  },
  {
    title: "Blog post 2",
    author: "Author 2",
    url: "www.example.com/2",
    likes: 12
  }
]

const initialUsers = [
  {
    username: "Username1",
    name: "User 1",
    password: "1111"
  },
  {
    username: "Username2",
    name: "User 2",
    password: "2222"
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb
}